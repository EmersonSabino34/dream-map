"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [lang, setLang] = useState<"pt" | "en" | "es">("pt");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const t = {
    pt: {
      welcome: "⭐ Bem-vindo de volta!",
      subtitle: "Entre na sua conta para acessar seu Dream Map",
      email: "E-mail",
      emailPlaceholder: "seu@email.com",
      password: "Senha",
      passwordPlaceholder: "••••••••",
      forgotPassword: "Esqueceu a senha?",
      enter: "Entrar",
      noAccount: "Não tem uma conta?",
      signUpNow: "Cadastre-se agora",
    },
    en: {
      welcome: "⭐ Welcome back!",
      subtitle: "Sign in to your account to access your Dream Map",
      email: "Email",
      emailPlaceholder: "your@email.com",
      password: "Password",
      passwordPlaceholder: "••••••••",
      forgotPassword: "Forgot password?",
      enter: "Sign In",
      noAccount: "Don't have an account?",
      signUpNow: "Sign up now",
    },
    es: {
      welcome: "⭐ ¡Bienvenido de nuevo!",
      subtitle: "Inicia sesión en tu cuenta para acceder a tu Dream Map",
      email: "Correo electrónico",
      emailPlaceholder: "tu@email.com",
      password: "Contraseña",
      passwordPlaceholder: "••••••••",
      forgotPassword: "¿Olvidaste tu contraseña?",
      enter: "Entrar",
      noAccount: "¿No tienes una cuenta?",
      signUpNow: "Regístrate ahora",
    }
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, senha });
  };

  return (
    <div className="auth-container" style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%)", minHeight: "100vh" }}>
      <div className="auth-card" style={{
        background: "white",
        borderRadius: "24px",
        boxShadow: "0 20px 40px rgba(167, 139, 250, 0.15)",
        maxWidth: "480px",
        padding: "2.5rem",
        margin: "auto"
      }}>
        {/* Seletor de Idioma */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem", gap: "0.75rem" }}>
          {["pt", "en", "es"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l as any)}
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
        </div>

        <div className="auth-header" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", background: "linear-gradient(135deg, #a78bfa, #93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {t.welcome}
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Campos de input */}
          {[
            { label: t.email, placeholder: t.emailPlaceholder, value: email, onChange: setEmail, type: "email" },
            { label: t.password, placeholder: t.passwordPlaceholder, value: senha, onChange: setSenha, type: "password" },
          ].map((field, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: "600", color: "#374151" }}>{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                required
                style={{
                  padding: "0.875rem 1rem",
                  borderRadius: "12px",
                  border: "2px solid #e5e7eb",
                  fontSize: "1rem",
                  transition: "border 0.3s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#a78bfa"}
                onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
              />
            </div>
          ))}

          <div style={{ textAlign: "right", marginBottom: "0.5rem" }}>
            <Link href="/recuperar-senha" style={{ color: "#a78bfa", fontSize: "0.925rem", textDecoration: "underline" }}>
              {t.forgotPassword}
            </Link>
          </div>

          <button
            type="submit"
            style={{
              padding: "1rem",
              borderRadius: "16px",
              fontSize: "1.125rem",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #a78bfa, #c084fc)",
              color: "white",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(167, 139, 250, 0.3)",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            {t.enter}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#6b7280" }}>
          <p>
            {t.noAccount}{" "}
            <Link href="/cadastro" style={{ color: "#a78bfa", fontWeight: "600", textDecoration: "underline" }}>
              {t.signUpNow}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}