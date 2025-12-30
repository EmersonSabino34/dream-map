"use client";

import { useState } from "react";

export default function AiImageGenerator({ onApply }: { onApply?: (url: string) => void }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setError(null);
    if (!prompt.trim()) { setError('Escreva um prompt.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/ai-image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
      const json = await res.json();
      if (json?.url) {
        setUrl(json.url);
      } else {
        setError('Não foi possível gerar a imagem.');
      }
    } catch (err: any) {
      setError(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  };

  const apply = () => {
    if (!url) return;
    try { localStorage.setItem('mural_image', url); } catch (e) {}
    if (onApply) onApply(url);
  };

  return (
    <div style={{ padding: 12, borderRadius: 12, background: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', maxWidth: 720 }}>
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', fontWeight: 700, marginBottom: 6 }}>Gerar imagem (IA) para o mural</label>
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ex: parede rústica branca com textura de madeira e luz suave" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e6e6e6' }} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={generate} disabled={loading} style={{ padding: '10px 14px', borderRadius: 8, background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>{loading ? 'Gerando...' : 'Gerar'}</button>
        <button onClick={apply} disabled={!url} style={{ padding: '10px 14px', borderRadius: 8, background: '#10b981', color: 'white', border: 'none', cursor: url ? 'pointer' : 'not-allowed' }}>Aplicar ao mural</button>
      </div>
      {error ? <div style={{ marginTop: 8, color: '#b91c1c' }}>{error}</div> : null}
      {url ? (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, color: '#555', marginBottom: 6 }}>Pré-visualização</div>
          <img src={url} alt="preview" style={{ width: '100%', borderRadius: 8, maxHeight: 360, objectFit: 'cover' }} />
        </div>
      ) : null}
    </div>
  );
}
