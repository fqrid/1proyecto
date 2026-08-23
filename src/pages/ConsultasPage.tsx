import React, { useState, useEffect } from 'react';
import './ConsultasPage.css';

interface PQRS {
  id: string;
  solicitante: string;
  categoria: string;
  descripcion: string;
  estado: 'En trámite' | 'Resuelto';
  fechaRadicacion: string;
  plazoLegal: string;
  respuestaOficial: string | null;
}

export const ConsultasPage: React.FC = () => {
  const [pqrsList, setPqrsList] = useState<PQRS[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchPQRS = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/pqrs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPqrsList(data);
    } catch (err: any) {
      console.error('Error fetching PQRS:', err);
      setError('No pudimos cargar la información de los trámites. Por favor, verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPQRS();
  }, []);

  // Filter based on search input
  const filteredPQRS = pqrsList.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.id.toLowerCase().includes(term) ||
      item.solicitante.toLowerCase().includes(term) ||
      item.categoria.toLowerCase().includes(term) ||
      item.descripcion.toLowerCase().includes(term)
    );
  });

  // State 1: Loading
  if (loading) {
    return (
      <div className="state-container loading-state">
        <div className="spinner"></div>
        <p className="state-text">Cargando radicados ciudadanos...</p>
      </div>
    );
  }

  // State 2: Error
  if (error) {
    return (
      <div className="state-container error-state">
        <svg className="state-icon error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h3 className="state-title">Error de Conexión</h3>
        <p className="state-description">{error}</p>
        <button className="btn-retry" onClick={fetchPQRS}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="consultas-container">
      {/* Search Header */}
      <div className="search-section">
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por radicado (ej: PQRS-001), solicitante, categoría o palabras clave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="search-clear-btn" onClick={() => setSearchTerm('')}>
              ×
            </button>
          )}
        </div>
        <div className="search-results-counter">
          Mostrando {filteredPQRS.length} de {pqrsList.length} trámites radicados
        </div>
      </div>

      {/* State 3: Empty */}
      {filteredPQRS.length === 0 ? (
        <div className="state-container empty-state">
          <svg className="state-icon empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <h3 className="state-title">Sin Resultados</h3>
          <p className="state-description">No se encontraron trámites que coincidan con "{searchTerm}".</p>
        </div>
      ) : (
        /* State 4: List with Data */
        <div className="pqrs-grid">
          {filteredPQRS.map((pqrs) => (
            <div key={pqrs.id} className="pqrs-card">
              <div className="pqrs-card-header">
                <div className="pqrs-badge-group">
                  <span className="pqrs-id-badge">{pqrs.id}</span>
                  <span className={`pqrs-category-badge category-${pqrs.categoria.toLowerCase()}`}>
                    {pqrs.categoria}
                  </span>
                </div>
                <span className={`pqrs-status-badge status-${pqrs.estado.replace(/\s+/g, '-').toLowerCase()}`}>
                  {pqrs.estado}
                </span>
              </div>

              <h4 className="pqrs-solicitante">
                <svg className="user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {pqrs.solicitante}
              </h4>

              <div className="pqrs-dates-row">
                <div className="pqrs-date-item">
                  <span className="date-label">Radicado:</span>
                  <span className="date-value">{pqrs.fechaRadicacion}</span>
                </div>
                <div className="pqrs-date-item">
                  <span className="date-label">Plazo legal:</span>
                  <span className="date-value">{pqrs.plazoLegal}</span>
                </div>
              </div>

              <p className="pqrs-descripcion">{pqrs.descripcion}</p>

              {pqrs.respuestaOficial && (
                <div className="pqrs-respuesta-box">
                  <div className="respuesta-header">
                    <svg className="check-circle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Respuesta Oficial
                  </div>
                  <p className="respuesta-text">{pqrs.respuestaOficial}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
