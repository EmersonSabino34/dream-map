"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../mural.css";
import AiImageGenerator from "../components/AiImageGenerator";

interface ProfileData {
  aboutMe: string;
  sex: string;
  religion: string;
  commemorativeDates: {
    birthday: boolean;
    anniversary: boolean;
    graduation: boolean;
    newJob: boolean;
    newHome: boolean;
    newCar: boolean;
    customDates: string[];
  };
}

type DateKey = Exclude<keyof ProfileData["commemorativeDates"], "customDates">;

export default function Perfil() {
  const [lang, setLang] = useState<"pt" | "en" | "es">("pt");
  const [profileData, setProfileData] = useState<ProfileData>({
    aboutMe: "",
    sex: "",
    religion: "",
    commemorativeDates: {
      birthday: false,
      anniversary: false,
      graduation: false,
      newJob: false,
      newHome: false,
      newCar: false,
      customDates: []
    }
  });
  
  const [customDate, setCustomDate] = useState("");
  const [muralImage, setMuralImage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const img = localStorage.getItem('mural_image');
      if (img) setMuralImage(img);
    } catch (e) {}
  }, []);

  
  const t = {
    pt: {
      title: "🎨 Crie Seu Mural dos Sonhos",
      subtitle: "Configure seu perfil e personalize suas metas",
      aboutMe: "Sobre Você",
      aboutMePlaceholder: "Conte um pouco sobre você, seus sonhos e objetivos...",
      sex: "Sexo",
      selectSex: "Selecione...",
      male: "Masculino",
      female: "Feminino",
      other: "Outro",
      religion: "Religião",
      selectReligion: "Selecione...",
      christianism: "Cristianismo",
      catholicism: "Catolicismo",
      spiritism: "Espiritismo",
      buddhism: "Budismo",
      otherReligion: "Outra",
      commemorativeDates: "Datas Comemorativas",
      birthday: "Aniversário",
      anniversary: "Aniversário de Casamento",
      graduation: "Formatura",
      newJob: "Novo Emprego",
      newHome: "Casa Nova",
      newCar: "Carro Novo",
      addCustomDate: "Adicionar Data Personalizada",
      customDatePlaceholder: "Ex: Viagem dos Sonhos, Conquista Pessoal...",
      addButton: "Adicionar",
      saveProfile: "Salvar Perfil",
      backToDashboard: "← Voltar ao Dashboard",
    },
    en: {
      title: "🎨 Create Your Dream Board",
      subtitle: "Set up your profile and customize your goals",
      aboutMe: "About You",
      aboutMePlaceholder: "Tell us about yourself, your dreams and goals...",
      sex: "Gender",
      selectSex: "Select...",
      male: "Male",
      female: "Female",
      other: "Other",
      religion: "Religion",
      selectReligion: "Select...",
      christianism: "Christianity",
      catholicism: "Catholicism",
      spiritism: "Spiritism",
      buddhism: "Buddhism",
      otherReligion: "Other",
      commemorativeDates: "Commemorative Dates",
      birthday: "Birthday",
      anniversary: "Wedding Anniversary",
      graduation: "Graduation",
      newJob: "New Job",
      newHome: "New Home",
      newCar: "New Car",
      addCustomDate: "Add Custom Date",
      customDatePlaceholder: "E.g: Dream Trip, Personal Achievement...",
      addButton: "Add",
      saveProfile: "Save Profile",
      backToDashboard: "← Back to Dashboard",
    },
    es: {
      title: "🎨 Crea Tu Tablero de Sueños",
      subtitle: "Configura tu perfil y personaliza tus metas",
      aboutMe: "Sobre Ti",
      aboutMePlaceholder: "Cuéntanos sobre ti, tus sueños y objetivos...",
      sex: "Sexo",
      selectSex: "Seleccionar...",
      male: "Masculino",
      female: "Femenino",
      other: "Otro",
      religion: "Religión",
      selectReligion: "Seleccionar...",
      christianism: "Cristianismo",
      catholicism: "Catolicismo",
      spiritism: "Espiritismo",
      buddhism: "Budismo",
      otherReligion: "Otra",
      commemorativeDates: "Fechas Conmemorativas",
      birthday: "Cumpleaños",
      anniversary: "Aniversario de Boda",
      graduation: "Graduación",
      newJob: "Nuevo Empleo",
      newHome: "Casa Nueva",
      newCar: "Coche Nuevo",
      addCustomDate: "Agregar Fecha Personalizada",
      customDatePlaceholder: "Ej: Viaje de Sueños, Logro Personal...",
      addButton: "Agregar",
      saveProfile: "Guardar Perfil",
      backToDashboard: "← Volver al Dashboard",
    }
  }[lang];

  const handleCheckboxChange = (key: keyof Omit<ProfileData["commemorativeDates"], "customDates">) => {
    setProfileData(prev => ({
      ...prev,
      commemorativeDates: {
        ...prev.commemorativeDates,
        [key]: !prev.commemorativeDates[key]
      }
    }));
  };

  // posição aleatória das opções fixas (criada uma vez por mount)
  const [datePositions] = useState<{
    key: DateKey;
    left: string;
    top: string;
  }[]>(() => {
    const keys = [
      "birthday",
      "anniversary",
      "graduation",
      "newJob",
      "newHome",
      "newCar",
    ] as const;

    // tenta gerar posições percentuais sem sobreposição
    const placed: { key: DateKey; left: number; top: number }[] = [];
    const minDist = 12; // distância mínima aproximada em percentuais
    const maxAttempts = 300;

    for (const k of keys) {
      let attempts = 0;
      let placedOk = false;
      while (attempts < maxAttempts && !placedOk) {
        attempts++;
        const left = Math.round(Math.random() * 72) + 3; // 3%..75%
        const top = Math.round(Math.random() * 60) + 5; // 5%..65%

        const ok = placed.every(p => {
          const dx = Math.abs(p.left - left);
          const dy = Math.abs(p.top - top);
          const dist = Math.sqrt(dx * dx + dy * dy);
          return dist >= minDist;
        });

        if (ok) {
          placed.push({ key: k as DateKey, left, top });
          placedOk = true;
        }
      }

      // fallback: se não conseguiu posicionar, coloca em sequência sem sobreposição
      if (!placedOk) {
        const fallbackLeft = 5 + placed.length * 12;
        const fallbackTop = 10 + (placed.length % 3) * 18;
        placed.push({ key: k as DateKey, left: Math.min(fallbackLeft, 80), top: Math.min(fallbackTop, 75) });
      }
    }

    return placed.map(p => ({ key: p.key, left: `${p.left}%`, top: `${p.top}%` }));
  });

  const handleAddCustomDate = () => {
    if (customDate.trim()) {
      setProfileData(prev => ({
        ...prev,
        commemorativeDates: {
          ...prev.commemorativeDates,
          customDates: [...prev.commemorativeDates.customDates, customDate.trim()]
        }
      }));
      setCustomDate("");
    }
  };

  const handleRemoveCustomDate = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      commemorativeDates: {
        ...prev.commemorativeDates,
        customDates: prev.commemorativeDates.customDates.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSave = () => {
    console.log("Profile Data:", profileData);
    alert(lang === "pt" ? "Perfil salvo com sucesso!" : lang === "en" ? "Profile saved successfully!" : "¡Perfil guardado exitosamente!");
  };

  return (
    <div className="mural-container" style={muralImage ? { backgroundImage: `url(${muralImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}>
      {/* Language Selector */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: "1200px", marginBottom: "2rem" }}>
        <Link href="/dashboard" style={{ 
          color: "#2c3e50", 
          fontSize: "1.125rem", 
          textDecoration: "none", 
          fontWeight: "600",
          padding: "0.75rem 1.5rem",
          background: "rgba(255, 255, 255, 0.3)",
          borderRadius: "12px",
          border: "2px solid rgba(44, 62, 80, 0.2)",
          transition: "all 0.3s ease"
        }}>
          {t.backToDashboard}
        </Link>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {(["pt", "en", "es"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              style={{
                padding: "0.5rem 1rem",
                background: lang === l ? "linear-gradient(135deg, #3498db, #2980b9)" : "rgba(255, 255, 255, 0.2)",
                border: `2px solid ${lang === l ? "#3498db" : "rgba(255, 255, 255, 0.3)"}`,
                borderRadius: "12px",
                color: lang === l ? "white" : "#2c3e50",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "600",
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: lang === l ? "0 5px 15px rgba(52, 152, 219, 0.3)" : "none"
              }}
            >
              {l === "pt" ? "🇧🇷 PT" : l === "en" ? "🇺🇸 EN" : "🇪🇸 ES"}
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ 
          fontSize: "3rem", 
          fontWeight: "bold", 
          color: "#2c3e50",
          marginBottom: "0.5rem",
          textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)"
        }}>
          {t.title}
        </h1>
        <p style={{ color: "#34495e", fontSize: "1.25rem" }}>{t.subtitle}</p>
      </div>

      {/* AI Image Generator */}
      <div style={{ width: '100%', maxWidth: 1200, marginBottom: '2rem' }}>
        <AiImageGenerator onApply={(url) => { setMuralImage(url); try { localStorage.setItem('mural_image', url); } catch (e) {} }} />
      </div>

      {/* Mural Grid */}
      <div className="mural-grid">
        {/* Sobre Você */}
        <div className="white-wood-board">
          <div className="white-wood-board-content">
            <h2 className="board-title">{t.aboutMe}</h2>
            <textarea
              className="board-textarea"
              placeholder={t.aboutMePlaceholder}
              value={profileData.aboutMe}
              onChange={(e) => setProfileData({ ...profileData, aboutMe: e.target.value })}
            />
          </div>
        </div>

        {/* Sexo */}
        <div className="white-wood-board">
          <div className="white-wood-board-content">
            <h2 className="board-title">{t.sex}</h2>
            <select
              className="board-select"
              value={profileData.sex}
              onChange={(e) => setProfileData({ ...profileData, sex: e.target.value })}
            >
              <option value="">{t.selectSex}</option>
              <option value="male">{t.male}</option>
              <option value="female">{t.female}</option>
              <option value="other">{t.other}</option>
            </select>
          </div>
        </div>

        {/* Religião */}
        <div className="white-wood-board">
          <div className="white-wood-board-content">
            <h2 className="board-title">{t.religion}</h2>
            <select
              className="board-select"
              value={profileData.religion}
              onChange={(e) => setProfileData({ ...profileData, religion: e.target.value })}
            >
              <option value="">{t.selectReligion}</option>
              <option value="christianism">{t.christianism}</option>
              <option value="catholicism">{t.catholicism}</option>
              <option value="spiritism">{t.spiritism}</option>
              <option value="buddhism">{t.buddhism}</option>
              <option value="other">{t.otherReligion}</option>
            </select>
          </div>
        </div>

        {/* Datas Comemorativas */}
        <div className="white-wood-board" style={{ gridColumn: "1 / -1" }}>
          <div className="white-wood-board-content">
            <h2 className="board-title">{t.commemorativeDates}</h2>
            <div className="board-options">
              <div className="dates-random-container">
                {datePositions.map(({ key, left, top }) => {
                  const label = key === "birthday" ? t.birthday
                    : key === "anniversary" ? t.anniversary
                    : key === "graduation" ? t.graduation
                    : key === "newJob" ? t.newJob
                    : key === "newHome" ? t.newHome
                    : t.newCar;

                  const isChecked = profileData.commemorativeDates[key];

                  return (
                    <div
                      key={key}
                      className={`date-tile ${isChecked ? 'checked' : ''}`}
                      style={{ left, top }}
                      onClick={() => handleCheckboxChange(key as any)}
                      title={label}
                    >
                      <div className="date-icon" aria-hidden>
                        {isChecked ? (
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false">
                            <path d="M20 6h-1V4a1 1 0 0 0-2 0v2H7V4a1 1 0 0 0-2 0v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zM9.5 13.5l2.5 2.5L18.5 9.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false">
                            <rect x="3" y="5" width="18" height="16" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth={1.4} />
                            <path d="M16 3v4M8 3v4M3 11h18" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                      <span className="date-label">{label}</span>
                      <input type="checkbox" checked={!!isChecked} readOnly />
                    </div>
                  );
                })}
              </div>

              {/* Custom Dates */}
              {profileData.commemorativeDates.customDates.map((date, index) => (
                <div key={index} className="board-checkbox" style={{ justifyContent: "space-between" }}>
                  <span className="board-checkbox-label">✓ {date}</span>
                  <button
                    onClick={() => handleRemoveCustomDate(index)}
                    style={{
                      background: "rgba(255, 0, 0, 0.7)",
                      border: "none",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.875rem"
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Add Custom Date */}
              <div style={{ marginTop: "1rem" }}>
                <label className="board-label">{t.addCustomDate}</label>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <input
                    type="text"
                    className="board-input"
                    placeholder={t.customDatePlaceholder}
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddCustomDate()}
                  />
                  <button
                    onClick={handleAddCustomDate}
                    style={{
                      background: "linear-gradient(135deg, #4caf50, #66bb6a)",
                      border: "none",
                      color: "white",
                      padding: "0.875rem 1.5rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {t.addButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button onClick={handleSave} className="save-button">
        {t.saveProfile}
      </button>
    </div>
  );
}
