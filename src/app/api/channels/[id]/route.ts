import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const channelDoc = await getDoc(doc(db, 'channels', params.id));
    
    if (!channelDoc.exists()) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    const channel = { id: channelDoc.id, ...channelDoc.data() };

    const frequenciesSnapshot = await getDocs(
      query(collection(db, 'frequencies'), where('channelId', '==', params.id))
    );
    const frequencies = frequenciesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const now = new Date();
    const programsSnapshot = await getDocs(
      query(
        collection(db, 'programs'),
        where('channelId', '==', params.id),
        where('endTime', '>=', now)
      )
    );
    const programs = programsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const currentProgram = programs.find(
      (p: any) => new Date(p.startTime) <= now && new Date(p.endTime) >= now
    );

    const upcomingPrograms = programs.filter(
      (p: any) => new Date(p.startTime) > now
    );

    return NextResponse.json({
      channel,
      frequencies,
      currentProgram,
      upcomingPrograms,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch channel' }, { status: 500 });
  }
}