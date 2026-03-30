import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, mobile, projectType, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID().replace(/-/g, '').substring(0, 25);
    const now = new Date().toISOString();

    await db.$executeRawUnsafe(
      `INSERT INTO ContactSubmission (id, name, email, mobile, projectType, budget, message, read, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      id, name, email, mobile || '', projectType || '', budget || '', message, 0, now
    );

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
