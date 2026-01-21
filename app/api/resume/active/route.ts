import { NextResponse } from 'next/server';
import { getActiveResume } from '@/lib/data';

export async function GET() {
  try {
    const resume = await getActiveResume();
    
    if (!resume) {
      return NextResponse.json(
        { success: false, message: 'No active resume found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, resume });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch resume' },
      { status: 500 }
    );
  }
}
