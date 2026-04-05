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

  // 📸 manejar imagen
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({
        ...form,
        photoUrl: reader.result as string
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setUserProfile(form);
    localStorage.setItem("userProfile", JSON.stringify(form));

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 max-w-xl mx-auto flex flex-col gap-4 text-white">

      <h2 className="text-2xl font-bold text-center">Tu Perfil</h2>

      {/* FOTO */}
      <div className="flex justify-center">
        <img
          src={form.photoUrl || "https://via.placeholder.com/120"}
          className="w-28 h-28 rounded-full object-cover border border-white/20"
        />
      </div>

      {/* INPUT FILE */}
      <label className="bg-white/10 border border-white/20 p-3 rounded-lg text-center cursor-pointer hover:bg-white/20 transition">
        📷 Subir foto de perfil
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
      </label>

      {/* NOMBRE */}
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
      />

      {/* ESTADO */}
      <input
        type="text"
        placeholder="¿Cómo te sientes hoy?"
        value={form.mood}
        onChange={(e) => setForm({ ...form, mood: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
      />

      {/* BOTÓN */}
      <button
        onClick={handleSave}
        className="bg-blue-500 py-3 rounded-lg font-semibold"
      >
        Guardar cambios
      </button>

      {/* MENSAJE */}
      {saved && (
        <p className="text-green-400 text-center text-sm">
          Cambios guardados correctamente
        </p>
      )}

      {/* VOLVER */}
      <button
        onClick={onBack}
        className="text-sm opacity-70 hover:opacity-100"
      >
        ← Volver
      </button>

    </div>
  );
};

export default Profile;