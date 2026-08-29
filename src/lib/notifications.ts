import { db } from './firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { User, Program } from '@/types';

export function matchProgramWithUser(program: Program, user: User): boolean {
  if (!user.interests.includes(program.category)) return false;
  
  if (program.category === 'movie' && user.favoriteGenres.length > 0) {
    const hasMatch = program.tags.some(tag => user.favoriteGenres.includes(tag));
    if (!hasMatch) return false;
  }
  
  if (program.category === 'sports' && user.favoriteTeams.length > 0) {
    const hasTeam = user.favoriteTeams.some(team =>
      program.title.toLowerCase().includes(team.toLowerCase())
    );
    if (!hasTeam) return false;
  }
  
  return true;
}

export async function sendNotification(userId: string, title: string, body: string, link?: string) {
  try {
    await addDoc(collection(db, 'notifications'), {
      userId,
      title,
      body,
      link,
      read: false,
      sentAt: new Date(),
    });
  } catch (error) {
    console.error('Notification error:', error);
  }
}