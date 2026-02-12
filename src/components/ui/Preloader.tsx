import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Importamos imágenes directamente para asegurarnos que Vite las procese
// IMPORTANTE: Ajusta las rutas a tus imágenes reales
import logoOmerhsaUrl from '../../assets/images/logos/omerhsa.png';

// Si no tienes el logo del aliado a mano, usa un placeholder o duplica el de omerhsa para probar
import logoPartnerUrl from '../../assets/images/logos/grupoflores.png'; // CAMBIAR POR LOGO REAL


export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Revisar si ya se mostró en esta sesión
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');

    if (hasSeenPreloader) {
      setIsVisible(false);
      return;
    }

    // 2. Bloquear scroll
    document.body.style.overflow = 'hidden';

    // 3. Temporizador (Tiempo suficiente para cargar logos + video, aprox 2-3 seg)
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto'; // Restaurar scroll
      sessionStorage.setItem('hasSeenPreloader', 'true'); // Marcar como visto
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }} // Se desvanece y sube un poco
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <div className="flex items-center gap-8 md:gap-12 animate-pulse">
            {/* Logo OMERHSA */}
            <div className="w-32 md:w-48">
               <img src={logoOmerhsaUrl.src} alt="OMERHSA" className="w-full h-auto object-contain" />
            </div>

            {/* Separador (Línea vertical o X) */}
            <div className="h-16 w-[1px] bg-gray-300"></div>

            {/* Grupo Flores */}
            <div className="w-32 md:w-48">
               <img src={logoPartnerUrl.src} alt="Aliado Estratégico" className="w-full h-auto object-contain opacity-80" />
            </div>
          </div>

          {/* Barra de carga decorativa */}
          <div className="absolute bottom-20 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-omerhsa-primary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "linear" }}
            />
          </div>

          <p className="absolute bottom-12 text-xs text-gray-400 font-medium tracking-widest uppercase">
            Seguridad inteligente...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}