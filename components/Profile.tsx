import React, { useState } from "react";

interface UserProfile {
  fullName: string;
  photoUrl: string;
  mood: string;
}

interface Props {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  onBack: () => void;
}

const Profile: React.FC<Props> = ({ userProfile, setUserProfile, onBack }) => {
  const [form, setForm] = useState<UserProfile>(userProfile);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setUserProfile(form);
    localStorage.setItem("userProfile", JSON.stringify(form));

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 max-w-xl mx-auto flex flex-col gap-4 text-white">

      <h2 className="text-2xl font-bold text-center">Tu Perfil</h2>

      <div className="flex justify-center">
        <img
          src={form.photoUrl || "https://via.placeholder.com/100"}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      <input
        type="text"
        placeholder="URL de tu foto"
        value={form.photoUrl}
        onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
      />

      <input
        type="text"
        placeholder="Nombre de usuario"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
      />

      <input
        type="text"
        placeholder="¿Cómo te sientes hoy?"
        value={form.mood}
        onChange={(e) => setForm({ ...form, mood: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
      />

      <button
        onClick={handleSave}
        className="bg-blue-500 py-3 rounded-lg font-semibold"
      >
        Guardar cambios
      </button>

      {saved && (
        <p className="text-green-400 text-center text-sm">
          Cambios guardados correctamente
        </p>
      )}

      <button
        onClick={onBack}
        className="text-sm opacity-70"
      >
        ← Volver
      </button>

    </div>
  );
};

export default Profile;