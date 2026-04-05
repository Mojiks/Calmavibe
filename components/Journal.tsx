import React, { useState } from 'react';
import Healing from './Healing';

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [view, setView] = useState<'journal' | 'healing'>('journal');

  const saveEntry = () => {
    if (!text.trim()) return;

    const updated = [text, ...entries];
    setEntries(updated);
    localStorage.setItem('journal_entries', JSON.stringify(updated));
    setText('');
  };

  // 👉 cambiar a sección liberación
  if (view === 'healing') {
    return <Healing onBack={() => setView('journal')} />;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto flex flex-col gap-4">

      <h2 className="text-2xl font-bold">Diario Personal</h2>

      {/* ⚠️ AVISO */}
      <p className="text-xs opacity-60">
        Tus notas se guardan solo en este dispositivo. Esta herramienta es de apoyo emocional y no sustituye ayuda profesional.
      </p>

      {/* BOTONES */}
      <div className="flex gap-2">
        <button
          onClick={saveEntry}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          Guardar
        </button>

        <button
          onClick={() => setView('healing')}
          className="bg-purple-500 px-4 py-2 rounded-lg"
        >
          🌿 Liberación Emocional
        </button>
      </div>

      {/* INPUT */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-[150px] p-3 rounded-lg bg-black/20"
        placeholder="Escribe lo que sientes..."
      />

      {/* LISTA */}
      <div className="space-y-2">
        {entries.map((entry, i) => (
          <div key={i} className="bg-white/10 p-3 rounded-lg text-sm">
            {entry}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Journal;