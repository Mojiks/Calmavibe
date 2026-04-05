import React, { useState } from 'react';
import { Music as MusicIcon, Wind, Play, Headphones } from 'lucide-react';

type Track = {
  id: string;
  title: string;
  url: string;
  type: 'meditation' | 'nature';
};

type Sound = {
  id: string;
  title: string;
  url: string;
  icon: string;
};

const ZenSpace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'music' | 'sounds'>('music');
  const [currentTrack, setCurrentTrack] = useState<Track | Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔥 TUS AUDIOS
  const tracks: Track[] = [
    { id: '1', title: 'Frecuencia 528Hz', url: '/sounds/frecuenciaambiente528hz.mp3', type: 'meditation' },
    { id: '2', title: 'Océano Cósmico', url: '/sounds/oceanocosmico.mp3', type: 'nature' },
    { id: '3', title: 'Tormenta Enigmática', url: '/sounds/tormentaenigmatica.mp3', type: 'nature' },
    { id: '4', title: 'Meditación', url: '/sounds/meditacion.mp3', type: 'meditation' },
    { id: '5', title: 'Frecuencia 16Hz', url: '/sounds/16hzbetabinaural.mp3', type: 'meditation' },
    { id: '6', title: 'Lluvia', url: '/sounds/susurrodelluvia.mp3', type: 'nature' },
    { id: '7', title: 'Sueno Relajante', url: '/sounds/suenorelajante.mp3', type: 'meditation' },
    { id: '8', title: 'Aliento de Buda', url: '/sounds/alientodebuda.mp3', type: 'meditation' },
    { id: '9', title: 'Sueno Profundo', url: '/sounds/frecuenciasuenoprofundo.mp3', type: 'meditation' },
    { id: '10', title: 'Naturaleza Tibetana', url: '/sounds/naturalezatibetana.mp3', type: 'nature' },
    { id: '11', title: 'Cascada', url: '/sounds/meditacionconcascada.mp3', type: 'nature' },
    { id: '12', title: 'Cuencos Meditación', url: '/sounds/meditacioncuencostibetanos.mp3', type: 'meditation' },
    { id: '13', title: 'Cuencos Tibetanos', url: '/sounds/cuencostibetanos.mp3', type: 'meditation' },
  ];

  const sounds: Sound[] = [
    { id: 's1', title: 'Lluvia Profunda', url: '/sounds/susurrodelluvia.mp3', icon: '🌧️' },
    { id: 's2', title: 'Océano', url: '/sounds/oceanocosmico.mp3', icon: '🌊' },
    { id: 's3', title: 'Cuencos', url: '/sounds/cuencostibetanos.mp3', icon: '🎹' },
  ];

  // 🔊 Fade suave
  const fadeAudio = (audio: HTMLAudioElement, fadeIn = true) => {
    let volume = fadeIn ? 0 : audio.volume;

    const interval = setInterval(() => {
      if (fadeIn) {
        if (volume < 0.4) {
          volume += 0.02;
          audio.volume = volume;
        } else clearInterval(interval);
      } else {
        if (volume > 0) {
          volume -= 0.02;
          audio.volume = volume;
        } else {
          audio.pause();
          clearInterval(interval);
        }
      }
    }, 100);
  };

  // 🔇 detener otros audios
  const stopAllAudio = () => {
    const audios = document.querySelectorAll('audio');
    audios.forEach(a => {
      a.pause();
      a.currentTime = 0;
    });
  };

  const togglePlay = (track: Track | Sound) => {
    stopAllAudio();

    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">

      {/* TABS */}
      <div className="flex gap-4 mb-8">
        <button onClick={() => setActiveTab('music')}>
          <MusicIcon /> Música
        </button>

        <button onClick={() => setActiveTab('sounds')}>
          <Headphones /> Sonidos
        </button>
      </div>

      {/* MUSIC */}
      {activeTab === 'music' && (
        <div className="grid gap-4">
          {tracks.map(track => (
            <div key={track.id} onClick={() => togglePlay(track)}>

              <div className="flex justify-between cursor-pointer">
                <span>{track.title}</span>
                <Play />
              </div>

              {currentTrack?.id === track.id && (
                <audio
                  src={track.url}
                  autoPlay={isPlaying}
                  controls
                  ref={(audio) => {
                    if (audio && isPlaying) {
                      audio.volume = 0;
                      fadeAudio(audio, true);
                    }
                  }}
                  onPause={(e) => fadeAudio(e.currentTarget, false)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* SOUNDS */}
      {activeTab === 'sounds' && (
        <div className="grid gap-4">
          {sounds.map(sound => (
            <div key={sound.id} onClick={() => togglePlay(sound)}>

              <div className="flex justify-between cursor-pointer">
                <span>{sound.icon} {sound.title}</span>
                <Play />
              </div>

              {currentTrack?.id === sound.id && (
                <audio
                  src={sound.url}
                  autoPlay={isPlaying}
                  controls
                  ref={(audio) => {
                    if (audio && isPlaying) {
                      audio.volume = 0;
                      fadeAudio(audio, true);
                    }
                  }}
                  onPause={(e) => fadeAudio(e.currentTarget, false)}
                />
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ZenSpace;