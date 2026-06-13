import { Education } from './education';
import { Project } from './project';
import { Skill } from './skill';
import { WorkExperience } from './work-experience';

export type ResumeSectionType = 'summary' | 'work' | 'education' | 'skills' | 'projects' | string;

export interface ResumeBasicInfo {
  fullName: string;
  headline: string;
  phone: string;
  email: string;
  location: string;
  website: string;
  avatarUrl?: string;
}

export interface ResumeSection {
  id: ResumeSectionType;
  title: string;
  enabled: boolean;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  dateRange?: string;
  description: string;
  bullets: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface Resume {
  id: string;
  title: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
  basicInfo: ResumeBasicInfo;
  summary: string;
  sections: ResumeSection[];
  workExperiences: WorkExperience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  customSections: CustomSection[];
}

export type ResumeCollection = Resume[];

