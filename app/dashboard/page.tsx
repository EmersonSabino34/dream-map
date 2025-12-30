"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const router = useRouter();
  const [lang, setLang] = useState<"pt" | "en" | "es">("pt");

  const t = {
    pt: {
      title: "Dashboard",
      welcome: "Bem-vindo ao seu painel",
      subtitle: "Gerencie seus sonhos e objetivos",
      logout: "Sair",
    },
    en: {
      title: "Dashboard",
      welcome: "Welcome to your dashboard",
      subtitle: "Manage your dreams and goals",
      logout: "Logout",
    },
    es: {
      title: "Panel",
      welcome: "Bienvenido a tu panel",
      subtitle: "Administra tus sueños y objetivos",
      logout: "Salir",
    }
  }[lang];

  // --- Owner access control (hidden) ---
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const v = typeof window !== 'undefined' && localStorage.getItem('is_owner') === '1';
      setIsOwner(Boolean(v));
    } catch (e) { setIsOwner(false); }
  }, []);
  useEffect(() => {
    if (isOwner === false) {
      try { router.push('/'); } catch (e) {}
    }
  }, [isOwner, router]);

  // --- Sales state ---
  const [sales, setSales] = useState<Array<{ id: string; country: 'EU' | 'BR'; amountEUR: number; createdAt: string }>>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('sales_demo') : null;
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  });
  const [newCountry, setNewCountry] = useState<'EU' | 'BR'>('EU');
  const [newAmount, setNewAmount] = useState<number>(newCountry === 'EU' ? 10 : 33);
  const [userCount, setUserCount] = useState<number>(() => {
    try { const raw = typeof window !== 'undefined' ? localStorage.getItem('user_count') : null; return raw ? parseInt(raw, 10) : 0; } catch (e) { return 0; }
  });
  const [activePurchase, setActivePurchase] = useState<any>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('purchaseInfo');
      if (raw) setActivePurchase(JSON.parse(raw));
    } catch (e) {}
  }, []);

  const [expiryMessage, setExpiryMessage] = useState<string | null>(null);
  useEffect(() => {
    const check = () => {
      try {
        const raw = localStorage.getItem('purchaseInfo');
        if (!raw) { setExpiryMessage(null); return; }
        const info = JSON.parse(raw);
        const end = new Date(info.end);
        const now = new Date();
        const diff = Math.ceil((end.getTime() - now.getTime()) / (1000*60*60*24));
        if (diff <= 0) setExpiryMessage(`Assinatura expirada em ${end.toLocaleDateString()}`);
        else if (diff <= 3) setExpiryMessage(`Assinatura vence em ${diff} dia${diff>1?'s':''} (${end.toLocaleDateString()})`);
        else setExpiryMessage(null);
      } catch (e) { setExpiryMessage(null); }
    };
    check();
    const t = setInterval(check, 1000*60*60);
    return () => clearInterval(t);
  }, []);

  // (Exchange-rate removed from dashboard — moved to checkout)

  useEffect(() => {
    try { localStorage.setItem('sales_demo', JSON.stringify(sales)); } catch (e) {}
  }, [sales]);

  const addSale = async () => {
    // create sale: store the entered numeric value as amountEUR (no conversion in dashboard)
    let amountEUR = Number(newAmount || 0);
    const s = { id: String(Date.now()), country: newCountry, amountEUR: Number(amountEUR.toFixed(2)), createdAt: new Date().toISOString() };
    setSales((p) => [s, ...p]);
    setNewAmount(newCountry === 'EU' ? 10 : Number((33).toFixed(2)));
    try {
      const raw = localStorage.getItem('user_count'); const n = raw ? parseInt(raw,10) : 0; localStorage.setItem('user_count', String(n+1)); setUserCount(n+1);
    } catch (e) {}
  };

  const totalEur = sales.reduce((acc, s) => acc + s.amountEUR, 0);

  if (!isOwner) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: 520, maxWidth: '100%', background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>Acesso Restrito</h2>
          <p style={{ color: '#555' }}>Esta área é exclusiva do dono do aplicativo. Insira a senha para continuar.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <input type="password" value={ownerPass} onChange={(e) => setOwnerPass(e.target.value)} placeholder="Senha do dono" style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
            <button onClick={handleOwnerLogin} style={{ padding: '10px 14px', borderRadius: 8, background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>Entrar</button>
          </div>
          {ownerError ? <div style={{ marginTop: 10, color: '#b91c1c' }}>{ownerError}</div> : null}
          <div style={{ marginTop: 14, color: '#666', fontSize: 13 }}>Dica: defina `NEXT_PUBLIC_DASHBOARD_PASSWORD` no ambiente para personalizar a senha.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)",
      padding: "2rem",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 50%, #f0f0f0 100%)",
          borderRadius: "24px",
          padding: "2rem",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.8)",
          border: "3px solid rgba(0, 0, 0, 0.1)",
          animation: "cardFloat 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
        }}>
          <div>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #3498db, #2980b9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.5rem",
              animation: "titleShine 3s ease-in-out infinite"
            }}>
              {t.welcome}
            </h1>
            <p style={{
              color: "#34495e",
              fontSize: "1.125rem",
            }}>
              {t.subtitle}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            {(["pt", "en", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                type="button"
                style={{
                  padding: "0.5rem 1rem",
                  background: lang === l ? "linear-gradient(135deg, #3498db, #2980b9)" : "rgba(52, 152, 219, 0.1)",
                  border: `2px solid ${lang === l ? "#3498db" : "rgba(52, 152, 219, 0.3)"}`,
                  borderRadius: "12px",
                  color: lang === l ? "white" : "#2c3e50",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  boxShadow: lang === l ? "0 5px 15px rgba(52, 152, 219, 0.3)" : "none",
                  transform: lang === l ? "scale(1.05)" : "scale(1)"
                }}
              >
                {l === "pt" ? "🇧🇷 PT" : l === "en" ? "🇺🇸 EN" : "🇪🇸 ES"}
              </button>
            ))}
            <button
              onClick={() => router.push("/")}
              style={{
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
                boxShadow: "0 8px 20px rgba(231, 76, 60, 0.4), inset 0 -3px 0 rgba(0, 0, 0, 0.2)",
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px) scale(1.05)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 28px rgba(231, 76, 60, 0.5), inset 0 -3px 0 rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 20px rgba(231, 76, 60, 0.4), inset 0 -3px 0 rgba(0, 0, 0, 0.2)";
              }}
            >
              {t.logout}
            </button>
            {/* owner logout removed — dashboard is hidden from non-owners */}
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}>
          {/* Sales card */}
          <div style={{
            background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 50%, #f0f0f0 100%)",
            borderRadius: "24px",
            padding: "2rem",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.8)",
            border: "3px solid rgba(0, 0, 0, 0.08)",
          }}>
            <h2 style={{ marginTop: 0, marginBottom: 12, fontSize: '1.25rem', fontWeight: 700 }}>Vendas — Totais</h2>
            <div style={{ marginBottom: 12, color: '#444' }}>Usuários ativos: <strong>{userCount}</strong></div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#666' }}>Total (EUR)</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>€ {totalEur.toFixed(2)}</div>
            </div>
            {expiryMessage ? (
              <div style={{ padding: 10, background: '#fff3cd', borderRadius: 8, border: '1px solid #ffeeba', color: '#856404', marginBottom: 12 }}>
                {expiryMessage}
              </div>
            ) : null}
            {/* Exchange rate moved to checkout */}

            <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
              <select value={newCountry} onChange={(e) => { setNewCountry(e.target.value as any); setNewAmount(e.target.value === 'EU' ? 10 : 33); }} style={{ padding: 8, borderRadius: 10 }}>
                <option value="EU">Europa (EUR)</option>
                <option value="BR">Brasil (BRL)</option>
              </select>
              <input type="number" value={newAmount} onChange={(e) => setNewAmount(Number(e.target.value))} style={{ padding: 8, borderRadius: 10, flex: 1 }} />
              <button onClick={addSale} style={{ padding: '8px 12px', borderRadius: 10, background: 'linear-gradient(90deg,#10b981,#059669)', color: 'white', border: 'none', cursor: 'pointer' }}>Adicionar</button>
            </div>

            <div style={{ maxHeight: 220, overflow: 'auto' }}>
              {sales.length === 0 ? <div style={{ color: '#777' }}>Sem vendas ainda.</div> : (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {sales.map((s) => (
                    <li key={s.id} style={{ padding: 8, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{s.country === 'EU' ? 'Europa' : 'Brasil'}</div>
                        <div style={{ color: '#666', fontSize: 12 }}>{new Date(s.createdAt).toLocaleString()}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800 }}>€ {s.amountEUR.toFixed(2)}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {[
            { emoji: "📊", title: "Estatísticas", delay: "0.1s" },
            { emoji: "🎯", title: "Objetivos", delay: "0.2s" },
            { emoji: "⭐", title: "Sonhos", delay: "0.3s" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 50%, #f0f0f0 100%)",
              borderRadius: "24px",
              padding: "2rem",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.8)",
              border: "3px solid rgba(0, 0, 0, 0.08)",
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              cursor: "pointer",
              animation: `cardFloat 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${item.delay} backwards`,
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-10px) scale(1.03)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.18), inset 0 2px 4px rgba(255, 255, 255, 0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.8)";
            }}
            >
              <h2 style={{ 
                background: "linear-gradient(135deg, #3498db, #2980b9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "1rem",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}>
                {item.emoji} {item.title}
              </h2>
              <p style={{ color: "#34495e" }}>Em breve...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
