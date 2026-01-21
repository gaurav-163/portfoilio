import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { addResume } from '@/lib/data';

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

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type (PDF)
    if (!file.name.endsWith('.pdf')) {
      return NextResponse.json(
        { success: false, message: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `resume_${timestamp}.pdf`;
    const filePath = path.join(process.cwd(), 'public', 'assets', 'resumes', filename);

    await writeFile(filePath, buffer);

    // Save to JSON data
    await addResume({
      id: timestamp.toString(),
      filename: file.name,
      uploadDate: new Date().toISOString(),
      path: `/assets/resumes/${filename}`,
      active: true
    });

    return NextResponse.json({
      success: true,
      message: 'Resume uploaded successfully',
      path: `/assets/resumes/${filename}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Upload failed' },
      { status: 500 }
    );
  }
}
