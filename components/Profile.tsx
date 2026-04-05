import React, { useState } from "react";
import { UserProfile } from "../types";

interface Props {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const Profile: React.FC<Props> = ({ profile, onUpdate }) => {

  const [form, setForm] = useState<UserProfile>(profile);

  const handleSave = () => {
    onUpdate(form);
    localStorage.setItem("userProfile", JSON.stringify(form));
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">

      <h2 className="text-2xl font-bold text-center">
        Tu Perfil
      </h2>

      <input
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        placeholder="Nombre"
        className="w-full p-2 rounded bg-black/20"
      />

      <input
        value={form.photoUrl}
        onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
        placeholder="URL de foto"
        className="w-full p-2 rounded bg-black/20"
      />

      <input
        value={form.mood}
        onChange={(e) => setForm({ ...form, mood: e.target.value })}
        placeholder="Estado emocional"
        className="w-full p-2 rounded bg-black/20"
      />

      <input
        value={form.instagram || ""}
        onChange={(e) => setForm({ ...form, instagram: e.target.value })}
        placeholder="Instagram (opcional)"
        className="w-full p-2 rounded bg-black/20"
      />

      <button
        onClick={handleSave}
        className="w-full bg-blue-500 py-2 rounded-lg"
      >
        Guardar cambios
      </button>

    </div>
  );
};

export default Profile;