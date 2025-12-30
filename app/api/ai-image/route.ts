import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

async function saveBufferToPublic(buffer: Buffer, contentType: string) {
  const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
  const dir = path.join(process.cwd(), 'public', 'assets', 'generated');
  await fs.mkdir(dir, { recursive: true });
  const filename = `${Date.now()}.${ext}`;
  const full = path.join(dir, filename);
  await fs.writeFile(full, buffer);
  return `/assets/generated/${filename}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = String(body.prompt || '').trim();
    if (!prompt) return NextResponse.json({ error: 'prompt required' }, { status: 400 });

    let imageUrl: string | null = null;
    let meta: any = null;

    const token = process.env.REPLICATE_API_TOKEN;
    if (token) {
      try {
        const res = await fetch('https://api.replicate.com/v1/predictions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ version: 'stable-diffusion', input: { prompt } }),
        });
        const data = await res.json();
        meta = data;
        if (data && data.output && Array.isArray(data.output) && data.output[0]) {
          imageUrl = data.output[0];
        }
      } catch (err: any) {
        console.error('Replicate call failed', err?.message ?? err);
      }
    }

    // fallback to Unsplash source if no imageUrl
    if (!imageUrl) {
      imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(prompt)}`;
    }

    // Handle data URLs (base64) and remote URLs — fetch and save to public
    if (imageUrl.startsWith('data:')) {
      const parts = imageUrl.split(',');
      const m = parts[0].match(/data:(.*);base64/);
      const contentType = m ? m[1] : 'image/jpeg';
      const buffer = Buffer.from(parts[1], 'base64');
      const local = await saveBufferToPublic(buffer, contentType);
      return NextResponse.json({ url: local, meta });
    }

    // Otherwise fetch the image URL and store locally
    try {
      const fetchRes = await fetch(imageUrl);
      if (!fetchRes.ok) throw new Error(`Image fetch failed: ${fetchRes.status}`);
      const contentType = (fetchRes.headers.get('content-type') || 'image/jpeg').toLowerCase();
      const arrayBuf = await fetchRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuf);
      const local = await saveBufferToPublic(buffer, contentType);
      return NextResponse.json({ url: local, meta });
    } catch (err: any) {
      // If saving failed, still return the remote URL as fallback
      console.error('Saving image failed', err?.message ?? err);
      return NextResponse.json({ url: imageUrl, meta });
    }
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}
