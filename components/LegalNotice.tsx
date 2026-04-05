import React, { useState } from 'react';

interface Props {
  onAccept: () => void;
}

const LegalNotice: React.FC<Props> = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6">
      <div className="max-w-xl bg-black/80 p-6 rounded-2xl text-white border border-white/20">
        <h2 className="text-xl font-bold mb-4">Aviso Importante</h2>

        <p className="text-sm mb-4">
          CalmaVibe es una plataforma de apoyo emocional. No proporciona diagnóstico médico,
          tratamiento psicológico ni sustituye atención profesional.
        </p>

        <p className="text-sm mb-4">
          Si estás en crisis o en peligro inmediato, contacta servicios de emergencia o una línea
          de ayuda. El uso de esta plataforma es bajo tu responsabilidad.
        </p>

        <label className="flex items-center gap-2 text-sm mb-4">
          <input type="checkbox" onChange={(e) => setAccepted(e.target.checked)} />
          He leído y acepto este aviso
        </label>

        <button
          disabled={!accepted}
          onClick={onAccept}
          className="w-full bg-blue-500 py-2 rounded-lg disabled:opacity-50"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default LegalNotice;