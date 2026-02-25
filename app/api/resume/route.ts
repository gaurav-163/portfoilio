import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const resumeDir = path.join(process.cwd(), 'public', 'resume');
    const files = await fs.readdir(resumeDir);
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));
    return NextResponse.json({ filename: pdfFiles.length > 0 ? pdfFiles[0] : null, files, pdfFiles, resumeDir });
  } catch (error) {
    return NextResponse.json({ filename: null, error: String(error) });
  }
}