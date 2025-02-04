import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeEventEmitter } from 'react-native';
import RNNotifications from 'react-native-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { Interview, Calendar, EmailTemplate } from '../types';

class InterviewService {
  private eventEmitter: NativeEventEmitter;
  private emailTemplates: Record<string, EmailTemplate>;

  constructor() {
    this.eventEmitter = new NativeEventEmitter();
    this.initializeNotifications();
    this.loadEmailTemplates();
  }

  private async initializeNotifications() {
    RNNotifications.registerRemoteNotifications();
  }

  private async loadEmailTemplates() {
    this.emailTemplates = {
      ACCEPT: {
        subject: 'Interview Confirmation',
        body: 'Thank you for the interview invitation. I confirm my availability for {datetime}.',
      },
      RESCHEDULE: {
        subject: 'Interview Reschedule Request',
        body: 'I would like to reschedule the interview. Here are my available times: {availableTimes}',
      },
      FOLLOW_UP: {
        subject: 'Interview Follow-up',
        body: 'Thank you for taking the time to meet with me regarding the {position} role.',
      },
    };
  }

  async handleInterviewRequest(email: string): Promise<void> {
    try {
      const interviewDetails = await this.parseInterviewEmail(email);
      const calendar = await this.getUserCalendar();
      
      if (this.isTimeSlotAvailable(interviewDetails.proposedTime, calendar)) {
        await this.scheduleInterview(interviewDetails);
        await this.sendConfirmationEmail(interviewDetails);
        await this.schedulePreparation(interviewDetails);
      } else {
        const alternativeTimes = this.findAlternativeTimeSlots(calendar);
        await this.sendRescheduleRequest(interviewDetails, alternativeTimes);
      }
    } catch (error) {
      console.error('Failed to handle interview request:', error);
      throw error;
    }
  }

  private async parseInterviewEmail(email: string): Promise<Interview> {
    // Use NLP to extract interview details from email
    const datePattern = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/;
    const timePattern = /\b\d{1,2}:\d{2}\s*(?:AM|PM)\b/i;
    
    return {
      company: '',  // Extract from email
      position: '', // Extract from email
      proposedTime: new Date(),
      interviewers: [],
      format: 'video',
      platform: '',
      duration: 60,
    };
  }

  private async getUserCalendar(): Promise<Calendar> {
    const calendarData = await AsyncStorage.getItem('userCalendar');
    return calendarData ? JSON.parse(calendarData) : { events: [] };
  }

  private isTimeSlotAvailable(time: Date, calendar: Calendar): boolean {
    return !calendar.events.some(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return time >= eventStart && time <= eventEnd;
    });
  }

  private async scheduleInterview(interview: Interview): Promise<void> {
    // Add to calendar
    const calendar = await this.getUserCalendar();
    calendar.events.push({
      title: `Interview with ${interview.company}`,
      start: interview.proposedTime,
      end: new Date(interview.proposedTime.getTime() + interview.duration * 60000),
      type: 'interview',
    });
    await AsyncStorage.setItem('userCalendar', JSON.stringify(calendar));

    // Schedule notifications
    this.scheduleInterviewNotifications(interview);
  }

  private async scheduleInterviewNotifications(interview: Interview): Promise<void> {
    const notificationTimes = [
      { time: 24 * 60, message: '24 hours until your interview' },
      { time: 60, message: '1 hour until your interview' },
      { time: 15, message: '15 minutes until your interview' },
    ];

    for (const notification of notificationTimes) {
      const notificationTime = new Date(interview.proposedTime.getTime() - notification.time * 60000);
      
      RNNotifications.postLocalNotification({
        body: notification.message,
        title: `Interview with ${interview.company}`,
        sound: "default",
        silent: false,
        category: "INTERVIEW_REMINDER",
        userInfo: { interviewId: interview.id },
        fireDate: notificationTime.toISOString(),
      });
    }
  }

  private async schedulePreparation(interview: Interview): Promise<void> {
    // Schedule preparation tasks
    const preparationTasks = [
      {
        title: 'Research Company',
        description: 'Research recent news, culture, and products',
        dueDate: new Date(interview.proposedTime.getTime() - 48 * 60 * 60000),
      },
      {
        title: 'Review Job Description',
        description: 'Review requirements and prepare relevant examples',
        dueDate: new Date(interview.proposedTime.getTime() - 24 * 60 * 60000),
      },
      {
        title: 'Technical Preparation',
        description: 'Review common technical questions and prepare code samples',
        dueDate: new Date(interview.proposedTime.getTime() - 24 * 60 * 60000),
      },
      {
        title: 'Test Interview Platform',
        description: 'Ensure camera, microphone, and platform are working',
        dueDate: new Date(interview.proposedTime.getTime() - 60 * 60000),
      },
    ];

    for (const task of preparationTasks) {
      RNNotifications.postLocalNotification({
        body: task.description,
        title: task.title,
        sound: "default",
        silent: false,
        category: "PREPARATION_TASK",
        userInfo: { interviewId: interview.id },
        fireDate: task.dueDate.toISOString(),
      });
    }
  }

  private findAlternativeTimeSlots(calendar: Calendar): Date[] {
    const alternatives: Date[] = [];
    const now = new Date();
    const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60000);
    
    // Find available time slots during business hours
    for (let date = now; date <= twoWeeksFromNow; date.setDate(date.getDate() + 1)) {
      for (let hour = 9; hour <= 16; hour++) {
        const timeSlot = new Date(date.setHours(hour, 0, 0, 0));
        if (this.isTimeSlotAvailable(timeSlot, calendar)) {
          alternatives.push(timeSlot);
        }
      }
    }
    
    return alternatives.slice(0, 3); // Return top 3 alternatives
  }

  private async sendConfirmationEmail(interview: Interview): Promise<void> {
    const template = this.emailTemplates.ACCEPT;
    const emailContent = {
      to: interview.company,
      subject: template.subject,
      body: template.body.replace('{datetime}', interview.proposedTime.toLocaleString()),
    };
    
    await this.sendEmail(emailContent);
  }

  private async sendRescheduleRequest(interview: Interview, alternativeTimes: Date[]): Promise<void> {
    const template = this.emailTemplates.RESCHEDULE;
    const availableTimesFormatted = alternativeTimes
      .map(time => time.toLocaleString())
      .join('\n');
    
    const emailContent = {
      to: interview.company,
      subject: template.subject,
      body: template.body.replace('{availableTimes}', availableTimesFormatted),
    };
    
    await this.sendEmail(emailContent);
  }

  private async sendEmail(emailContent: any): Promise<void> {
    // Implement email sending logic
    console.log('Sending email:', emailContent);
  }
}

export default new InterviewService();