import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import TrustSection from "./components/TrustSection/TrustSection.tsx";
import Footer from "./components/Footer/Footer";

import ScrollTop from "./components/ScrollTop/ScrollTop";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange/ScrollToTopOnRouteChange";

import { HelmetProvider, Helmet } from "react-helmet-async";
import PoliticaEPrivacidade from "./pages/PoliticasEPrivacidade";
import Services from "./components/Services/Services";
import Differentials from "./components/Differentials/Differentials";
import ExperienceSection from "./components/ExperienceSection/ExperienceSection.tsx";
import HowItWorks from "./components/HowItWorks/HowItWorks.tsx";
import FlyersSection from "./components/FlyersSection/FlyersSection.tsx";

function AppContent() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <Header />

      {/* Scroll ao topo ao trocar rota */}
      <ScrollToTopOnRouteChange />

      {/* Botão flutuante de voltar ao topo */}
      <ScrollTop />

      <Routes>
        {/* ===================== HOME ===================== */}
        <Route
          path="/"
          element={
            <>
        <Helmet>
  {/* ================= SEO BÁSICO ================= */}
  <title>Chaveiro 24h em Betim | Abertura de Portas, Troca de Fechaduras, Socorro 24h em Betim</title>

  <meta
    name="description"
    content="Chaveiro 24h em Betim e região. Abertura de portas, troca de fechaduras, cópia de chaves e atendimento rápido no local. Segurança, agilidade e preço justo."
  />

  <meta
    name="keywords"
    content="chaveiro betim, chaveiro 24h betim, abertura de portas, troca de fechaduras, cópia de chaves, chaveiro residencial, chaveiro automotivo, chaveiro urgente"
  />

  <link rel="canonical" href="https://seudominio.com.br" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />

  <meta
    property="og:title"
    translate="no"
    content="Chaveiro 24h em Betim | Atendimento Rápido e Seguro"
  />

  <meta
    property="og:description"
    translate="no"
    content="Precisa de um chaveiro agora? Atendimento 24h em Betim para abertura de portas, troca de fechaduras e serviços emergenciais."
  />

  <meta
    property="og:image"
    content="https://seudominio.com.br/og-image.png"
  />

  <meta
    property="og:url"
    content="https://seudominio.com.br"
  />
</Helmet>



              <main className="pt-14 min-h-screen flex flex-col">
                <Hero />

                <Services />
                <Differentials />
                <FlyersSection />

                <TrustSection/>
                <ExperienceSection />
                <HowItWorks />
              
              </main>
            </>
          }
        />

        {/* ===================== OUTRAS PÁGINAS ===================== */}
        <Route path="/about" element={<TrustSection />} />
        <Route path="/Politicas" element={<PoliticaEPrivacidade />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}
