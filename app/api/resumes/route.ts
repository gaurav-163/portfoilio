import { NextRequest, NextResponse } from 'next/server';
import { readData, deleteResume, setActiveResume } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const authCookie = request.cookies.get('admin-auth');
    if (authCookie?.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await readData();
    return NextResponse.json({ success: true, resumes: data.resumes });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authCookie = request.cookies.get('admin-auth');
    if (authCookie?.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Resume ID required' },
        { status: 400 }
      );
    }

    await deleteResume(id);
    return NextResponse.json({ success: true, message: 'Resume deleted' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete resume' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authCookie = request.cookies.get('admin-auth');
    if (authCookie?.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Resume ID required' },
        { status: 400 }
      );
    }

    await setActiveResume(id);
    return NextResponse.json({ success: true, message: 'Active resume updated' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update resume' },
      { status: 500 }
    );
  }
}
