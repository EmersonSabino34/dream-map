import { NextResponse } from 'next/server';

function simpleHashToNumber(s: string, max: number) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h % max;
}

function pad(n: number, length: number) {
  return String(n).padStart(length, '0');
}

function computeCheckDigits(refBase: string) {
  // simple mod97 style two-digit check (not official MB algorithm) -> deterministic and safe for testing
  const num = BigInt(refBase);
  const mod = Number(num % BigInt(97));
  const check = (98 - mod) % 97;
  return pad(check, 2);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { iban, amount } = body;
    if (!iban || !amount) {
      return NextResponse.json({ error: 'Missing iban or amount' }, { status: 400 });
    }

    // Entidade: 5 dígitos determinísticos a partir do IBAN
    const entityNum = simpleHashToNumber(iban, 90000) + 10000; // garante 5 dígitos (10000..99999)
    const entity = pad(entityNum, 5);

    // Referência base: combina hash do IBAN + timestamp + valor em cêntimos
    const cents = Math.round(Number(amount) * 100);
    const baseHash = simpleHashToNumber(iban + String(Date.now()), 999999999);
    const refBase = pad(baseHash, 9) + pad(cents % 1000, 3); // 12 dígitos base

    // calcular digitos de controlo (2 dígitos)
    const check = computeCheckDigits(refBase);
    const reference = refBase + check; // 14 dígitos total (simulado)

    const instructions = `Pague na sua app MB ou homebanking: ENTIDADE ${entity} | REFERÊNCIA ${reference} | VALOR ${Number(amount).toFixed(2)} EUR`;

    return NextResponse.json({ status: 'ready', entity, reference, instructions });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
