import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { fetchEPG, detectCategory } from '@/lib/epg';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const epgSources = [
      'https://iptv-org.github.io/epg/guide/ar.tv.xml',
    ];

    for (const source of epgSources) {
      const programs = await fetchEPG(source);
      
      for (const program of programs) {
        const category = detectCategory(program.title);
        
        await addDoc(collection(db, 'programs'), {
          title: program.title,
          description: program.description,
          startTime: program.startTime,
          endTime: program.endTime,
          category,
          tags: [],
          channelName: program.channel,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update EPG' }, { status: 500 });
  }
}