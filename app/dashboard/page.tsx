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
      background: "linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%)",
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
          background: "white",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 20px 40px rgba(167, 139, 250, 0.15)",
        }}>
          <div>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #a78bfa, #93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.5rem",
            }}>
              {t.welcome}
            </h1>
            <p style={{
              color: "#6b7280",
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
                  background: lang === l ? "linear-gradient(135deg, #a78bfa, #c084fc)" : "rgba(167, 139, 250, 0.1)",
                  border: `2px solid ${lang === l ? "#a78bfa" : "rgba(167, 139, 250, 0.3)"}`,
                  borderRadius: "12px",
                  color: lang === l ? "white" : "#374151",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  transition: "all 0.3s"
                }}
              >
                {l === "pt" ? "🇧🇷 PT" : l === "en" ? "🇺🇸 EN" : "🇪🇸 ES"}
              </button>
            ))}
            <button
              onClick={() => router.push("/")}
              style={{
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(135deg, #a78bfa, #c084fc)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
                boxShadow: "0 4px 12px rgba(167, 139, 250, 0.3)",
                transition: "all 0.3s",
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
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 20px 40px rgba(167, 139, 250, 0.15)",
          }}>
            <h2 style={{ 
              background: "linear-gradient(135deg, #a78bfa, #93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}>
              📊 Estatísticas
            </h2>
            <p style={{ color: "#6b7280" }}>Em breve...</p>
          </div>

          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 20px 40px rgba(167, 139, 250, 0.15)",
          }}>
            <h2 style={{ 
              background: "linear-gradient(135deg, #a78bfa, #93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}>
              🎯 Objetivos
            </h2>
            <p style={{ color: "#6b7280" }}>Em breve...</p>
          </div>

          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 20px 40px rgba(167, 139, 250, 0.15)",
          }}>
            <h2 style={{ 
              background: "linear-gradient(135deg, #a78bfa, #93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}>
              ⭐ Sonhos
            </h2>
            <p style={{ color: "#6b7280" }}>Em breve...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
