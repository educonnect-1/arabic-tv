export interface User {
  id: string;
  email: string;
  interests: string[];
  favoriteGenres: string[];
  favoriteTeams: string[];
  fcmToken?: string;
  createdAt: Date;
}

export interface Channel {
  id: string;
  name: string;
  logo?: string;
  category: string;
  country?: string;
  isActive: boolean;
  updatedAt: Date;
}

export interface Frequency {
  id: string;
  channelId: string;
  satellite: string;
  frequency: number;
  polarization: string;
  symbolRate: number;
  fec: string;
  quality?: string;
  isActive: boolean;
}

export interface Program {
  id: string;
  channelId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  category: string;
  tags: string[];
  tmdbId?: number;
  imageUrl?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  link?: string;
  read: boolean;
  sentAt: Date;
}