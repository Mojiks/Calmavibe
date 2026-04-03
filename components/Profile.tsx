
import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="glass-effect rounded-3xl p-6 md:p-8 text-white shadow-2xl max-w-2xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Mi Perfil</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all font-semibold"
        >
          {isEditing ? 'Cancelar' : 'Editar Perfil'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative group">
          <img 
            src={formData.photoUrl} 
            alt="Avatar" 
            className="w-32 h-32 rounded-full border-4 border-white/30 object-cover shadow-xl"
          />
          {isEditing && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <span className="text-xs font-bold text-center px-2">Cambiar Foto</span>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handlePhotoChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        <div className="flex-1 w-full">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm opacity-70 ml-1">Nombre Completo</label>
                  <input 
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm opacity-70 ml-1">Edad</label>
                  <input 
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-2 outline-none"
                    placeholder="Tu edad"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm opacity-70 ml-1">Ciudad</label>
                <input 
                  type="text"
                  value={formData.city || ''}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-2 outline-none"
                  placeholder="Tu ciudad"
                />
              </div>
              <div>
                <label className="text-sm opacity-70 ml-1">Sobre mí (Descripción)</label>
                <textarea 
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-2 outline-none h-20"
                  placeholder="Cuéntanos un poco sobre ti..."
                />
              </div>
              <div>
                <label className="text-sm opacity-70 ml-1">Información Médica Importante</label>
                <textarea 
                  value={formData.medicalInfo}
                  onChange={(e) => setFormData({...formData, medicalInfo: e.target.value})}
                  className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-2 outline-none h-20"
                  placeholder="Alergias, condiciones, medicamentos actuales..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm opacity-70 ml-1">Contacto de Emergencia</label>
                  <input 
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                    className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-2 outline-none"
                    placeholder="Nombre"
                  />
                </div>
                <div>
                  <label className="text-sm opacity-70 ml-1">Teléfono Emergencia</label>
                  <input 
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
                    className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-2 outline-none"
                    placeholder="Número"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl mt-4 hover:shadow-lg transition-all"
              >
                Guardar Cambios
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold">{formData.fullName}</h3>
                <div className="flex gap-4 mt-1 opacity-60 text-sm">
                  {formData.age && <span>{formData.age} años</span>}
                  {formData.city && <span>📍 {formData.city}</span>}
                </div>
              </div>

              {formData.bio && (
                <div className="bg-white/10 p-4 rounded-2xl italic text-sm opacity-90">
                  "{formData.bio}"
                </div>
              )}

              <div className="bg-white/10 p-4 rounded-2xl">
                <h4 className="font-bold mb-2 flex items-center gap-2">🏥 Ficha Médica</h4>
                <p className="text-sm opacity-80 leading-relaxed italic">
                  {formData.medicalInfo || "No se ha agregado información médica todavía."}
                </p>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl">
                <h4 className="font-bold mb-2 flex items-center gap-2">🆘 Contacto de Emergencia</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold">{formData.emergencyContact || "No asignado"}</p>
                    <p className="text-xs opacity-60">{formData.emergencyPhone || "---"}</p>
                  </div>
                  {formData.emergencyPhone && (
                    <a 
                      href={`tel:${formData.emergencyPhone}`}
                      className="bg-green-500 hover:bg-green-600 p-3 rounded-full transition-colors"
                    >
                      📞
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
