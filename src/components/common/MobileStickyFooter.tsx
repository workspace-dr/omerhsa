import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// IMPORTANTE: Asegúrate de que estas imágenes existan en tu carpeta de assets.
// Si los nombres son diferentes, ajústalos aquí.
import logoDavivienda from '../../assets/images/logos/ficohsa.png';
import logoAtlantida from '../../assets/images/logos/atlantida.png';
import logoMapfre from '../../assets/images/logos/ficohsa.png';
import logoFicohsa from '../../assets/images/logos/ficohsa.png';

const INSURERS = [
  {
    id: 'davivienda',
    name: 'Davivienda Seguros',
    logo: logoDavivienda,
    phone: '2275-1111',
  },
  {
    id: 'atlantida',
    name: 'Seguros Atlántida',
    logo: logoAtlantida,
    phone: '2216-0898',
  },
  {
    id: 'mapfre',
    name: 'Mapfre',
    logo: logoMapfre,
    phone: '2216-2550',
    whatsapp: '3301-0971',
  },
  {
    id: 'ficohsa',
    name: 'Ficohsa Seguros',
    logo: logoFicohsa,
    phone: '2280-2886',
    asterisk: '*2886'
  },
];

export default function MobileStickyFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInsurer, setSelectedInsurer] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setSelectedInsurer(null);
  };

  const handleInsurerClick = (id: string) => {
    setSelectedInsurer(selectedInsurer === id ? null : id);
  };

  return (
    <>
      {/* --- BACKDROP (FONDO DIFUMINADO) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* --- BARRA FLOTANTE UNIFICADA --- */}
      <div className="fixed bottom-6 left-4 right-4 z-[70] lg:hidden">
        
        {/* Contenedor Gris Unificado con Animación Sutil */}
        <div className="relative bg-gray-100 rounded-full p-1.5 shadow-2xl flex items-center gap-2 border border-gray-200">
          
          {/* Efecto de Resalte (Glow) */}
          <div className="absolute inset-0 rounded-full ring-2 ring-omerhsa-primary/30 animate-pulse pointer-events-none"></div>

          {/* Botón Home (Izquierda) */}
          <a 
            href="/" 
            className="flex-shrink-0 w-12 h-12 bg-white text-gray-600 rounded-full shadow-sm flex items-center justify-center active:scale-95 transition-transform z-10 border border-gray-200"
            aria-label="Ir a Inicio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </a>

          {/* Botón Desplegable (Derecha - Botón Largo tipo Bootstrap) */}
          <button
            onClick={toggleMenu}
            className="flex-grow bg-gray-900 text-white font-bold text-sm uppercase tracking-wide rounded-full py-3.5 shadow-md active:scale-95 active:bg-omerhsa-primary transition-all z-10 flex items-center justify-center hover:bg-gray-800"
          >
            Asistencia Vehicular
          </button>
        </div>
      </div>

      {/* --- MENU DESPLEGABLE (BOTTOM SHEET) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 left-4 right-4 z-[70] bg-white rounded-3xl shadow-2xl overflow-hidden lg:hidden border border-gray-100"
          >
            <div className="p-5 bg-gray-50 border-b border-gray-100 text-center">
              <h3 className="font-bold text-gray-900 text-lg">Selecciona tu Aseguradora</h3>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-2">
              {INSURERS.map((insurer) => (
                <div key={insurer.id} className="overflow-hidden bg-white border border-gray-100 rounded-2xl">
                  {/* Cabecera del Acordeón */}
                  <button
                    onClick={() => handleInsurerClick(insurer.id)}
                    className={`w-full flex items-center justify-between p-4 transition-all duration-300 ${
                      selectedInsurer === insurer.id 
                        ? 'bg-gray-50' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Logo Real */}
                      <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 p-1 flex items-center justify-center shadow-sm">
                        <img 
                          src={insurer.logo.src} 
                          alt={insurer.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="font-bold text-gray-800 text-lg">{insurer.name}</span>
                    </div>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${selectedInsurer === insurer.id ? 'rotate-180 text-omerhsa-primary' : ''}`} 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Panel de Botones */}
                  <AnimatePresence>
                    {selectedInsurer === insurer.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className={`p-3 grid gap-3 border-t border-gray-100 ${
                          (insurer.whatsapp || insurer.asterisk) ? 'grid-cols-2' : 'grid-cols-1'
                        }`}>
                          
                          {/* Botón Llamar */}
                          <a 
                            href={`tel:${insurer.phone}`} 
                            className="bg-gray-900 text-white py-4 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition shadow-md col-span-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stro ke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-xs font-bold uppercase tracking-wider opacity-80">Llamar</span>
                            <span className="text-lg font-bold">{insurer.phone}</span>
                          </a>

                          {/* Botón WhatsApp */}
                          {insurer.whatsapp && (
                            <a 
                              href={`https://wa.me/504${insurer.whatsapp}`} 
                              target="_blank"
                              className="bg-[#25D366] text-white py-4 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition shadow-md col-span-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                              <span className="text-xs font-bold uppercase tracking-wider opacity-90">WhatsApp</span>
                              <span className="text-lg font-bold">{insurer.whatsapp}</span>
                            </a>
                          )}

                          {/* Botón Móvil (Asterisco) */}
                          {insurer.asterisk && (
                            <a 
                              href={`tel:${insurer.asterisk.replace('*', '')}`} 
                              className="bg-blue-600 text-white py-4 rounded-xl flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition shadow-md col-span-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <span className="text-xs font-bold uppercase tracking-wider opacity-90">Móvil</span>
                              <span className="text-lg font-bold">{insurer.asterisk}</span>
                            </a>
                          )}
                          
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}