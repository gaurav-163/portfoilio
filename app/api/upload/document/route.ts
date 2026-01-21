import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { addDocument } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authCookie = request.cookies.get('admin-auth');
    if (authCookie?.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string || 'general';

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(file.name);
    const filename = `doc_${timestamp}${ext}`;
    const filePath = path.join(process.cwd(), 'public', 'assets', 'documents', filename);

    await writeFile(filePath, buffer);

    // Save to JSON data
    await addDocument({
      id: timestamp.toString(),
      title: title || file.name,
      filename: file.name,
      uploadDate: new Date().toISOString(),
      path: `/assets/documents/${filename}`,
      category
    });

    return NextResponse.json({
      success: true,
      message: 'Document uploaded successfully',
      path: `/assets/documents/${filename}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Upload failed' },
      { status: 500 }
    );
  }
}
