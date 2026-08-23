import React from 'react';
import './TarjetaTramite.css';

interface TarjetaTramiteProps {
  titulo: string;
  descripcion: string;
  categoria: string;
}

export const TarjetaTramite: React.FC<TarjetaTramiteProps> = ({
  titulo,
  descripcion,
  categoria,
}) => {
  // Helper to get matching SVG icon based on category/title
  const getIcon = () => {
    const term = (titulo + ' ' + categoria).toLowerCase();
    if (term.includes('agua') || term.includes('alcantarillado')) {
      return (
        <svg className="tarjeta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 11 5 15a7 7 0 0 0 7 7z" />
        </svg>
      );
    }
    if (term.includes('basura') || term.includes('recoleccion') || term.includes('recolección')) {
      return (
        <svg className="tarjeta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      );
    }
    if (term.includes('alumbrado') || term.includes('público') || term.includes('publico') || term.includes('lampara') || term.includes('poste')) {
      return (
        <svg className="tarjeta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="12" width="20" height="8" rx="2" />
          <path d="M12 2v10" />
          <path d="M12 20v2" />
          <path d="M8 2h8" />
          <path d="M6 6h12" />
        </svg>
      );
    }
    return (
      <svg className="tarjeta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    );
  };

  return (
    <div className="tarjeta-tramite">
      <div className="tarjeta-accent-bar" />
      <div className="tarjeta-header">
        <span className="tarjeta-categoria">{categoria}</span>
        <div className="tarjeta-icon-container">{getIcon()}</div>
      </div>
      <h3 className="tarjeta-titulo">{titulo}</h3>
      <p className="tarjeta-descripcion">{descripcion}</p>
      <div className="tarjeta-action">
        <span>Ver detalles</span>
        <svg className="tarjeta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </div>
  );
};
