import { NextRequest, NextResponse } from 'next/server';
import { readData, deleteDocument } from '@/lib/data';

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
    return NextResponse.json({ success: true, documents: data.documents });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch documents' },
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
        { success: false, message: 'Document ID required' },
        { status: 400 }
      );
    }

    await deleteDocument(id);
    return NextResponse.json({ success: true, message: 'Document deleted' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete document' },
      { status: 500 }
    );
  }
}
