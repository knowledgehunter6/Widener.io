import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundFetch from 'react-native-background-fetch';
import { NativeEventEmitter } from 'react-native';
import natural from 'natural';
import { parseResumeFromPdf } from './ResumeParser';
import type { Job, JobPreferences, Resume } from '../types';

const JOB_BOARDS = {
  LINKEDIN: 'https://api.linkedin.com/v2/jobs',
  INDEED: 'https://api.indeed.com/v2/jobs',
  GLASSDOOR: 'https://api.glassdoor.com/v1/jobs',
};

class JobSearchService {
  private tokenizer: natural.WordTokenizer;
  private tfidf: natural.TfIdf;
  private eventEmitter: NativeEventEmitter;

  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.tfidf = new natural.TfIdf();
    this.eventEmitter = new NativeEventEmitter();
    this.initializeBackgroundFetch();
  }

  private async initializeBackgroundFetch() {
    try {
      await BackgroundFetch.configure({
        minimumFetchInterval: 15, // 15 minutes
        stopOnTerminate: false,
        enableHeadless: true,
        startOnBoot: true,
      }, async (taskId) => {
        await this.performBackgroundJobSearch();
        BackgroundFetch.finish(taskId);
      });
    } catch (error) {
      console.error('Background fetch setup failed:', error);
    }
  }

  private async performBackgroundJobSearch() {
    try {
      const preferences = await this.getJobPreferences();
      const resume = await this.getResume();
      const jobs = await this.searchJobs(preferences);
      const matchedJobs = this.matchJobsWithResume(jobs, resume);
      
      for (const job of matchedJobs) {
        if (this.shouldAutoApply(job)) {
          await this.autoApplyToJob(job, resume);
        }
      }

      this.notifyNewMatches(matchedJobs);
    } catch (error) {
      console.error('Background job search failed:', error);
    }
  }

  private async searchJobs(preferences: JobPreferences): Promise<Job[]> {
    const allJobs: Job[] = [];

    for (const board of Object.values(JOB_BOARDS)) {
      try {
        const response = await axios.get(board, {
          params: {
            keywords: preferences.keywords,
            location: preferences.location,
            salary_min: preferences.minSalary,
          },
        });
        allJobs.push(...response.data.jobs);
      } catch (error) {
        console.error(`Failed to fetch jobs from ${board}:`, error);
      }
    }

    return allJobs;
  }

  private matchJobsWithResume(jobs: Job[], resume: Resume): Job[] {
    this.tfidf.addDocument(resume.skills.join(' '));
    
    return jobs.map(job => {
      this.tfidf.addDocument(job.description);
      const similarity = this.calculateSimilarity(resume, job);
      return { ...job, matchScore: similarity };
    })
    .filter(job => job.matchScore > 0.7) // Only return jobs with >70% match
    .sort((a, b) => b.matchScore - a.matchScore);
  }

  private calculateSimilarity(resume: Resume, job: Job): number {
    const resumeTokens = this.tokenizer.tokenize(resume.skills.join(' ').toLowerCase());
    const jobTokens = this.tokenizer.tokenize(job.description.toLowerCase());
    
    const intersection = resumeTokens.filter(token => jobTokens.includes(token));
    return intersection.length / Math.max(resumeTokens.length, jobTokens.length);
  }

  private async autoApplyToJob(job: Job, resume: Resume) {
    try {
      const response = await axios.post(job.applyUrl, {
        resume: resume,
        coverLetter: await this.generateCoverLetter(job, resume),
        contact: resume.contact,
      });

      if (response.status === 200) {
        await this.saveApplication({
          jobId: job.id,
          status: 'applied',
          date: new Date(),
          automated: true,
        });
      }
    } catch (error) {
      console.error('Auto-apply failed:', error);
    }
  }

  private async generateCoverLetter(job: Job, resume: Resume): Promise<string> {
    // Implement AI-based cover letter generation
    return `Dear Hiring Manager,\n\nI am writing to express my interest in the ${job.title} position...`;
  }

  private shouldAutoApply(job: Job): boolean {
    return job.matchScore > 0.85 && job.quickApplyEnabled;
  }

  private async notifyNewMatches(jobs: Job[]) {
    this.eventEmitter.emit('newJobMatches', jobs);
  }

  private async getJobPreferences(): Promise<JobPreferences> {
    const preferences = await AsyncStorage.getItem('jobPreferences');
    return preferences ? JSON.parse(preferences) : null;
  }

  private async getResume(): Promise<Resume> {
    const resumePath = await AsyncStorage.getItem('resumePath');
    return resumePath ? await parseResumeFromPdf(resumePath) : null;
  }

  private async saveApplication(application: any) {
    const applications = await AsyncStorage.getItem('applications');
    const currentApplications = applications ? JSON.parse(applications) : [];
    currentApplications.push(application);
    await AsyncStorage.setItem('applications', JSON.stringify(currentApplications));
  }
}

export default new JobSearchService();