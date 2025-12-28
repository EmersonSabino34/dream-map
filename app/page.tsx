"use client";

import { useEffect, useState } from "react";
import { translations, Language } from "./translations";

type Imagem = {
  src: string;
  tema: string;
  deGaleria?: boolean;
};

const imagensInternet: Imagem[] = [
  // Carros dos sonhos
  { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400", tema: "carro" },
  { src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400", tema: "carro" },
  
  // Casas dos sonhos
  { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400", tema: "casa" },
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400", tema: "casa" },
  
  // Lugares/Países/Cidades
  { src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400", tema: "viagem" },
  { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400", tema: "viagem" },
  { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400", tema: "viagem" },
  
  // Família reunida
  { src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400", tema: "família" },
  { src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400", tema: "família" },
  
  // Condição física/corpo
  { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400", tema: "fitness" },
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400", tema: "fitness" },
  
  // Dinheiro/riqueza
  { src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400", tema: "dinheiro" },
  { src: "https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=400", tema: "dinheiro" },
  
  // Realização profissional
  { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400", tema: "carreira" },
  { src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400", tema: "carreira" },
  
  // Espiritualidade (genérica - será personalizada por religião)
  { src: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400", tema: "espiritualidade" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", tema: "espiritualidade" },
  
  // Estudo
  { src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400", tema: "estudo" },
  { src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", tema: "estudo" },
  
  // Esportes
  { src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400", tema: "esporte" },
  { src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400", tema: "esporte" },
  
  // Extras
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", tema: "natureza" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400", tema: "liberdade" },
];

const imagensEspirituaisPorReligiao: Record<string, Imagem[]> = {
  Católica: [
    { src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400", tema: "espiritualidade" },
    { src: "https://images.unsplash.com/photo-1465433045946-ba6506ce4ce3?w=400", tema: "espiritualidade" },
  ],
  Evangélica: [
    { src: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400", tema: "espiritualidade" },
    { src: "https://images.unsplash.com/photo-1519909570256-ce580a4383bb?w=400", tema: "espiritualidade" },
  ],
  Espírita: [
    { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", tema: "espiritualidade" },
    { src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400", tema: "espiritualidade" },
  ],
  "Umbanda/Candomblé": [
    { src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400", tema: "espiritualidade" },
    { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", tema: "espiritualidade" },
  ],
  Budismo: [
    { src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400", tema: "espiritualidade" },
    { src: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=400", tema: "espiritualidade" },
  ],
  Judaísmo: [
    { src: "https://images.unsplash.com/photo-1509740212028-c0c9bce5476f?w=400", tema: "espiritualidade" },
    { src: "https://images.unsplash.com/photo-1590619003604-b7d1fd8f8e0f?w=400", tema: "espiritualidade" },
  ],
  Islamismo: [
    { src: "https://images.unsplash.com/photo-1564769610726-5a4d3c0f7e09?w=400", tema: "espiritualidade" },
    { src: "https://images.unsplash.com/photo-1591604021695-0c52fcbcf350?w=400", tema: "espiritualidade" },
  ],
};

// Frases motivacionais/bíblicas/filosóficas como imagens
const frasesImagensMotivacionais: Imagem[] = [
  { src: "data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='400' fill='%23d4af37'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='white' font-weight='bold' font-family='Georgia'%3E%3Ctspan x='50%25' dy='-40'%3E%22A fé move%3C/tspan%3E%3Ctspan x='50%25' dy='40'%3Emontanhas%22%3C/tspan%3E%3Ctspan x='50%25' dy='50' font-size='20'%3EMateus 17:20%3C/tspan%3E%3C/text%3E%3C/svg%3E", tema: "frase" },
  { src: "data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='400' fill='%232c3e50'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='28' fill='%23d4af37' font-weight='bold' font-family='Georgia'%3E%3Ctspan x='50%25' dy='-30'%3EO futuro pertence%3C/tspan%3E%3Ctspan x='50%25' dy='35'%3Eàqueles que acreditam%3C/tspan%3E%3Ctspan x='50%25' dy='35'%3Eem seus sonhos%3C/tspan%3E%3Ctspan x='50%25' dy='50' font-size='18' fill='white'%3EEleanor Roosevelt%3C/tspan%3E%3C/text%3E%3C/svg%3E", tema: "frase" },
  { src: "data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='400' fill='%23f5f0e8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='30' fill='%232c3e50' font-weight='bold' font-family='Georgia'%3E%3Ctspan x='50%25' dy='-25'%3E%22Tudo posso%3C/tspan%3E%3Ctspan x='50%25' dy='38'%3Enaquele que%3C/tspan%3E%3Ctspan x='50%25' dy='38'%3Eme fortalece%22%3C/tspan%3E%3Ctspan x='50%25' dy='50' font-size='20' fill='%23d4af37'%3EFilipenses 4:13%3C/tspan%3E%3C/text%3E%3C/svg%3E", tema: "frase" },
  { src: "data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='400' fill='%23d4af37'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='32' fill='white' font-weight='bold' font-family='Georgia'%3E%3Ctspan x='50%25' dy='-30'%3EA persistência%3C/tspan%3E%3Ctspan x='50%25' dy='40'%3Eé o caminho%3C/tspan%3E%3Ctspan x='50%25' dy='40'%3Edo êxito%3C/tspan%3E%3Ctspan x='50%25' dy='55' font-size='20' fill='%23f5f0e8'%3ECharles Chaplin%3C/tspan%3E%3C/text%3E%3C/svg%3E", tema: "frase" },
  { src: "data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='400' fill='%232c3e50'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='30' fill='white' font-weight='bold' font-family='Georgia'%3E%3Ctspan x='50%25' dy='-40'%3EConstrua seus%3C/tspan%3E%3Ctspan x='50%25' dy='38'%3Esonhos, ou alguém%3C/tspan%3E%3Ctspan x='50%25' dy='38'%3Ete contratará para%3C/tspan%3E%3Ctspan x='50%25' dy='38'%3Econstruir os deles%3C/tspan%3E%3Ctspan x='50%25' dy='55' font-size='18' fill='%23d4af37'%3ETony Gaskins%3C/tspan%3E%3C/text%3E%3C/svg%3E", tema: "frase" },
];

export default function Home() {
  const [lang, setLang] = useState<Language>("pt");
  const [imagens, setImagens] = useState<Imagem[]>(imagensInternet);
  const [destaque, setDestaque] = useState<Imagem>(imagensInternet[0]);
  const [usarGaleria, setUsarGaleria] = useState(false);
  const [fraseIndex, setFraseIndex] = useState(0);
  const [religiao, setReligiao] = useState("");
  const [incluirFrases, setIncluirFrases] = useState(false);
  const [muralSelecionado, setMuralSelecionado] = useState<number | null>(null);
  const [mostrarModalDownload, setMostrarModalDownload] = useState(false);
  const [dataComemorativa, setDataComemorativa] = useState("");

  const t = translations[lang];

  // Combinar imagens com frases motivacionais se opção estiver ativa
  const imagensFinais = incluirFrases ? [...imagens, ...frasesImagensMotivacionais] : imagens;

  useEffect(() => {
    const dia = new Date().getDate();
    const index = dia % imagens.length;
    setDestaque(imagens[index]);
  }, [imagens]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFraseIndex((prev) => {
        const totalFrases = t.frases[destaque.tema as keyof typeof t.frases]?.length || 1;
        return (prev + 1) % totalFrases;
      });
    }, 5000);
    return () => clearInterval(intervalo);
  }, [destaque, t]);

  // Adiciona imagens espirituais personalizadas quando religião é selecionada
  useEffect(() => {
    if (religiao && imagensEspirituaisPorReligiao[religiao]) {
      const imagensBase = imagensInternet.filter(img => img.tema !== "espiritualidade");
      const imagensReligiosas = imagensEspirituaisPorReligiao[religiao];
      setImagens([...imagensBase, ...imagensReligiosas]);
    }
  }, [religiao]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const novasImagens: Imagem[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          novasImagens.push({
            src: event.target.result as string,
            tema: "pessoal",
            deGaleria: true,
          });
          if (novasImagens.length === files.length) {
            setImagens((prev) => [...prev, ...novasImagens]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSelecionarMural = (numeroMural: number) => {
    setMuralSelecionado(numeroMural);
    setMostrarModalDownload(true);
  };

  const handleDownloadPapelParede = async (resolucao: string) => {
    if (muralSelecionado === null) return;
    const muralElement = document.getElementById(`mural-${muralSelecionado}`);
    if (!muralElement) return;

    // Em produção, usar html2canvas ou similar para capturar o mural
    alert(`Download de Mural ${muralSelecionado} como papel de parede (${resolucao}) será implementado com html2canvas`);
    setMostrarModalDownload(false);
  };

  const handleDownloadImpressao = async (tamanho: string) => {
    if (muralSelecionado === null) return;
    const muralElement = document.getElementById(`mural-${muralSelecionado}`);
    if (!muralElement) return;

    // Em produção, usar html2canvas ou similar para capturar o mural
    alert(`Download de Mural ${muralSelecionado} para impressão (${tamanho}) será implementado com html2canvas`);
    setMostrarModalDownload(false);
  };

  const handleCompartilharRedeSocial = (rede: string) => {
    if (muralSelecionado === null) return;
    
    const textoCompartilhar = dataComemorativa 
      ? `${t[dataComemorativa as keyof typeof t]} - Meu Dream Map dos Sonhos! 🌟`
      : "Meu Dream Map dos Sonhos! 🌟";
    
    const url = window.location.href;
    
    switch(rede) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(textoCompartilhar + ' ' + url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(textoCompartilhar)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'pinterest':
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(textoCompartilhar)}`, '_blank');
        break;
    }
  };

  return (
    <div className="container">
      <div className="card">
        {/* Seletor de Idioma */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem", gap: "0.5rem" }}>
          <button 
            onClick={() => setLang("pt")}
            style={{
              padding: "0.5rem 1rem",
              background: lang === "pt" ? "linear-gradient(135deg, #d4af37, #c9a961)" : "rgba(212, 175, 55, 0.1)",
              border: lang === "pt" ? "2px solid #d4af37" : "2px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "8px",
              color: lang === "pt" ? "white" : "#2c2c2c",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
          >
            🇧🇷 PT
          </button>
          <button 
            onClick={() => setLang("en")}
            style={{
              padding: "0.5rem 1rem",
              background: lang === "en" ? "linear-gradient(135deg, #d4af37, #c9a961)" : "rgba(212, 175, 55, 0.1)",
              border: lang === "en" ? "2px solid #d4af37" : "2px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "8px",
              color: lang === "en" ? "white" : "#2c2c2c",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
          >
            🇺🇸 EN
          </button>
          <button 
            onClick={() => setLang("es")}
            style={{
              padding: "0.5rem 1rem",
              background: lang === "es" ? "linear-gradient(135deg, #d4af37, #c9a961)" : "rgba(212, 175, 55, 0.1)",
              border: lang === "es" ? "2px solid #d4af37" : "2px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "8px",
              color: lang === "es" ? "white" : "#2c2c2c",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
          >
            🇪🇸 ES
          </button>
        </div>

        <h1 style={{ color: "#2c2c2c", textShadow: "2px 2px 4px rgba(212, 175, 55, 0.3)" }}>{t.title}</h1>
        <p style={{ 
          textAlign: "center", 
          fontSize: "1.1rem", 
          color: "#2c2c2c", 
          marginTop: "-1rem", 
          marginBottom: "2rem",
          fontStyle: "italic",
          opacity: 0.9
        }}>
          {t.slogan}
        </p>

        {/* Opção para incluir frases motivacionais */}
        <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "rgba(212, 175, 55, 0.1)", borderRadius: "12px", border: "2px solid rgba(212, 175, 55, 0.3)" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.8rem", cursor: "pointer", color: "#2c2c2c", fontWeight: "600" }}>
            <input 
              type="checkbox" 
              checked={incluirFrases}
              onChange={(e) => setIncluirFrases(e.target.checked)}
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
            />
            <span>{lang === "pt" ? "Incluir frases motivacionais/bíblicas nos murais" : lang === "en" ? "Include motivational/biblical quotes in murals" : "Incluir frases motivacionales/bíblicas en murales"}</span>
          </label>
        </div>

        {/* ENQUETE */}
        <section style={{ background: "rgba(255, 255, 255, 0.7)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(212, 175, 55, 0.3)" }}>
          <h2 style={{ color: "#2c2c2c" }}>{t.aboutYou}</h2>
          <select style={{ color: "#2c2c2c", background: "white", border: "2px solid rgba(212, 175, 55, 0.3)", padding: "0.8rem", borderRadius: "8px", width: "100%", marginBottom: "1rem" }}>
            <option>{t.sex}</option>
            <option>{t.female}</option>
            <option>{t.male}</option>
            <option>{t.preferNotToSay}</option>
          </select>
          <input placeholder={t.profession} style={{ color: "#2c2c2c", background: "white", border: "2px solid rgba(212, 175, 55, 0.3)", padding: "0.8rem", borderRadius: "8px", width: "100%", marginBottom: "1rem" }} />
          <select value={religiao} onChange={(e) => setReligiao(e.target.value)} style={{ color: "#2c2c2c", background: "white", border: "2px solid rgba(212, 175, 55, 0.3)", padding: "0.8rem", borderRadius: "8px", width: "100%", marginBottom: "1rem" }}>
            <option value="">{t.religion}</option>
            <option value="Católica">{t.catholic}</option>
            <option value="Evangélica">{t.evangelical}</option>
            <option value="Espírita">{t.spiritist}</option>
            <option value="Umbanda/Candomblé">{t.umbanda}</option>
            <option value="Budismo">{t.buddhism}</option>
            <option value="Judaísmo">{t.judaism}</option>
            <option value="Islamismo">{t.islam}</option>
            <option value="Agnóstico">{t.agnostic}</option>
            <option value="Ateu">{t.atheist}</option>
            <option value="Outra">{t.other}</option>
            <option value="Prefiro não informar">{t.preferNotToSay}</option>
          </select>
          {religiao && religiao !== "Prefiro não informar" && religiao !== "Agnóstico" && religiao !== "Ateu" && religiao !== "Outra" && (
            <p style={{ fontSize: "0.9rem", color: "#2c2c2c", marginTop: "0.5rem", background: "rgba(212, 175, 55, 0.15)", padding: "0.5rem", borderRadius: "6px" }}>
              ✨ {t.customizedImages} {religiao}
            </p>
          )}
          <input placeholder={t.biggestDream} style={{ color: "#2c2c2c", background: "white", border: "2px solid rgba(212, 175, 55, 0.3)", padding: "0.8rem", borderRadius: "8px", width: "100%", marginTop: "1rem" }} />
          
          {/* Seletor de Data Comemorativa */}
          <div style={{ marginTop: "1.5rem" }}>
            <label style={{ display: "block", color: "#2c2c2c", fontWeight: "600", marginBottom: "0.5rem" }}>
              🎉 {t.specialDates}
            </label>
            <select 
              value={dataComemorativa} 
              onChange={(e) => setDataComemorativa(e.target.value)}
              style={{ color: "#2c2c2c", background: "white", border: "2px solid rgba(212, 175, 55, 0.3)", padding: "0.8rem", borderRadius: "8px", width: "100%" }}
            >
              <option value="">{t.selectDate}</option>
              <option value="mothersDay">❤️ {t.mothersDay}</option>
              <option value="fathersDay">👔 {t.fathersDay}</option>
              <option value="valentinesDay">💕 {t.valentinesDay}</option>
              <option value="christmas">🎄 {t.christmas}</option>
              <option value="newYear">🎊 {t.newYear}</option>
              <option value="birthday">🎂 {t.birthday}</option>
              <option value="graduation">🎓 {t.graduation}</option>
              <option value="wedding">💍 {t.wedding}</option>
              <option value="friendshipDay">🤝 {t.friendshipDay}</option>
              <option value="thanksgiving">🦃 {t.thanksgiving}</option>
              <option value="easter">🐰 {t.easter}</option>
            </select>
            {dataComemorativa && (
              <p style={{ fontSize: "0.85rem", color: "#2c2c2c", marginTop: "0.5rem", opacity: 0.8 }}>
                ✨ {lang === 'pt' ? 'Seus murais serão personalizados para esta data especial!' : lang === 'en' ? 'Your murals will be customized for this special date!' : '¡Tus murales serán personalizados para esta fecha especial!'}
              </p>
            )}
          </div>
        </section>

        {/* OPÇÃO DE GALERIA */}
        <section style={{ background: "rgba(255, 255, 255, 0.7)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(212, 175, 55, 0.3)" }}>
          <h2 style={{ color: "#2c2c2c" }}>{t.imageChoice}</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.8rem", cursor: "pointer", color: "#2c2c2c", fontWeight: "600" }}>
              <input
                type="checkbox"
                checked={usarGaleria}
                onChange={(e) => setUsarGaleria(e.target.checked)}
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              {t.useGallery}
            </label>
          </div>
          
          {usarGaleria && (
            <div style={{ marginTop: "1rem" }}>
              <label style={{ 
                display: "inline-block",
                padding: "0.5rem 1rem",
                backgroundColor: "#d4af37",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                {t.addPhotos}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
              <p style={{ fontSize: "0.875rem", marginTop: "0.5rem", opacity: 0.8 }}>
                {t.addPhotosDescription}
              </p>
            </div>
          )}
        </section>

        {/* MURAIS DE SONHOS - 5 murais diferentes com 15 fotos cada */}
        
        {/* MURAL 1: Grid Uniforme 5x3 */}
        <section style={{ background: "rgba(255, 255, 255, 0.5)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(212, 175, 55, 0.3)", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
            <h2 style={{ color: "#2c2c2c", margin: 0 }}>🖼️ {lang === 'pt' ? 'Mural 1 - Visão Clássica' : lang === 'en' ? 'Vision Board 1 - Classic View' : 'Mural 1 - Visión Clásica'}</h2>
            <button
              onClick={() => handleSelecionarMural(1)}
              style={{
                padding: "0.6rem 1.5rem",
                background: "linear-gradient(135deg, #d4af37, #c9a961)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.9rem",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              📥 {lang === 'pt' ? 'Selecionar Este Mural' : lang === 'en' ? 'Select This Mural' : 'Seleccionar Este Mural'}
            </button>
          </div>
          <div id="mural-1" style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(5, 1fr)", 
            gridTemplateRows: "repeat(3, 220px)",
            gap: "0.3rem",
            background: "#f5f0e8",
            padding: "0.3rem",
            borderRadius: "8px"
          }}>
            {imagensFinais.slice(0, 15).map((img, i) => (
              <div 
                key={i} 
                style={{ 
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  border: destaque.src === img.src ? "4px solid #d4af37" : "none",
                  boxShadow: destaque.src === img.src ? "0 0 20px rgba(212, 175, 55, 0.6)" : "none"
                }} 
                onClick={() => setDestaque(img)}
              >
                {img.src.startsWith('data:image/svg') ? (
                  <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(img.src.split(',')[1]) }} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} />
                ) : (
                  <img 
                    src={img.src} 
                    alt={img.tema}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block"
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* MURAL 2: Grid Assimétrico Compacto */}
        <section style={{ background: "rgba(255, 255, 255, 0.5)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(212, 175, 55, 0.3)", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
            <h2 style={{ color: "#2c2c2c", margin: 0 }}>🎨 {lang === 'pt' ? 'Mural 2 - Mosaico Criativo' : lang === 'en' ? 'Vision Board 2 - Creative Mosaic' : 'Mural 2 - Mosaico Creativo'}</h2>
            <button
              onClick={() => handleSelecionarMural(2)}
              style={{
                padding: "0.6rem 1.5rem",
                background: "linear-gradient(135deg, #d4af37, #c9a961)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.9rem",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              📥 {lang === 'pt' ? 'Selecionar Este Mural' : lang === 'en' ? 'Select This Mural' : 'Seleccionar Este Mural'}
            </button>
          </div>
          <div id="mural-2" style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(8, 1fr)",
            gridTemplateRows: "repeat(4, 180px)",
            gap: "0.3rem",
            background: "#f9f6f0",
            padding: "0.3rem",
            borderRadius: "8px"
          }}>
            {imagensFinais.slice(0, 15).map((img, i) => {
              const layouts = [
                { gridColumn: "span 3", gridRow: "span 2" }, // 0: grande esquerda
                { gridColumn: "span 2", gridRow: "span 1" }, // 1: médio
                { gridColumn: "span 3", gridRow: "span 1" }, // 2: horizontal
                { gridColumn: "span 2", gridRow: "span 2" }, // 3: vertical direita
                { gridColumn: "span 2", gridRow: "span 1" }, // 4: médio
                { gridColumn: "span 3", gridRow: "span 2" }, // 5: grande
                { gridColumn: "span 3", gridRow: "span 1" }, // 6: horizontal
                { gridColumn: "span 2", gridRow: "span 1" }, // 7: médio
                { gridColumn: "span 2", gridRow: "span 2" }, // 8: vertical
                { gridColumn: "span 3", gridRow: "span 1" }, // 9: horizontal
                { gridColumn: "span 3", gridRow: "span 1" }, // 10: horizontal
                { gridColumn: "span 3", gridRow: "span 2" }, // 11: grande
                { gridColumn: "span 2", gridRow: "span 1" }, // 12: médio
                { gridColumn: "span 3", gridRow: "span 1" }, // 13: horizontal
                { gridColumn: "span 2", gridRow: "span 2" }  // 14: vertical
              ];
              return (
                <div 
                  key={i} 
                  style={{ 
                    ...layouts[i],
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                    border: destaque.src === img.src ? "4px solid #d4af37" : "none",
                    boxShadow: destaque.src === img.src ? "0 0 20px rgba(212, 175, 55, 0.6)" : "none"
                  }} 
                  onClick={() => setDestaque(img)}
                >
                  {img.src.startsWith('data:image/svg') ? (
                    <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(img.src.split(',')[1]) }} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} />
                  ) : (
                    <img 
                      src={img.src} 
                      alt={img.tema}
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block"
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* MURAL 3: Grid 3 Colunas Vertical */}
        <section style={{ background: "rgba(255, 255, 255, 0.5)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(212, 175, 55, 0.3)", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
            <h2 style={{ color: "#2c2c2c", margin: 0 }}>📸 {lang === 'pt' ? 'Mural 3 - Painel Vertical' : lang === 'en' ? 'Vision Board 3 - Vertical Panel' : 'Mural 3 - Panel Vertical'}</h2>
            <button
              onClick={() => handleSelecionarMural(3)}
              style={{
                padding: "0.6rem 1.5rem",
                background: "linear-gradient(135deg, #d4af37, #c9a961)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.9rem",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              📥 {lang === 'pt' ? 'Selecionar Este Mural' : lang === 'en' ? 'Select This Mural' : 'Seleccionar Este Mural'}
            </button>
          </div>
          <div id="mural-3" style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(5, 200px)",
            gap: "0.3rem",
            background: "#fefdfb",
            padding: "0.3rem",
            borderRadius: "8px"
          }}>
            {imagensFinais.slice(0, 15).map((img, i) => (
              <div 
                key={i} 
                style={{ 
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  border: destaque.src === img.src ? "4px solid #d4af37" : "none",
                  boxShadow: destaque.src === img.src ? "0 0 20px rgba(212, 175, 55, 0.6)" : "none"
                }} 
                onClick={() => setDestaque(img)}
              >
                {img.src.startsWith('data:image/svg') ? (
                  <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(img.src.split(',')[1]) }} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} />
                ) : (
                  <img 
                    src={img.src} 
                    alt={img.tema}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block"
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* MURAL 4: Grid Magazine Style */}
        <section style={{ background: "rgba(255, 255, 255, 0.5)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(212, 175, 55, 0.3)", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
            <h2 style={{ color: "#2c2c2c", margin: 0 }}>🏛️ {lang === 'pt' ? 'Mural 4 - Estilo Revista' : lang === 'en' ? 'Vision Board 4 - Magazine Style' : 'Mural 4 - Estilo Revista'}</h2>
            <button
              onClick={() => handleSelecionarMural(4)}
              style={{
                padding: "0.6rem 1.5rem",
                background: "linear-gradient(135deg, #d4af37, #c9a961)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.9rem",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              📥 {lang === 'pt' ? 'Selecionar Este Mural' : lang === 'en' ? 'Select This Mural' : 'Seleccionar Este Mural'}
            </button>
          </div>
          <div id="mural-4" style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "repeat(5, 160px)",
            gap: "0.3rem",
            background: "#f8f6f0",
            padding: "0.3rem",
            borderRadius: "8px"
          }}>
            {imagensFinais.slice(0, 15).map((img, i) => {
              const layouts = [
                { gridColumn: "span 2", gridRow: "span 2" }, // 0: quadrado grande
                { gridColumn: "span 2", gridRow: "span 3" }, // 1: vertical grande
                { gridColumn: "span 2", gridRow: "span 2" }, // 2: quadrado grande
                { gridColumn: "span 2", gridRow: "span 1" }, // 3: horizontal
                { gridColumn: "span 2", gridRow: "span 2" }, // 4: quadrado médio
                { gridColumn: "span 2", gridRow: "span 2" }, // 5: quadrado médio
                { gridColumn: "span 2", gridRow: "span 1" }, // 6: horizontal
                { gridColumn: "span 2", gridRow: "span 1" }, // 7: horizontal
                { gridColumn: "span 2", gridRow: "span 2" }, // 8: quadrado médio
                { gridColumn: "span 2", gridRow: "span 1" }, // 9: horizontal
                { gridColumn: "span 2", gridRow: "span 1" }, // 10: horizontal
                { gridColumn: "span 2", gridRow: "span 2" }, // 11: quadrado médio
                { gridColumn: "span 2", gridRow: "span 1" }, // 12: horizontal
                { gridColumn: "span 2", gridRow: "span 1" }, // 13: horizontal
                { gridColumn: "span 2", gridRow: "span 1" }  // 14: horizontal
              ];
              return (
                <div 
                  key={i} 
                  style={{ 
                    ...layouts[i],
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                    border: destaque.src === img.src ? "4px solid #d4af37" : "none",
                    boxShadow: destaque.src === img.src ? "0 0 20px rgba(212, 175, 55, 0.6)" : "none"
                  }} 
                  onClick={() => setDestaque(img)}
                >
                  {img.src.startsWith('data:image/svg') ? (
                    <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(img.src.split(',')[1]) }} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} />
                  ) : (
                    <img 
                      src={img.src} 
                      alt={img.tema}
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block"
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* MURAL 5: Grid Compacto Horizontal */}
        <section style={{ background: "rgba(255, 255, 255, 0.5)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(212, 175, 55, 0.3)", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
            <h2 style={{ color: "#2c2c2c", margin: 0 }}>🌅 {lang === 'pt' ? 'Mural 5 - Panorama Completo' : lang === 'en' ? 'Vision Board 5 - Full Panorama' : 'Mural 5 - Panorama Completo'}</h2>
            <button
              onClick={() => handleSelecionarMural(5)}
              style={{
                padding: "0.6rem 1.5rem",
                background: "linear-gradient(135deg, #d4af37, #c9a961)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.9rem",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              📥 {lang === 'pt' ? 'Selecionar Este Mural' : lang === 'en' ? 'Select This Mural' : 'Seleccionar Este Mural'}
            </button>
          </div>
          <div id="mural-5" style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(3, 240px)",
            gap: "0.3rem",
            background: "#f5f2ea",
            padding: "0.3rem",
            borderRadius: "8px"
          }}>
            {imagensFinais.slice(0, 15).map((img, i) => (
              <div 
                key={i} 
                style={{ 
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  border: destaque.src === img.src ? "4px solid #d4af37" : "none",
                  boxShadow: destaque.src === img.src ? "0 0 20px rgba(212, 175, 55, 0.6)" : "none"
                }} 
                onClick={() => setDestaque(img)}
              >
                {img.src.startsWith('data:image/svg') ? (
                  <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(img.src.split(',')[1]) }} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} />
                ) : (
                  <img 
                    src={img.src} 
                    alt={img.tema}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block"
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* DESTAQUE */}
        <section className="highlight">
          <h2>{t.highlightOfDay}</h2>
          <img src={destaque.src} alt={destaque.tema} />
          <p className="quote">
            {t.frases[destaque.tema as keyof typeof t.frases]?.[fraseIndex] || "✨"}
          </p>
          <div className="quote-dots">
            {t.frases[destaque.tema as keyof typeof t.frases]?.map((_, i) => (
              <span key={i} className={i === fraseIndex ? "active" : ""} />
            ))}
          </div>
        </section>

        {/* MODAL DE DOWNLOAD */}
        {mostrarModalDownload && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "1rem"
          }}
          onClick={() => setMostrarModalDownload(false)}
          >
            <div style={{
              background: "linear-gradient(135deg, #fefdfb, #f5f0e8)",
              padding: "2rem",
              borderRadius: "16px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
              border: "2px solid #d4af37"
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2 style={{ margin: 0, color: "#2c2c2c", fontSize: "1.5rem" }}>
                  {lang === 'pt' ? `📥 Baixar Mural ${muralSelecionado}` : lang === 'en' ? `📥 Download Mural ${muralSelecionado}` : `📥 Descargar Mural ${muralSelecionado}`}
                </h2>
                <button
                  onClick={() => setMostrarModalDownload(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    color: "#2c2c2c"
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ color: "#2c2c2c", marginBottom: "1rem", fontSize: "1.2rem" }}>
                  📱 {lang === 'pt' ? 'Papel de Parede' : lang === 'en' ? 'Wallpaper' : 'Fondo de Pantalla'}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.8rem" }}>
                  {[
                    { label: "iPhone (1170x2532)", value: "iphone" },
                    { label: "Android HD (1080x1920)", value: "android-hd" },
                    { label: "Android FHD (1440x2560)", value: "android-fhd" },
                    { label: "Tablet (1536x2048)", value: "tablet" }
                  ].map(resolucao => (
                    <button
                      key={resolucao.value}
                      onClick={() => handleDownloadPapelParede(resolucao.label)}
                      style={{
                        padding: "0.8rem",
                        background: "white",
                        border: "2px solid #d4af37",
                        borderRadius: "8px",
                        color: "#2c2c2c",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        transition: "all 0.3s ease",
                        textAlign: "center"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "linear-gradient(135deg, #d4af37, #c9a961)";
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "white";
                        e.currentTarget.style.color = "#2c2c2c";
                      }}
                    >
                      {resolucao.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ color: "#2c2c2c", marginBottom: "1rem", fontSize: "1.2rem" }}>
                  🖨️ {lang === 'pt' ? 'Impressão' : lang === 'en' ? 'Print' : 'Impresión'}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.8rem" }}>
                  {[
                    { label: "A4 (210x297mm)", value: "a4" },
                    { label: "A3 (297x420mm)", value: "a3" },
                    { label: "Carta (216x279mm)", value: "carta" },
                    { label: "Pôster (450x600mm)", value: "poster" }
                  ].map(tamanho => (
                    <button
                      key={tamanho.value}
                      onClick={() => handleDownloadImpressao(tamanho.label)}
                      style={{
                        padding: "0.8rem",
                        background: "white",
                        border: "2px solid #d4af37",
                        borderRadius: "8px",
                        color: "#2c2c2c",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        transition: "all 0.3s ease",
                        textAlign: "center"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "linear-gradient(135deg, #d4af37, #c9a961)";
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "white";
                        e.currentTarget.style.color = "#2c2c2c";
                      }}
                    >
                      {tamanho.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compartilhamento em Redes Sociais */}
              <div style={{ marginBottom: "2rem", paddingTop: "1.5rem", borderTop: "2px dashed rgba(212, 175, 55, 0.3)" }}>
                <h3 style={{ color: "#2c2c2c", marginBottom: "1rem", fontSize: "1.2rem" }}>
                  🌐 {t.shareOnSocial}
                </h3>
                {dataComemorativa && (
                  <p style={{ fontSize: "0.9rem", color: "#2c2c2c", marginBottom: "1rem", background: "rgba(212, 175, 55, 0.1)", padding: "0.8rem", borderRadius: "8px" }}>
                    🎉 {lang === 'pt' ? `Compartilhar para ${t[dataComemorativa as keyof typeof t]}` : lang === 'en' ? `Share for ${t[dataComemorativa as keyof typeof t]}` : `Compartir para ${t[dataComemorativa as keyof typeof t]}`}
                  </p>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.8rem" }}>
                  <button
                    onClick={() => handleCompartilharRedeSocial('whatsapp')}
                    style={{
                      padding: "0.8rem",
                      background: "#25D366",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                      transition: "all 0.3s ease",
                      textAlign: "center"
                    }}
                  >
                    📱 {t.shareWhatsApp}
                  </button>
                  <button
                    onClick={() => handleCompartilharRedeSocial('facebook')}
                    style={{
                      padding: "0.8rem",
                      background: "#1877F2",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                      transition: "all 0.3s ease",
                      textAlign: "center"
                    }}
                  >
                    📘 {t.shareFacebook}
                  </button>
                  <button
                    onClick={() => alert(lang === 'pt' ? 'Baixe a imagem e compartilhe no Instagram Stories!' : lang === 'en' ? 'Download the image and share on Instagram Stories!' : '¡Descarga la imagen y comparte en Instagram Stories!')}
                    style={{
                      padding: "0.8rem",
                      background: "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                      transition: "all 0.3s ease",
                      textAlign: "center"
                    }}
                  >
                    📸 {t.shareInstagram}
                  </button>
                  <button
                    onClick={() => handleCompartilharRedeSocial('twitter')}
                    style={{
                      padding: "0.8rem",
                      background: "#000000",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                      transition: "all 0.3s ease",
                      textAlign: "center"
                    }}
                  >
                    🐦 {t.shareTwitter}
                  </button>
                  <button
                    onClick={() => handleCompartilharRedeSocial('pinterest')}
                    style={{
                      padding: "0.8rem",
                      background: "#E60023",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                      transition: "all 0.3s ease",
                      textAlign: "center"
                    }}
                  >
                    📌 {t.sharePinterest}
                  </button>
                </div>
                <p style={{ 
                  marginTop: "1rem", 
                  fontSize: "0.8rem", 
                  color: "#2c2c2c", 
                  opacity: 0.7,
                  textAlign: "center"
                }}>
                  💡 {t.downloadForShare}
                </p>
              </div>

              <p style={{ 
                marginTop: "1.5rem", 
                fontSize: "0.85rem", 
                color: "#2c2c2c", 
                opacity: 0.7,
                textAlign: "center"
              }}>
                💡 {lang === 'pt' ? 'Dica: Para melhor qualidade de impressão, use papel fotográfico' : lang === 'en' ? 'Tip: For better print quality, use photo paper' : 'Consejo: Para mejor calidad de impresión, use papel fotográfico'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
