"use client";

import { useState, useRef, useEffect } from "react";

export default function CheckoutPage() {
  const [amount, setAmount] = useState<number>(33);
  const [currencySymbol, setCurrencySymbol] = useState<string>('R$');
  const [mbPhone, setMbPhone] = useState("");
  const [pixKey, setPixKey] = useState("izabellelessaicloud.com");
  const [iban, setIban] = useState("PT50003300004553973023605");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [mbResult, setMbResult] = useState<any>(null);
  const [eurToBrl, setEurToBrl] = useState<number | null>(null);
  const [toast, setToast] = useState<{ text: string; visible: boolean }>({ text: '', visible: false });
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'mbway' | 'multibanco'>('pix');
  const [purchaseInfo, setPurchaseInfo] = useState<any>(null);
  const [expiryWarning, setExpiryWarning] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('purchaseInfo');
      if (raw) setPurchaseInfo(JSON.parse(raw));
    } catch (e) {}
  }, []);

  // check expiry and notify 3 days before
  useEffect(() => {
    let timer: any;
    const check = () => {
      try {
        const raw = localStorage.getItem('purchaseInfo');
        if (!raw) { setExpiryWarning(null); return; }
        const info = JSON.parse(raw);
        const end = new Date(info.end);
        const now = new Date();
        const diffMs = end.getTime() - now.getTime();
        const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        if (days <= 0) setExpiryWarning(`Sua assinatura expirou em ${end.toLocaleDateString()}`);
        else if (days <= 3) setExpiryWarning(`Sua assinatura vence em ${days} dia${days > 1 ? 's' : ''} (${end.toLocaleDateString()})`);
        else setExpiryWarning(null);
      } catch (e) {
        setExpiryWarning(null);
      }
    };
    check();
    // re-check every hour
    timer = setInterval(check, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);
  
  const pixQrRef = useRef<HTMLDivElement | null>(null);
  const mbQrRef = useRef<HTMLDivElement | null>(null);
  const mbwayQrRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!(window as any).QRCode) {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('https://api.exchangerate.host/latest?base=EUR&symbols=BRL');
        const json = await res.json();
        if (!cancelled && json && json.rates && typeof json.rates.BRL === 'number') setEurToBrl(json.rates.BRL);
      } catch (err) {
        // ignore
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const renderQR = (container: HTMLDivElement | null, text?: string) => {
    if (!container || !text) return;
    container.innerHTML = '';
    const QRCodeCtor = (window as any).QRCode;
    if (QRCodeCtor) {
      // @ts-ignore
      new QRCodeCtor(container, { text, width: 220, height: 220 });
    } else {
      const img = document.createElement('img');
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(text)}`;
      container.appendChild(img);
    }
  };

  useEffect(() => {
    if (result && (result.pixPayload || result.qrImage)) {
      const payload = result.qrImage ? result.qrImage : result.pixPayload;
      if (pixQrRef.current) {
        if (result.qrImage && String(result.qrImage).startsWith('data:')) {
          pixQrRef.current.innerHTML = '';
          const img = document.createElement('img');
          img.src = result.qrImage;
          pixQrRef.current.appendChild(img);
        } else {
          renderQR(pixQrRef.current, payload);
        }
      }
    }
  }, [result]);

  useEffect(() => {
    if (mbResult) {
      const text = `ENTIDADE:${mbResult.entity} REFERENCIA:${mbResult.reference} VALOR:${Number(amount).toFixed(2)}`;
      renderQR(mbQrRef.current, text);
    }
  }, [mbResult]);

  useEffect(() => {
    if (result && result.paymentUrl) {
      renderQR(mbwayQrRef.current, result.paymentUrl);
    }
  }, [result]);

  const callApi = async (url: string, body: any) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setResult(json);
    } catch (err) {
      setResult({ error: String(err) });
    } finally {
      setLoading(false);
    }
  };

  const callMb = async () => {
    setLoading(true);
    setMbResult(null);
    try {
      const res = await fetch('/api/payment/multibanco', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ iban, amount }),
      });
      const json = await res.json();
      setMbResult(json);
    } catch (err) {
      setMbResult({ error: String(err) });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(String(text ?? ''));
      setToast({ text: label ?? 'Copiado!', visible: true });
      setTimeout(() => setToast({ text: '', visible: false }), 1900);
      if (label) {
        // use label as id-ish (safe) to show icon feedback
        setCopiedIcon(label);
        setTimeout(() => setCopiedIcon(null), 1500);
      }
    } catch (err) {
      setToast({ text: 'Erro ao copiar', visible: true });
      setTimeout(() => setToast({ text: '', visible: false }), 1900);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Pagamento — MBWay / PIX (simulado)</h1>

      {expiryWarning ? (
        <div style={{ marginBottom: 12, padding: 12, borderRadius: 10, background: '#fff3cd', border: '1px solid #ffeeba', color: '#856404' }}>
          {expiryWarning} — iremos avisar 3 dias antes do vencimento.
        </div>
      ) : null}

      <div style={{ display: "flex", justifyContent: 'center', gap: 18 }}>
        <section style={{ padding: 18, borderRadius: 12, background: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,0.06)", width: '720px', maxWidth: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <h2 style={{ margin: 0 }}>Pagamento</h2>
              <small style={{ color: '#666' }}>Escolha o método e confirme</small>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <label style={{ display: 'flex', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                <input type="radio" name="method" checked={selectedMethod === 'pix'} onChange={() => { setSelectedMethod('pix'); setAmount(33); setCurrencySymbol('R$'); }} />
                <span style={{ fontSize: 20 }}>🇧🇷</span>
                <span style={{ fontSize: 12 }}>PIX</span>
              </label>
              <label style={{ display: 'flex', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                <input type="radio" name="method" checked={selectedMethod === 'mbway'} onChange={() => { setSelectedMethod('mbway'); setAmount(5); setCurrencySymbol('€'); }} />
                <span style={{ fontSize: 20 }}>🇬🇧</span>
                <span style={{ fontSize: 12 }}>MBWay</span>
              </label>
              <label style={{ display: 'flex', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                <input type="radio" name="method" checked={selectedMethod === 'multibanco'} onChange={() => { setSelectedMethod('multibanco'); setAmount(5); setCurrencySymbol('€'); }} />
                <span style={{ fontSize: 16 }}>🏧</span>
                <span style={{ fontSize: 12 }}>Multibanco</span>
              </label>
            </div>
          </div>

          <div className="payment-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, alignItems: 'start' }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Valor
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
                  <div style={{ padding: '8px 12px', background: '#f3f4f6', borderRadius: 8, minWidth: 64, textAlign: 'center', color: '#111', fontWeight: 600 }}>{currencySymbol}</div>
                  <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} style={{ width: "100%", padding: 8, borderRadius: 8, border: '1px solid #e6e6e6' }} />
                </div>
              </label>

              {selectedMethod === 'pix' && (
                <label style={{ display: 'block', marginBottom: 8 }}>
                  Chave PIX
                  <input placeholder="CPF / email / telefone / chave" value={pixKey} onChange={(e) => setPixKey(e.target.value)} style={{ width: "100%", padding: 8, marginTop: 6 }} />
                </label>
              )}

              {selectedMethod === 'mbway' && (
                <label style={{ display: 'block', marginBottom: 8 }}>
                  Número MBWay
                  <input placeholder="ex: 912345678" value={mbPhone} onChange={(e) => setMbPhone(e.target.value)} style={{ width: "100%", padding: 8, marginTop: 6 }} />
                </label>
              )}

              {selectedMethod === 'multibanco' && (
                <label style={{ display: 'block', marginBottom: 8 }}>
                  IBAN Recebedor
                  <input value={iban} onChange={(e) => setIban(e.target.value)} style={{ width: "100%", padding: 8, marginTop: 6 }} />
                </label>
              )}

              <div style={{ marginTop: 8 }}>
                {selectedMethod === 'pix' && (
                  <button onClick={() => {
                    const now = new Date();
                    const end = new Date(now);
                    end.setMonth(end.getMonth() + 1);
                    const info = { start: now.toISOString(), end: end.toISOString(), amount, method: 'pix' };
                    setPurchaseInfo(info);
                    try { localStorage.setItem('purchaseInfo', JSON.stringify(info)); const raw = localStorage.getItem('user_count'); const n = raw ? parseInt(raw,10) : 0; localStorage.setItem('user_count', String(n+1)); } catch (e) {}
                    callApi('/api/payment/pix', { amount, key: pixKey });
                  }} disabled={loading || !pixKey} style={{ padding: '12px 16px', borderRadius: 12, background: 'linear-gradient(90deg,#0ea5a4,#0369a1)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, width: '100%' }}>
                    {loading ? 'Gerando...' : `Gerar PIX — ${currencySymbol}${amount}`}
                  </button>
                )}

                {selectedMethod === 'mbway' && (
                  <button onClick={() => {
                    const now = new Date();
                    const end = new Date(now);
                    end.setMonth(end.getMonth() + 1);
                    const info = { start: now.toISOString(), end: end.toISOString(), amount, method: 'mbway' };
                    setPurchaseInfo(info);
                    try { localStorage.setItem('purchaseInfo', JSON.stringify(info)); const raw = localStorage.getItem('user_count'); const n = raw ? parseInt(raw,10) : 0; localStorage.setItem('user_count', String(n+1)); } catch (e) {}
                    callApi('/api/payment/mbway', { amount, phone: mbPhone });
                  }} disabled={loading || !mbPhone} style={{ padding: '12px 16px', borderRadius: 12, background: 'linear-gradient(90deg,#7c3aed,#c026d3)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, width: '100%' }}>
                    {loading ? 'Enviando...' : `Pagar com MBWay — ${currencySymbol}${amount}`}
                  </button>
                )}

                {selectedMethod === 'multibanco' && (
                  <button onClick={async () => { const now = new Date(); const end = new Date(now); end.setMonth(end.getMonth()+1); const info = { start: now.toISOString(), end: end.toISOString(), amount, method: 'multibanco' }; setPurchaseInfo(info); try { localStorage.setItem('purchaseInfo', JSON.stringify(info)); const raw = localStorage.getItem('user_count'); const n = raw ? parseInt(raw,10) : 0; localStorage.setItem('user_count', String(n+1)); } catch (e) {} await callMb(); /* ensure result also set */ }} disabled={loading || !iban} style={{ padding: '12px 16px', borderRadius: 12, background: 'linear-gradient(90deg,#f59e0b,#ef4444)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, width: '100%' }}>
                    {loading ? 'Gerando...' : `Gerar Entidade/Referência — ${currencySymbol}${amount}`}
                  </button>
                )}
              </div>
            </div>

            <div className="side-panel" style={{ textAlign: 'center', marginTop: 12, paddingTop: 12, borderTop: '1px solid #f4f4f4' }}>
              <div style={{ width: 84, height: 84, margin: '0 auto', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, background: 'linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))', boxShadow: '0 8px 30px rgba(2,6,23,0.08)' }}>{selectedMethod === 'pix' ? '🇧🇷' : selectedMethod === 'mbway' ? '🇬🇧' : '🏧'}</div>
              <div style={{ marginTop: 8, color: '#666', fontWeight: 600 }}>{selectedMethod === 'pix' ? 'PIX (Brasil)' : selectedMethod === 'mbway' ? 'MBWay' : 'Multibanco'}</div>
              <div style={{ marginTop: 6, color: '#111', fontSize: 14 }}>{currencySymbol}{amount}</div>
              {currencySymbol === '€' && eurToBrl ? (
                <div style={{ marginTop: 6, color: '#666', fontSize: 13 }}>R$ {(amount * eurToBrl).toFixed(2)}</div>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      <style>{`\n        .checkout-card { border-radius: 16px; overflow: hidden; }\n        section.checkout-card { }\n        .payment-grid { gap: 12px; }\n        @media (max-width: 720px) {\n          .payment-grid { grid-template-columns: 1fr !important; }\n        }\n      `}</style>
      <div style={{ marginTop: 18, padding: 16, background: '#fbfbfb', borderRadius: 12 }}>
        <h3>Resultado / instruções</h3>
        {mbResult ? (
          <div>
            <strong>Multibanco:</strong>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{JSON.stringify(mbResult, null, 2)}</pre>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
              <button title="Copiar ENTIDADE" aria-label="Copiar ENTIDADE" onClick={() => copyToClipboard(mbResult.entity, 'Entidade copiada')} style={{ background: 'transparent', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer', color: '#6b4a2e', position: 'relative' }}>
                {copiedIcon === 'Entidade copiada' ? (
                  <div style={{ position: 'absolute', right: 2, top: 2, background: '#2ecc71', borderRadius: 10, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12 }}>✓</div>
                ) : null}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 21H8a2 2 0 0 1-2-2V7h2v12h8v2z" fill="currentColor"/><path d="M20 5h-8l-2-2H4a2 2 0 0 0-2 2v12h2V5h4.586L12 7.414 14.586 5H20v0z" fill="currentColor"/></svg>
              </button>

              <button title="Copiar REFERÊNCIA" aria-label="Copiar REFERÊNCIA" onClick={() => copyToClipboard(mbResult.reference, 'Referência copiada')} style={{ background: 'transparent', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer', color: '#6b4a2e', position: 'relative' }}>
                {copiedIcon === 'Referência copiada' ? (
                  <div style={{ position: 'absolute', right: 2, top: 2, background: '#2ecc71', borderRadius: 10, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12 }}>✓</div>
                ) : null}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 7v13a1 1 0 0 0 1 1h5v-7h6v7h5a1 1 0 0 0 1-1V7l-9-5z" fill="currentColor"/></svg>
              </button>

              <button title="Copiar VALOR" aria-label="Copiar VALOR" onClick={() => copyToClipboard(Number(amount).toFixed(2), 'Valor copiado')} style={{ background: 'transparent', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer', color: '#6b4a2e', position: 'relative' }}>
                {copiedIcon === 'Valor copiado' ? (
                  <div style={{ position: 'absolute', right: 2, top: 2, background: '#2ecc71', borderRadius: 10, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12 }}>✓</div>
                ) : null}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <div style={{ marginTop: 8 }} ref={mbQrRef} />
          </div>
        ) : result ? (
          <div>
            <strong>Resposta:</strong>
            {purchaseInfo ? (
              <div style={{ marginTop: 8, padding: 10, background: '#fff', borderRadius: 8, border: '1px solid #eee' }}>
                <div style={{ fontWeight: 700 }}>Assinatura: 1 mês</div>
                <div style={{ color: '#555', marginTop: 6 }}>Validade: {new Date(purchaseInfo.start).toLocaleDateString()} — {new Date(purchaseInfo.end).toLocaleDateString()}</div>
              </div>
            ) : null}
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{JSON.stringify(result, null, 2)}</pre>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
              {result.pixPayload ? (
                <button title="Copiar PIX payload" aria-label="Copiar PIX payload" onClick={() => copyToClipboard(result.pixPayload, 'PIX copiado')} style={{ background: 'transparent', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer', color: '#2c3e50', position: 'relative' }}>
                  {copiedIcon === 'PIX copiado' ? (
                    <div style={{ position: 'absolute', right: 2, top: 2, background: '#2ecc71', borderRadius: 10, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12 }}>✓</div>
                  ) : null}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1z" fill="currentColor"/><path d="M20 5H8a2 2 0 0 0-2 2v14h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" fill="currentColor"/></svg>
                </button>
              ) : null}

              {result.paymentUrl ? (
                <button title="Copiar MBWay link" aria-label="Copiar MBWay link" onClick={() => copyToClipboard(result.paymentUrl, 'Link MBWay copiado')} style={{ background: 'transparent', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer', color: '#2c3e50', position: 'relative' }}>
                  {copiedIcon === 'Link MBWay copiado' ? (
                    <div style={{ position: 'absolute', right: 2, top: 2, background: '#2ecc71', borderRadius: 10, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12 }}>✓</div>
                  ) : null}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 14a3 3 0 0 1 0-6h4a3 3 0 0 1 0 6h-4z" fill="currentColor"/><path d="M7 17a5 5 0 0 1 0-10h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              ) : null}
            </div>

            {/* QR PIX */}
            <div style={{ marginTop: 8 }} ref={pixQrRef} />

            {/* QR MBWay */}
            <div style={{ marginTop: 8 }} ref={mbwayQrRef} />
          </div>
        ) : (
          <div style={{ color: '#666' }}>Nenhuma instrução ainda. Execute um pagamento.</div>
        )}
      </div>
      {/* Toast simples de cópia */}
      {toast.visible ? (
        <div style={{ position: 'fixed', right: 20, top: 20, background: 'rgba(44,62,80,0.95)', color: 'white', padding: '8px 12px', borderRadius: 8, boxShadow: '0 8px 20px rgba(0,0,0,0.2)', zIndex: 9999 }}>
          {toast.text}
        </div>
      ) : null}
    </div>
  );
}
