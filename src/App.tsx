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
  <title>The Brothers Burguer | Hambúrguer Artesanal em Betim</title>

  <meta
    name="description"
    content="The Brothers Burguer — Hambúrguer artesanal feito com blend especial, pão macio, ingredientes frescos e muito sabor. Peça online e descubra a melhor experiência em Betim."
  />

  <meta
    name="keywords"
    content="hambúrguer artesanal, hamburgueria betim, the brothers burguer, smash burger, burger artesanal, comida artesanal, hamburguer delivery"
  />

  <link rel="canonical" href="https://thebrothers-site.online" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta
    property="og:title"
    translate="no"
    content="The Brothers Burguer | Hambúrguer Artesanal em Betim"
  />
  <meta
    property="og:description"
    translate="no"
    content="Hambúrguer artesanal feito com blend especial e ingredientes frescos. Peça online e descubra a melhor experiência em Betim."
  />
  <meta
    property="og:image"
    content="https://thebrothers-site.online/og-image.jpg"
  />
  <meta
    property="og:url"
    content="https://thebrothers-site.online"
  />

</Helmet>


              <main className="pt-14 min-h-screen flex flex-col">
                <Hero />

                <Services />
                <Differentials />
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
