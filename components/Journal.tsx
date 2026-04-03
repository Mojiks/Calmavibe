
import React, { useState, useEffect } from 'react';
import { JournalEntry } from '../types';

const MOODS = [
  { id: 'feliz', label: 'Feliz', emoji: '😊', color: 'bg-yellow-400' },
  { id: 'triste', label: 'Triste', emoji: '😢', color: 'bg-blue-400' },
  { id: 'ansioso', label: 'Ansioso', emoji: '😟', color: 'bg-orange-400' },
  { id: 'calmado', label: 'Calmado', emoji: '🧘', color: 'bg-green-400' },
];

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('calmavibe_journal');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const saveEntries = (updated: JournalEntry[]) => {
    setEntries(updated);
    localStorage.setItem('calmavibe_journal', JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!newContent.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      title: newTitle || 'Sin título',
      content: newContent,
      mood: selectedMood || undefined
    };
    saveEntries([entry, ...entries]);
    setNewTitle('');
    setNewContent('');
    setSelectedMood(null);
    setIsAdding(false);
  };

  const deleteEntry = (id: string) => {
    if (window.confirm('¿Seguro que quieres borrar este recuerdo?')) {
      saveEntries(entries.filter(e => e.id !== id));
    }
  };

  const getMoodEmoji = (moodId?: string) => {
    return MOODS.find(m => m.id === moodId)?.emoji || '';
  };

  return (
    <div className="glass-effect rounded-3xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto min-h-[60vh]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Mi Diario</h2>
          <p className="text-sm opacity-70 italic">Escribir es sanar...</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-white text-blue-700 px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-all"
          >
            + Escribir
          </button>
        )}
      </div>

      {isAdding ? (
        <div className="bg-white/20 p-6 rounded-2xl animate-fade-in space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold opacity-80">¿Cómo te sientes en este momento?</p>
            <div className="flex flex-wrap gap-3">
              {MOODS.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border ${
                    selectedMood === mood.id 
                    ? `${mood.color} border-white shadow-lg scale-105 text-white` 
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span className="text-sm font-medium">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <input 
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Título del día (opcional)"
              className="w-full bg-transparent border-b border-white/30 text-2xl font-bold py-2 mb-4 outline-none placeholder:text-white/40"
            />
            <textarea 
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Desahógate aquí... cuéntanos lo que necesites."
              className="w-full bg-transparent h-64 outline-none resize-none leading-relaxed text-lg placeholder:text-white/40"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 opacity-70 hover:opacity-100">Cancelar</button>
            <button onClick={handleAdd} className="bg-blue-500 px-8 py-2 rounded-xl font-bold shadow-md hover:bg-blue-600 transition-all">Guardar</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.length === 0 ? (
            <div className="col-span-full py-20 text-center opacity-60">
              <span className="text-6xl mb-4 block">📖</span>
              <p className="text-xl">Tu diario está vacío. <br/> Empieza a escribir cuando te sientas listo.</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="bg-white/10 p-5 rounded-2xl hover:bg-white/20 transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] uppercase tracking-wider opacity-60">{entry.date}</span>
                  <div className="flex gap-2">
                    {entry.mood && (
                      <span className="text-lg" title={entry.mood}>{getMoodEmoji(entry.mood)}</span>
                    )}
                    <button onClick={() => deleteEntry(entry.id)} className="opacity-0 group-hover:opacity-100 text-red-300 hover:text-red-500 transition-all">🗑️</button>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 pr-8">{entry.title}</h3>
                <p className="text-sm opacity-80 line-clamp-4 leading-relaxed italic">{entry.content}</p>
                {entry.mood && (
                   <div className={`absolute bottom-0 right-0 w-8 h-8 opacity-10 flex items-center justify-center text-4xl`}>
                     {getMoodEmoji(entry.mood)}
                   </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Journal;
