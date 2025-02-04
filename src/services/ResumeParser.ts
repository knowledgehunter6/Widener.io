import { readFile } from 'react-native-file-access';
import natural from 'natural';
import type { Resume } from '../types';

class ResumeParser {
  private tokenizer: natural.WordTokenizer;
  private classifier: natural.BayesClassifier;

  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.classifier = new natural.BayesClassifier();
    this.trainClassifier();
  }

  private trainClassifier() {
    // Train for skills section
    this.classifier.addDocument('proficient in javascript typescript react', 'skills');
    this.classifier.addDocument('experienced with node.js express mongodb', 'skills');
    this.classifier.addDocument('languages frameworks tools', 'skills');
    
    // Train for experience section
    this.classifier.addDocument('work experience professional history', 'experience');
    this.classifier.addDocument('senior software engineer tech lead', 'experience');
    
    // Train for education section
    this.classifier.addDocument('education university college degree', 'education');
    this.classifier.addDocument('bachelor master phd computer science', 'education');
    
    this.classifier.train();
  }

  async parseResume(filePath: string): Promise<Resume> {
    try {
      const content = await readFile(filePath, 'utf8');
      const sections = this.splitIntoSections(content);
      
      return {
        skills: this.extractSkills(sections.skills),
        experience: this.extractExperience(sections.experience),
        education: this.extractEducation(sections.education),
        contact: this.extractContactInfo(content),
        rawContent: content,
      };
    } catch (error) {
      console.error('Resume parsing failed:', error);
      throw error;
    }
  }

  private splitIntoSections(content: string): Record<string, string> {
    const lines = content.split('\n');
    const sections: Record<string, string[]> = {
      skills: [],
      experience: [],
      education: [],
    };
    
    let currentSection = '';
    
    for (const line of lines) {
      const classification = this.classifier.classify(line.toLowerCase());
      
      if (classification !== currentSection) {
        currentSection = classification;
      }
      
      if (currentSection && sections[currentSection]) {
        sections[currentSection].push(line);
      }
    }
    
    return Object.fromEntries(
      Object.entries(sections).map(([key, lines]) => [key, lines.join('\n')])
    );
  }

  private extractSkills(content: string): string[] {
    if (!content) return [];

    const tokens = this.tokenizer.tokenize(content.toLowerCase());
    const commonSkills = [
      'javascript', 'typescript', 'react', 'node', 'python',
      'java', 'c++', 'sql', 'aws', 'docker', 'kubernetes',
      'git', 'agile', 'scrum', 'ci/cd', 'rest', 'graphql'
    ];
    
    return tokens.filter(token => commonSkills.includes(token));
  }

  private extractExperience(content: string): Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }> {
    if (!content) return [];

    const experiences: Array<{
      title: string;
      company: string;
      duration: string;
      description: string;
    }> = [];

    const experienceBlocks = content.split(/\n{2,}/);
    
    for (const block of experienceBlocks) {
      const lines = block.split('\n');
      if (lines.length < 3) continue;

      const titleMatch = lines[0].match(/^(.*?)\s*(?:at|@|,)\s*(.*)$/);
      const durationMatch = lines[1].match(/(\w+ \d{4}\s*-\s*(?:\w+ \d{4}|Present))/i);

      if (titleMatch && durationMatch) {
        experiences.push({
          title: titleMatch[1].trim(),
          company: titleMatch[2].trim(),
          duration: durationMatch[1],
          description: lines.slice(2).join('\n').trim(),
        });
      }
    }

    return experiences;
  }

  private extractEducation(content: string): Array<{
    degree: string;
    institution: string;
    year: string;
  }> {
    if (!content) return [];

    const education: Array<{
      degree: string;
      institution: string;
      year: string;
    }> = [];

    const educationBlocks = content.split(/\n{2,}/);
    
    for (const block of educationBlocks) {
      const lines = block.split('\n');
      if (lines.length < 2) continue;

      const degreeMatch = lines[0].match(/^(.*?)\s*(?:from|at|,)\s*(.*)$/);
      const yearMatch = lines[1].match(/(\d{4})/);

      if (degreeMatch && yearMatch) {
        education.push({
          degree: degreeMatch[1].trim(),
          institution: degreeMatch[2].trim(),
          year: yearMatch[1],
        });
      }
    }

    return education;
  }

  private extractContactInfo(content: string): {
    name: string;
    email: string;
    phone: string;
    location: string;
  } {
    const emailMatch = content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    const phoneMatch = content.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/);
    const nameMatch = content.match(/^([A-Z][a-z]+ [A-Z][a-z]+)/m);
    const locationMatch = content.match(/([A-Z][a-z]+(?:[\s,]+[A-Z][a-z]+)*,\s*[A-Z]{2})/);

    return {
      name: nameMatch ? nameMatch[1] : '',
      email: emailMatch ? emailMatch[0] : '',
      phone: phoneMatch ? phoneMatch[0] : '',
      location: locationMatch ? locationMatch[1] : '',
    };
  }
}

export default new ResumeParser();