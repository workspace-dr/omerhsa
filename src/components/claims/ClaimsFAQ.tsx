import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: "¿Cuánto tiempo tengo para presentar un reclamo?", a: "Generalmente, el plazo estipulado por las aseguradoras es de 3 a 5 días hábiles después de ocurrido el siniestro. Recomendamos hacerlo de inmediato." },
  { q: "¿Qué documentos necesito para un reclamo de auto?", a: "Necesitarás: Licencia de conducir vigente, boleta de revisión del vehículo, parte policial (si aplica) y fotos de los daños." },
  { q: "¿Debo pagar un deducible?", a: "Sí, la mayoría de las pólizas de daños tienen un deducible estipulado en la carátula de tu póliza. Este monto corre por cuenta del asegurado." },
  { q: "¿Cómo sé el estado de mi reclamo?", a: "Puedes contactar a nuestro departamento de reclamos al +504 2222-0000 o escribirnos a reclamos@omerhsa.com con tu número de póliza." },
];

export default function ClaimsFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
            >
              <span className="font-bold text-gray-800">{faq.q}</span>
              <span className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''} text-omerhsa-primary`}>
                ▼
              </span>
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4 bg-gray-50 text-gray-600 text-sm"
                >
                  <div className="pt-2 border-t border-gray-100">{faq.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}