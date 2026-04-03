
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/gemini';
import { Message } from '../types';

const STORAGE_KEY = 'calmavibe_chat_history';
const MAX_HISTORY_MESSAGES = 100; // Aumentado para mantener mejor el contexto de charlas largas

const ChatAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<'Kore' | 'Zephyr'>('Zephyr');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setInitialGreeting();
        }
      } catch (e) {
        setInitialGreeting();
      }
    } else {
      setInitialGreeting();
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const historyToSave = messages.slice(-MAX_HISTORY_MESSAGES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(historyToSave));
    }
  }, [messages]);

  const setInitialGreeting = () => {
    setMessages([
      { 
        role: 'model', 
        text: 'Hola. Estoy aquí para escucharte, sin juicios y con todo el tiempo del mundo. A veces solo necesitamos soltar lo que llevamos dentro para sentirnos un poco más ligeros. ¿Qué te gustaría desahogar hoy? Te leo con mucha atención.', 
        timestamp: Date.now() 
      }
    ]);
  };

  const clearChat = () => {
    if (window.confirm('¿Deseas borrar todo el historial de esta conversación? Esto no se puede deshacer.')) {
      localStorage.removeItem(STORAGE_KEY);
      setInitialGreeting();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const detectEmergency = (text: string) => {
    const keywords = ['suicidio', 'matarme', 'morir', 'pastillas', 'sobredosis', 'cortarme', 'muerte', 'desaparecer', 'ya no puedo más', 'quitarme la vida', 'emergencia', 'ayuda urgente'];
    const lower = text.toLowerCase();
    return keywords.some(k => lower.includes(k));
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    const hasEmergency = detectEmergency(currentInput);

    const history = messages.slice(-15).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await geminiService.getChatResponse(currentInput, history);
    
    let finalResponse = responseText || "Te escucho... sigue contándome, estoy aquí para ti.";
    
    if (hasEmergency) {
      finalResponse += "\n\n--- 🫂 RECURSOS DE APOYO INMEDIATO ---\nEntiendo que estás pasando por un momento muy difícil. Aunque yo estoy aquí para escucharte, hay personas profesionales que pueden darte un apoyo vital ahora mismo:\n\n📞 LÍNEAS DE AYUDA:\n• México: 800 911 2000 (Línea de la Vida)\n• España: 024 o 717 003 717\n• Argentina: 011 5275-1135\n• Colombia: 106\n• Chile: *4141\n\n📍 También puedes ir a la sección 'Directorio' para ver centros de ayuda cercanos en el mapa. No estás solo.";
    }

    const aiMessage: Message = { role: 'model', text: finalResponse, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);

    if (isVoiceEnabled) {
      playVoice(finalResponse);
    }
  };

  const playVoice = async (text: string) => {
    const sanitized = text.split('---')[0].trim();
    const audioBase64 = await geminiService.generateSpeech(sanitized, selectedVoice);
    if (audioBase64) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const binary = atob(audioBase64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        const int16 = new Int16Array(bytes.buffer);
        const buffer = ctx.createBuffer(1, int16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < int16.length; i++) channelData[i] = int16[i] / 32768.0;
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start();
      } catch (err) {
        console.error("Error al reproducir audio:", err);
      }
    }
  };

  return (
    <div className="flex flex-col h-[78vh] glass-effect rounded-3xl overflow-hidden shadow-2xl animate-fade-in border border-white/40">
      <div className="p-4 bg-white/10 flex flex-col md:flex-row justify-between items-center border-b border-white/20 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-2xl shadow-lg animate-pulse">✨</div>
          <div>
            <h3 className="font-bold text-lg">Acompañante de CalmaVibe</h3>
            <span className="text-[10px] opacity-70 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">Sesión de apoyo activa</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-black/10 p-1.5 rounded-2xl">
          <button 
            onClick={clearChat}
            className="p-2 rounded-xl bg-white/10 hover:bg-red-500/40 transition-all text-sm"
            title="Limpiar Conversación"
          >
            🗑️
          </button>
          <div className="h-6 w-[1px] bg-white/10"></div>
          <button 
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all text-xs font-semibold ${isVoiceEnabled ? 'bg-green-500/50' : 'bg-white/10 opacity-60'}`}
          >
            {isVoiceEnabled ? '🔊 Voz On' : '🔇 Voz Off'}
          </button>
          <div className="flex flex-col">
            <label className="text-[8px] opacity-50 ml-1 uppercase">Voz del Acompañante</label>
            <select 
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value as 'Kore' | 'Zephyr')}
              className="bg-transparent text-[10px] font-bold px-1 outline-none cursor-pointer text-blue-100"
            >
              <option value="Zephyr" className="text-gray-900">Serena (Femenina)</option>
              <option value="Kore" className="text-gray-900">Calmo (Masculino)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 no-scrollbar bg-gradient-to-b from-transparent to-blue-900/10">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[90%] md:max-w-[75%] p-5 rounded-3xl ${
              m.role === 'user' 
              ? 'bg-blue-600/80 text-white rounded-tr-none shadow-xl border border-white/20' 
              : 'bg-white/95 text-gray-800 rounded-tl-none shadow-xl'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base font-medium">
                {m.text}
              </p>
              <div className={`text-[10px] opacity-40 mt-3 flex items-center gap-1 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {m.role === 'model' && <span>• Enviado por tu acompañante</span>}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/40 backdrop-blur-md p-4 rounded-3xl rounded-tl-none text-gray-700 flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
              <span className="text-xs font-bold italic">Buscando las mejores palabras para ti...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white/20 border-t border-white/20 backdrop-blur-lg">
        <div className="flex gap-2 items-end max-w-4xl mx-auto">
          <textarea 
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Escribe aquí todo lo que sientas... no hay prisa."
            className="flex-1 bg-white/30 border border-white/40 rounded-2xl px-5 py-3 text-white placeholder:text-white/60 outline-none focus:bg-white/40 transition-all text-sm md:text-base resize-none max-h-32 min-h-[50px] shadow-inner overflow-y-auto"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 text-white w-14 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-95 group"
          >
            <span className="text-xl group-hover:translate-x-1 transition-transform">➔</span>
          </button>
        </div>
        <p className="text-[9px] text-center text-white/40 mt-2 uppercase tracking-tighter">
          Tus conversaciones son privadas y se guardan solo en este dispositivo.
        </p>
      </form>
    </div>
  );
};

export default ChatAI;
