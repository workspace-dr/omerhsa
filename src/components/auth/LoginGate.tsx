import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AUTHORIZED_USERS } from '../../lib/users';
import logoOmerhsa from '../../assets/images/logos/omerhsa.png'; // Asegúrate de la ruta

export default function LoginGate() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // 1. Verificar si ya inició sesión en esta pestaña
    const session = sessionStorage.getItem('omerhsa_auth');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
    
    // Pequeño timeout para evitar parpadeos bruscos
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 2. Validar credenciales contra el JSON
    const user = AUTHORIZED_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      // Éxito: Guardar en sesión y liberar
      sessionStorage.setItem('omerhsa_auth', 'true');
      sessionStorage.setItem('omerhsa_user', user.name);
      setIsAuthenticated(true);
    } else {
      setError('Credenciales incorrectas. Acceso denegado.');
    }
  };

  // Si está autenticado, no renderizamos nada (la web se ve normal)
  if (isAuthenticated) return null;

  // Renderizado del Bloqueo
  return (
    <div className="fixed inset-0 z-[99999] bg-gray-900 flex items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 blur-sm"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
      >
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center h-80">
            <div className="w-10 h-10 border-4 border-omerhsa-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 text-sm font-medium">Verificando acceso...</p>
          </div>
        ) : (
          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <img 
                src={logoOmerhsa.src} 
                alt="OMERHSA" 
                className="h-12 mx-auto mb-4 object-contain" 
              />
              <h2 className="text-xl font-bold text-gray-900">Acceso Restringido</h2>
              <p className="text-sm text-gray-500 mt-2">
                Sitio en desarrollo. Inicia sesión para visualizar.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-omerhsa-primary focus:ring-2 focus:ring-omerhsa-primary/20 outline-none transition-all"
                  placeholder="usuario@omerhsa.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Contraseña</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-omerhsa-primary focus:ring-2 focus:ring-omerhsa-primary/20 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <button 
                type="submit" 
                className="w-full py-3.5 bg-omerhsa-primary hover:bg-omerhsa-dark text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-omerhsa-primary/30 mt-2"
              >
                Ingresar al Sitio
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} OMERHSA Seguros. <br/> Acceso autorizado únicamente.
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}