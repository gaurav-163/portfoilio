import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'portfolio.json');

export interface Resume {
  id: string;
  filename: string;
  uploadDate: string;
  path: string;
  active: boolean;
}

export interface Document {
  id: string;
  title: string;
  filename: string;
  uploadDate: string;
  path: string;
  category: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  twitter?: string;
  website?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  achievements: string[];
  period: string;
  github?: string;
  demo?: string;
  image?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface PortfolioData {
  resumes: Resume[];
  documents: Document[];
  profile?: Profile;
  projects: Project[];
  experiences: Experience[];
  skills: SkillCategory[];
}

export async function readData(): Promise<PortfolioData> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return default structure
    return {
      resumes: [],
      documents: [],
      projects: [],
      experiences: [],
      skills: [],
      profile: {
        name: 'Your Name',
        title: 'Your Title',
        bio: 'Your bio...',
        email: 'your.email@example.com',
        phone: '+1234567890',
        location: 'Your Location',
        linkedin: 'https://linkedin.com/in/yourprofile',
        github: 'https://github.com/yourusername'
      }
    };
  }
}

export async function writeData(data: PortfolioData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function addResume(resume: Resume): Promise<void> {
  const data = await readData();
  
  // Set all resumes to inactive
  data.resumes = data.resumes.map(r => ({ ...r, active: false }));
  
  // Add new resume as active
  data.resumes.push(resume);
  
  await writeData(data);
}

export async function getActiveResume(): Promise<Resume | null> {
  const data = await readData();
  return data.resumes.find(r => r.active) || null;
}

export async function addDocument(document: Document): Promise<void> {
  const data = await readData();
  data.documents.push(document);
  await writeData(data);
}

export async function deleteResume(id: string): Promise<void> {
  const data = await readData();
  const resume = data.resumes.find(r => r.id === id);
  
  if (resume) {
    // Delete file
    const filePath = path.join(process.cwd(), 'public', resume.path);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
    
    // Remove from data
    data.resumes = data.resumes.filter(r => r.id !== id);
    await writeData(data);
  }
}

export async function deleteDocument(id: string): Promise<void> {
  const data = await readData();
  const document = data.documents.find(d => d.id === id);
  
  if (document) {
    // Delete file
    const filePath = path.join(process.cwd(), 'public', document.path);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
    
    // Remove from data
    data.documents = data.documents.filter(d => d.id !== id);
    await writeData(data);
  }
}

export async function setActiveResume(id: string): Promise<void> {
  const data = await readData();
  data.resumes = data.resumes.map(r => ({
    ...r,
    active: r.id === id
  }));
  await writeData(data);
}
