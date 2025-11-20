export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'Music Video' | 'Commercial' | 'Social' | 'Documentary';
  duration: string;
  image: string;
  tags: string[];
  description: string;
}

export enum ViewState {
  INTRO = 'INTRO',
  WORK = 'WORK',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}