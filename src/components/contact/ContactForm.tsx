import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulación de envío
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 rounded-3xl p-8 md:p-12 text-center border border-green-100 h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4">✉️</div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">¡Mensaje Enviado!</h3>
        <p className="text-green-700">Gracias por escribirnos. Tu mensaje ha sido recibido y te responderemos a la brevedad posible.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-bold text-green-800 hover:underline">Enviar otro mensaje</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-gray-700">Nombre Completo</label>
            <input required type="text" id="name" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-omerhsa-primary focus:ring-2 focus:ring-omerhsa-primary/20 outline-none transition-all" placeholder="Juan Pérez" />
          </div>
          <div className="space-y-2">
             <label htmlFor="email" className="text-sm font-bold text-gray-700">Correo Electrónico</label>
             <input required type="email" id="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-omerhsa-primary focus:ring-2 focus:ring-omerhsa-primary/20 outline-none transition-all" placeholder="juan@ejemplo.com" />
          </div>
        </div>

        <div className="space-y-2">
           <label htmlFor="subject" className="text-sm font-bold text-gray-700">Asunto</label>
           <select id="subject" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-omerhsa-primary focus:ring-2 focus:ring-omerhsa-primary/20 outline-none transition-all cursor-pointer">
             <option>Consulta General</option>
             <option>Seguimiento de Reclamo</option>
             <option>Alianzas Corporativas</option>
             <option>Trabaja con Nosotros</option>
           </select>
        </div>

        <div className="space-y-2">
           <label htmlFor="message" className="text-sm font-bold text-gray-700">Mensaje</label>
           <textarea required id="message" rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-omerhsa-primary focus:ring-2 focus:ring-omerhsa-primary/20 outline-none transition-all resize-none" placeholder="¿Cómo podemos ayudarte?"></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full py-4 bg-omerhsa-primary hover:bg-omerhsa-dark text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
        >
          {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </div>
    </form>
  );
}