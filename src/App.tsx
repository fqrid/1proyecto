import React, { useState } from 'react';
import './App.css';
import { TarjetaTramite } from './components/TarjetaTramite';
import { ConsultasPage } from './pages/ConsultasPage';

function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'consultas'>('inicio');

  return (
    <div className="app-container">
      {/* Institutional Top Navbar */}
      <header className="app-header">
        <div className="header-brand" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('inicio')}>
          <div className="header-logo-placeholder">G</div>
          <h2 className="header-title">Gobierno Municipal</h2>
        </div>
        <nav className="header-nav">
          <button
            onClick={() => setActiveTab('inicio')}
            className={`nav-link-btn ${activeTab === 'inicio' ? 'active' : ''}`}
          >
            Inicio
          </button>
          <button
            onClick={() => setActiveTab('consultas')}
            className={`nav-link-btn ${activeTab === 'consultas' ? 'active' : ''}`}
          >
            Consultas PQRS
          </button>
        </nav>
      </header>

      {/* Conditionally Render Content based on activeTab */}
      {activeTab === 'inicio' ? (
        <>
          {/* Institutional Hero Banner */}
          <section className="app-hero">
            <div className="hero-content">
              <span className="hero-tag">Portal de Atención Ciudadana</span>
              <h1 className="hero-title">Trámites y Servicios Municipales</h1>
              <p className="hero-subtitle">
                Reporta incidentes, consulta horarios y obtén respuestas rápidas sobre los servicios de tu localidad.
              </p>
              <button className="hero-cta-btn" onClick={() => setActiveTab('consultas')}>
                Consultar Radicados
              </button>
            </div>
          </section>

          {/* Main Content Area */}
          <main className="app-main" id="respuestas">
            {/* Section Heading "Respuestas" */}
            <div className="section-header-container">
              <div className="section-heading-indicator" />
              <h2 className="section-heading">Respuestas</h2>
            </div>

            {/* 3-Column Responsive Grid */}
            <div className="cards-grid">
              <TarjetaTramite
                titulo="Agua y Alcantarillado"
                descripcion="Reporte de fugas, consultas sobre cortes en el suministro y mantenimiento de alcantarillado."
                categoria="Servicios Básicos"
              />
              <TarjetaTramite
                titulo="Recolección de Basura"
                descripcion="Consulta de horarios, reporte de acumulación de residuos en la vía pública y limpieza en puntos críticos."
                categoria="Limpieza Urbana"
              />
              <TarjetaTramite
                titulo="Alumbrado Público"
                descripcion="Reporte de lámparas apagadas, postes caídos y solicitud de nueva iluminación en calles secundarias."
                categoria="Servicios Públicos"
              />
            </div>
          </main>
        </>
      ) : (
        <main className="app-main">
          {/* Section Heading "Consultar Radicados" */}
          <div className="section-header-container">
            <div className="section-heading-indicator" />
            <h2 className="section-heading">Consulta de Trámites y Radicados</h2>
          </div>
          <ConsultasPage />
        </main>
      )}

      {/* Institutional Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">© {new Date().getFullYear()} Gobierno Municipal - Todos los derechos reservados.</p>
          <p className="footer-text">Portal optimizado para atención ciudadana y acceso a servicios públicos.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
