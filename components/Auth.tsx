
import React, { useState } from 'react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    // Simulación de envío de correo
    setTimeout(() => {
      setIsForgotPassword(false);
      setResetSent(false);
    }, 3000);
  };

  if (isForgotPassword) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4 animate-fade-in">
        <div className="glass-effect p-8 rounded-3xl w-full max-w-md text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 text-center drop-shadow-sm">Recuperar Acceso</h2>
          <p className="text-sm text-center opacity-80 mb-6 font-medium">
            Ingresa tu correo y te enviaremos las instrucciones para restablecer tu contraseña.
          </p>
          
          {resetSent ? (
            <div className="bg-green-500/30 border border-green-500/50 p-4 rounded-xl text-center animate-pulse">
              <p className="font-bold text-sm">¡Correo enviado!</p>
              <p className="text-xs opacity-80">Revisa tu bandeja de entrada en unos momentos.</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleResetPassword}>
              <div>
                <label className="block text-sm mb-1 ml-1 opacity-80">Correo electrónico</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 outline-none focus:bg-white/30 transition-all placeholder:text-white/40"
                  placeholder="ejemplo@correo.com"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl mt-4 hover:bg-blue-50 transition-all shadow-md"
              >
                Enviar Instrucciones
              </button>
            </form>
          )}
          
          <button 
            onClick={() => setIsForgotPassword(false)}
            className="w-full mt-6 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4 animate-fade-in">
      <div className="glass-effect p-8 rounded-3xl w-full max-w-md text-white shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-sm">
          {isRegistering ? 'Crear Cuenta' : 'Bienvenido de nuevo'}
        </h2>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label className="block text-sm mb-1 ml-1 opacity-80">Correo electrónico</label>
            <input 
              type="email" 
              required
              className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 outline-none focus:bg-white/30 transition-all placeholder:text-white/40"
              placeholder="ejemplo@correo.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 ml-1 opacity-80">Contraseña</label>
            <input 
              type="password" 
              required
              className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 outline-none focus:bg-white/30 transition-all placeholder:text-white/40"
              placeholder="••••••••"
            />
          </div>

          {!isRegistering && (
            <div className="flex items-center justify-between ml-1">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded border-white/30 bg-white/20 accent-blue-500"
                />
                <label htmlFor="remember" className="text-xs opacity-80 cursor-pointer">Recordar</label>
              </div>
              <button 
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-xs font-bold underline decoration-white/30 underline-offset-2 hover:opacity-100 opacity-70 transition-opacity"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}
          
          <button 
            type="submit"
            className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl mt-4 hover:bg-blue-50 transition-all shadow-md"
          >
            {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="mt-6 text-center opacity-80">
          {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="ml-2 font-bold underline decoration-white/30 underline-offset-4"
          >
            {isRegistering ? 'Entrar' : 'Registrarse'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
