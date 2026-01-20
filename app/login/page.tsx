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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login:", { email, senha });
  };

  return (
    <div className="auth-container" style={{ 
      background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)", 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      
      <div className="auth-card" style={{
        background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 50%, #f0f0f0 100%)",
        borderRadius: "24px",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.8)",
        maxWidth: "480px",
        width: "100%",
        padding: "2.5rem",
        margin: "1rem",
        border: "3px solid rgba(0, 0, 0, 0.1)",
        transform: "perspective(1000px)",
        animation: "cardFloat 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
      }}>
        {/* Seletor de Idioma */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem", gap: "0.75rem" }}>
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
              onMouseEnter={(e) => { 
                if (lang !== l) {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)"; 
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 5px 15px rgba(52, 152, 219, 0.2)";
                }
              }}
              onMouseLeave={(e) => { 
                if (lang !== l) {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; 
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }
              }}
            >
              {l === "pt" ? "🇧🇷 PT" : l === "en" ? "🇺🇸 EN" : "🇪🇸 ES"}
            </button>
          ))}
        </div>

        <div className="auth-header" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "bold", 
            background: "linear-gradient(135deg, #3498db, #2980b9)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent", 
            backgroundClip: "text",
            animation: "titleShine 3s ease-in-out infinite"
          }}>
            {t.welcome}
          </h1>
          <p style={{ color: "#34495e", fontSize: "1.125rem" }}>{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Campos de input */}
          {[  { label: t.email, placeholder: t.emailPlaceholder, value: email, onChange: setEmail, type: "email" as const },
            { label: t.password, placeholder: t.passwordPlaceholder, value: senha, onChange: setSenha, type: "password" as const },
          ].map((field, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: "600", color: "#2c3e50" }}>{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                required
                style={{
                  padding: "0.875rem 1rem",
                  borderRadius: "12px",
                  border: "2px solid rgba(44, 62, 80, 0.2)",
                  fontSize: "1rem",
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
                  color: "#2c3e50"
                }}
                onFocus={(e) => { 
                  (e.target as HTMLInputElement).style.borderColor = "#3498db"; 
                  (e.target as HTMLInputElement).style.boxShadow = "0 0 15px rgba(52, 152, 219, 0.4)";
                  (e.target as HTMLInputElement).style.transform = "scale(1.02)";
                }}
                onBlur={(e) => { 
                  (e.target as HTMLInputElement).style.borderColor = "rgba(44, 62, 80, 0.2)"; 
                  (e.target as HTMLInputElement).style.boxShadow = "inset 0 2px 4px rgba(0, 0, 0, 0.05)";
                  (e.target as HTMLInputElement).style.transform = "scale(1)";
                }}
              />
            </div>
          ))}

          <div style={{ textAlign: "right", marginBottom: "0.5rem" }}>
            <Link href="/recuperar-senha" style={{ color: "#3498db", fontSize: "0.925rem", textDecoration: "underline" }}>
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
              background: "linear-gradient(135deg, #3498db, #2980b9)",
              color: "white",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(52, 152, 219, 0.4), inset 0 -3px 0 rgba(0, 0, 0, 0.2)",
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => { 
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-5px) scale(1.02)"; 
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 15px 35px rgba(52, 152, 219, 0.5), inset 0 -3px 0 rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => { 
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)"; 
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 25px rgba(52, 152, 219, 0.4), inset 0 -3px 0 rgba(0, 0, 0, 0.2)";
            }}
          >
            {t.enter}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#34495e" }}>
          <p>
            {t.noAccount}{" "}
            <Link href="/cadastro" style={{ color: "#3498db", fontWeight: "600", textDecoration: "underline" }}>
              {t.signUpNow}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
