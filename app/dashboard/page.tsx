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

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "2rem",
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
        }}>
          <div>
            <h1 style={{
              color: "white",
              fontSize: "2.5rem",
              marginBottom: "0.5rem",
            }}>
              {t.welcome}
            </h1>
            <p style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.1rem",
            }}>
              {t.subtitle}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "pt" | "en" | "es")}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                border: "2px solid white",
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              <option value="pt">🇧🇷 Português</option>
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Español</option>
            </select>
            <button
              onClick={() => router.push("/")}
              style={{
                padding: "0.5rem 1.5rem",
                background: "white",
                color: "#667eea",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              {t.logout}
            </button>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}>
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}>
            <h2 style={{ color: "#667eea", marginBottom: "1rem" }}>
              📊 Estatísticas
            </h2>
            <p style={{ color: "#666" }}>Em breve...</p>
          </div>

          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}>
            <h2 style={{ color: "#667eea", marginBottom: "1rem" }}>
              🎯 Objetivos
            </h2>
            <p style={{ color: "#666" }}>Em breve...</p>
          </div>

          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}>
            <h2 style={{ color: "#667eea", marginBottom: "1rem" }}>
              ⭐ Sonhos
            </h2>
            <p style={{ color: "#666" }}>Em breve...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
