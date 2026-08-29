import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { matchProgramWithUser, sendNotification } from '@/lib/notifications';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const in15Min = new Date(now.getTime() + 15 * 60 * 1000);

    const programsSnapshot = await getDocs(
      query(
        collection(db, 'programs'),
        where('startTime', '>=', now),
        where('startTime', '<=', in15Min)
      )
    );

    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const programs = programsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    for (const user of users) {
      for (const program of programs) {
        if (matchProgramWithUser(program, user)) {
          await sendNotification(
            user.id,
            program.title,
            `هتبدأ خلال 15 دقيقة`,
            `/channels/${program.channelId}`
          );
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}