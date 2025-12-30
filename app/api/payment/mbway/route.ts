import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, phone } = body;
    if (!amount || !phone) {
      return NextResponse.json({ error: 'Missing amount or phone' }, { status: 400 });
    }

    const txId = `MBW${Date.now()}`;

    // Simulação: retornar uma URL ou instrução que, em produção, viria do gateway MBWay
    const paymentUrl = `https://simulated.mbway.local/pay?tx=${encodeURIComponent(txId)}&amount=${encodeURIComponent(amount)}&phone=${encodeURIComponent(phone)}`;

    return NextResponse.json({
      status: 'pending',
      txId,
      paymentUrl,
      message: `Simulação: solicitação de pagamento MBWay enviada para ${phone}`,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
