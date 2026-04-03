
export enum AppView {
  WELCOME = 'welcome',
  AUTH = 'auth',
  DASHBOARD = 'dashboard',
  CHAT = 'chat',
  PROFILE = 'profile',
  ZEN_SPACE = 'zen_space',
  BOOKS = 'books',
  JOURNAL = 'journal',
  FORUM = 'forum',
  DIRECTORY = 'directory'
}

export interface UserProfile {
  fullName: string;
  photoUrl: string;
  age?: string;
  city?: string;
  bio?: string;
  medicalInfo: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  readUrl?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  type: 'binaural' | 'nature' | 'meditation';
}

export interface MeditationVideo {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export interface MotivationalVideo {
  id: string;
  title: string;
  speaker: string;
  youtubeId: string;
  description: string;
}

export interface ForumPost {
  id: string;
  author: string;
  authorPhoto: string;
  date: string;
  title: string;
  content: string;
  likes: number;
  category: string;
  image?: string;
}

export interface ForumComment {
  id: string;
  postId: string;
  author: string;
  date: string;
  content: string;
}
