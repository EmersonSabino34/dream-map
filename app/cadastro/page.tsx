"use client";

import { useState } from "react";
import Link from "next/link";
import "../auth.css";

export default function Cadastro() {
  const [lang, setLang] = useState<"pt" | "en" | "es">("pt");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const t = {
    pt: {
      title: "⭐ Comece sua jornada",
      subtitle: "Crie sua conta e transforme seus sonhos em realidade",
      month: "/mês",
      fullName: "Nome completo",
      fullNamePlaceholder: "Seu nome",
      email: "E-mail",
      emailPlaceholder: "seu@email.com",
      password: "Senha",
      passwordPlaceholder: "Mínimo 8 caracteres",
      confirmPassword: "Confirmar senha",
      confirmPasswordPlaceholder: "Digite a senha novamente",
      benefitsIncluded: "✓ Benefícios inclusos:",
      benefit1: "20 imagens inspiradoras",
      benefit2: "Upload ilimitado de fotos pessoais",
      benefit3: "Frases motivacionais e bíblicas diárias",
      benefit4: "Mapa personalizado dos seus sonhos",
      benefit5: "Acesso em todos os dispositivos",
      subscribe: "Assinar por €4,99/mês",
      haveAccount: "Já tem uma conta?",
      login: "Faça login",
    },
    en: {
      title: "⭐ Start your journey",
      subtitle: "Create your account and turn your dreams into reality",
      month: "/month",
      fullName: "Full name",
      fullNamePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      password: "Password",
      passwordPlaceholder: "Minimum 8 characters",
      confirmPassword: "Confirm password",
      confirmPasswordPlaceholder: "Enter password again",
      benefitsIncluded: "✓ Benefits included:",
      benefit1: "20 inspiring images",
      benefit2: "Unlimited personal photo uploads",
      benefit3: "Daily motivational and biblical quotes",
      benefit4: "Personalized dream map",
      benefit5: "Access on all devices",
      subscribe: "Subscribe for €4.99/month",
      haveAccount: "Already have an account?",
      login: "Sign in",
    },
    es: {
      title: "⭐ Comienza tu viaje",
      subtitle: "Crea tu cuenta y convierte tus sueños en realidad",
      month: "/mes",
      fullName: "Nombre completo",
      fullNamePlaceholder: "Tu nombre",
      email: "Correo electrónico",
      emailPlaceholder: "tu@email.com",
      password: "Contraseña",
      passwordPlaceholder: "Mínimo 8 caracteres",
      confirmPassword: "Confirmar contraseña",
      confirmPasswordPlaceholder: "Ingresa la contraseña nuevamente",
      benefitsIncluded: "✓ Beneficios incluidos:",
      benefit1: "20 imágenes inspiradoras",
      benefit2: "Carga ilimitada de fotos personales",
      benefit3: "Frases motivacionales y bíblicas diarias",
      benefit4: "Tablero personalizado de tus sueños",
      benefit5: "Acceso en todos los dispositivos",
      subscribe: "Suscribirse por €4,99/mes",
      haveAccount: "¿Ya tienes una cuenta?",
      login: "Iniciar sesión",
    }
  }[lang];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert(lang === "pt" ? "As senhas não coincidem!" : lang === "en" ? "Passwords do not match!" : "Las contraseñas no coinciden!");
      return;
    }
    console.log("Cadastro:", { nome, email, senha });
  };

  return (
    <div className="auth-container" style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="auth-card" style={{
        background: "white",
        borderRadius: "24px",
        boxShadow: "0 20px 40px rgba(167, 139, 250, 0.15)",
        maxWidth: "480px",
        width: "100%",
        padding: "2.5rem",
        margin: "1rem"
      }}>
        {/* Seletor de Idioma */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem", gap: "0.75rem" }}>
          {(["pt", "en", "es"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
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

        <div className="auth-header" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "bold", 
            background: "linear-gradient(135deg, #a78bfa, #93c5fd)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            {t.title}
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>{t.subtitle}</p>
        </div>

        <div className="pricing-badge" style={{
          background: "linear-gradient(135deg, #a78bfa, #c084fc)",
          color: "white",
          padding: "1rem",
          borderRadius: "16px",
          textAlign: "center",
          marginBottom: "2rem",
          fontWeight: "bold",
          fontSize: "1.5rem",
          boxShadow: "0 10px 20px rgba(167, 139, 250, 0.3)"
        }}>
          <span className="price">€4,99</span>
          <span className="period" style={{ fontSize: "1rem", opacity: 0.9 }}> {t.month}</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Campos de input com bordas suaves */}
          {[
            { label: t.fullName, placeholder: t.fullNamePlaceholder, value: nome, onChange: setNome, type: "text" as const },
            { label: t.email, placeholder: t.emailPlaceholder, value: email, onChange: setEmail, type: "email" as const },
            { label: t.password, placeholder: t.passwordPlaceholder, value: senha, onChange: setSenha, type: "password" as const },
            { label: t.confirmPassword, placeholder: t.confirmPasswordPlaceholder, value: confirmarSenha, onChange: setConfirmarSenha, type: "password" as const },
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
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#a78bfa"; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#e5e7eb"; }}
              />
            </div>
          ))}

          <div className="benefits" style={{ background: "#faf5ff", padding: "1.5rem", borderRadius: "16px", margin: "1.5rem 0" }}>
            <h3 style={{ color: "#7c3aed", marginBottom: "1rem" }}>{t.benefitsIncluded}</h3>
            <ul style={{ listStyle: "none", padding: 0, color: "#4c1d95" }}>
              {[t.benefit1, t.benefit2, t.benefit3, t.benefit4, t.benefit5].map((b, i) => (
                <li key={i} style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#a78bfa", fontSize: "1.5rem" }}>✓</span> {b}
                </li>
              ))}
            </ul>
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
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
          >
            {t.subscribe}
          </button>
        </form>

        <div className="auth-footer" style={{ textAlign: "center", marginTop: "2rem", color: "#6b7280" }}>
          <p>
            {t.haveAccount}{" "}
            <Link href="/login" style={{ color: "#a78bfa", fontWeight: "600", textDecoration: "underline" }}>
              {t.login}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}