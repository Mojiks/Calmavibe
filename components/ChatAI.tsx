import React, { useState } from 'react';
import { geminiService } from '../services/gemini';

const DAILY_LIMIT = 10;

const getTodayKey = () => {
  const today = new Date().toISOString().split("T")[0];
  return `chat_limit_${today}`;
};

const ChatAI: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const getUsage = () => parseInt(localStorage.getItem(getTodayKey()) || "0");

  const canSendMessage = () => getUsage() < DAILY_LIMIT;

  const increaseUsage = () => {
    const used = getUsage();
    localStorage.setItem(getTodayKey(), (used + 1).toString());
  };

  const detectEmergency = (text: string) => {
    const keywords = ["suicidio", "matarme", "no quiero vivir", "quiero morir"];
    return keywords.some(k => text.toLowerCase().includes(k));
  };

  const userId = localStorage.getItem("user_id") || Math.random().toString();
localStorage.setItem("user_id", userId);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!canSendMessage()) {
      alert("Has alcanzado el límite diario.");
      return;
    }

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    let response = "";

    if (detectEmergency(userMsg)) {
      response = `Lamento mucho que te sientas así. No estás solo.

¿Te gustaría contactar ayuda inmediata?

📞 Línea de la Vida: 800 911 2000  
📞 Emergencias: 911`;
    } else {
      response = await geminiService.getChatResponse(userMsg);
    }

    setMessages(prev => [...prev, { role: 'assistant', text: response }]);

    increaseUsage();
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto flex flex-col gap-4">

      <h2 className="text-xl font-bold">Chat de Apoyo</h2>

      {/* aviso */}
      <p className="text-xs opacity-60">
        Este chat es de apoyo emocional y no sustituye ayuda profesional.
      </p>

      {/* botón ayuda */}
      <div className="bg-red-600 p-3 rounded-lg text-center">
        <a href="tel:8009112000" className="font-bold">
          🚨 Necesito ayuda inmediata
        </a>
      </div>

      <div className="bg-black/20 p-4 rounded-xl h-[350px] overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className="inline-block bg-white/10 p-2 rounded">
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded bg-white/10"
        />
        <button onClick={handleSend} className="bg-blue-500 px-4 rounded">
          {loading ? "..." : "Enviar"}
        </button>
      </div>

      <p className="text-xs opacity-60">
        {getUsage()} / {DAILY_LIMIT} mensajes usados hoy
      </p>
    </div>
  );
};

export default ChatAI;