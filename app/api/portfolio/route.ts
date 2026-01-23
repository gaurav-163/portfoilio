import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';

// GET - Fetch portfolio data
export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// PUT - Update entire portfolio data
export async function PUT(request: NextRequest) {
  try {
    const { section, data } = await request.json();
    
    const portfolioData = await readData();
    
    if (section === 'profile') {
      portfolioData.profile = data;
    } else if (section === 'projects') {
      portfolioData.projects = data;
    } else if (section === 'experiences') {
      portfolioData.experiences = data;
    } else if (section === 'skills') {
      portfolioData.skills = data;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid section' },
        { status: 400 }
      );
    }
    
    await writeData(portfolioData);
    
    return NextResponse.json({ success: true, data: portfolioData });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update data' },
      { status: 500 }
    );
  }
}

// POST - Add new item to a section
export async function POST(request: NextRequest) {
  try {
    const { section, item } = await request.json();
    
    const portfolioData = await readData();
    
    if (section === 'projects') {
      portfolioData.projects.push({ ...item, id: Date.now().toString() });
    } else if (section === 'experiences') {
      portfolioData.experiences.push({ ...item, id: Date.now().toString() });
    } else if (section === 'skills') {
      portfolioData.skills.push({ ...item, id: Date.now().toString() });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid section' },
        { status: 400 }
      );
    }
    
    await writeData(portfolioData);
    
    return NextResponse.json({ success: true, data: portfolioData });
  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add item' },
      { status: 500 }
    );
  }
}

// DELETE - Delete item from a section
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    const id = searchParams.get('id');
    
    if (!section || !id) {
      return NextResponse.json(
        { success: false, message: 'Section and ID required' },
        { status: 400 }
      );
    }
    
    const portfolioData = await readData();
    
    if (section === 'projects') {
      portfolioData.projects = portfolioData.projects.filter((p: any) => p.id !== id);
    } else if (section === 'experiences') {
      portfolioData.experiences = portfolioData.experiences.filter((e: any) => e.id !== id);
    } else if (section === 'skills') {
      portfolioData.skills = portfolioData.skills.filter((s: any) => s.id !== id);
    }
    
    await writeData(portfolioData);
    
    return NextResponse.json({ success: true, data: portfolioData });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete item' },
      { status: 500 }
    );
  }
}
