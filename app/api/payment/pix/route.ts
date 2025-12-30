import { NextResponse } from 'next/server';

function svgDataUrlForText(text: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'><rect width='100%' height='100%' fill='%23fff'/><g fill='%236b4a2e' font-family='sans-serif' font-size='12'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'>${text}</text></g></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, key } = body;
    if (!amount || !key) {
      return NextResponse.json({ error: 'Missing amount or key' }, { status: 400 });
    }

    const txId = `PIX${Date.now()}`;

    // Simulado: gerar payload PIX simples e um QR SVG (placeholder)
    const pixPayload = `pix://${txId}?amount=${amount}&key=${encodeURIComponent(key)}`;
    const qrImage = svgDataUrlForText(`PIX ${txId}`);

    return NextResponse.json({
      status: 'ready',
      txId,
      pixPayload,
      qrImage,
      message: 'Copia a string PIX ou escaneie o QR (simulado).',
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
