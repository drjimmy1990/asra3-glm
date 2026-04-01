import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/admin-auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed image types
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/avif',
];

/**
 * Resolve the uploads directory.
 * In standalone mode, process.cwd() = .next/standalone/
 * We need to write to a persistent location that survives redeploys.
 * 
 * Priority:
 * 1. UPLOADS_DIR env var (absolute path)
 * 2. PROJECT_ROOT env var + /public/uploads
 * 3. process.cwd() + /public/uploads (works in dev & standalone with symlink)
 */
function getUploadsDir(): string {
  if (process.env.UPLOADS_DIR) {
    return process.env.UPLOADS_DIR;
  }
  if (process.env.PROJECT_ROOT) {
    return path.join(process.env.PROJECT_ROOT, 'public', 'uploads');
  }
  return path.join(process.cwd(), 'public', 'uploads');
}

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const isAuthed = await verifySession();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Max: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = getUploadsDir();
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename: timestamp-randomhex.ext
    const ext = path.extname(file.name) || `.${file.type.split('/')[1]}`;
    const timestamp = Date.now();
    const randomHex = Math.random().toString(16).slice(2, 10);
    const filename = `${timestamp}-${randomHex}${ext}`;
    const filepath = path.join(uploadsDir, filename);

    // Write file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return the URL using the API serve route (works in both dev and standalone)
    const url = `/api/uploads/${filename}`;

    return NextResponse.json({
      url,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
