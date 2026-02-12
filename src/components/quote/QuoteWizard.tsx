import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Tipos de Datos (Salesforce Schema Ready) ---
type InsuranceType = 'auto' | 'medico' | 'vida' | 'empresa';

interface FormData {
  insuranceType: InsuranceType | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string; // Departamento/Ciudad
  // Datos Vehículo (Específico Auto)
  vehicleValue: string;
  vehicleYear: string;
  vehicleModel: string;
  ownerGender: string;
  // Datos Extras
  comments: string;
}

const initialData: FormData = {
  insuranceType: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: 'Tegucigalpa',
  vehicleValue: '',
  vehicleYear: '',
  vehicleModel: '',
  ownerGender: '',
  comments: ''
};

// --- Componentes UI Internos (Inputs, Botones) ---
function InputGroup({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      {children}
    </div>
  );
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input 
      className={twMerge("w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-omerhsa-primary focus:ring-2 focus:ring-omerhsa-primary/20 outline-none transition-all bg-gray-50 focus:bg-white", className)}
      {...props}
    />
  );
}

function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select 
      className={twMerge("w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-omerhsa-primary focus:ring-2 focus:ring-omerhsa-primary/20 outline-none transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer", className)}
      {...props}
    >
      {children}
    </select>
  );
}

// --- Componente Principal ---
export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calcular progreso (1 de 3 pasos reales de data + selección)
  const totalSteps = 4; 
  const progress = (step / totalSteps) * 100;

  const updateField = (field: keyof FormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // SIMULACIÓN DE ENVÍO A SALESFORCE / STRAPI
    // Aquí iría: await fetch('/api/submit-quote', { method: 'POST', body: JSON.stringify(data) })
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      console.log("Payload enviado a Salesforce:", data);
    }, 2000);
  };

  // --- Renderizado de Pasos ---

  // Paso 1: Selección de Seguro
  const StepSelection = () => (
    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {[
        { id: 'auto', label: 'Seguro de Auto', icon: '🚗' },
        { id: 'medico', label: 'Gastos Médicos', icon: '🏥' },
        { id: 'vida', label: 'Seguro de Vida', icon: '🛡️' },
        { id: 'empresa', label: 'Incendio', icon: '🏢' },
      ].map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => {
            updateField('insuranceType', type.id as InsuranceType);
            handleNext();
          }}
          className={clsx(
            "p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105",
            data.insuranceType === type.id 
              ? "border-omerhsa-primary bg-omerhsa-primary/5 shadow-md" 
              : "border-gray-100 bg-white hover:border-omerhsa-primary/50 hover:shadow-lg"
          )}
        >
          <span className="text-3xl mb-2 block">{type.icon}</span>
          <span className="font-bold text-gray-900">{type.label}</span>
        </button>
      ))}
    </div>
  );

  // Paso 2: Información Personal (DNI, Contacto)
  const StepPersonal = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="grid grid-cols-2 gap-4">
        <InputGroup label="Nombre">
          <Input placeholder="Ej. Juan" value={data.firstName} onChange={e => updateField('firstName', e.target.value)} />
        </InputGroup>
        <InputGroup label="Apellido">
          <Input placeholder="Ej. Pérez" value={data.lastName} onChange={e => updateField('lastName', e.target.value)} />
        </InputGroup>
      </div>
      
      <InputGroup label="Correo Electrónico">
        <Input type="email" placeholder="ejemplo@correo.com" value={data.email} onChange={e => updateField('email', e.target.value)} />
      </InputGroup>

      <div className="grid grid-cols-2 gap-4">
        <InputGroup label="Teléfono / Celular">
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-gray-500">+504</span>
            <Input className="pl-16" placeholder="0000-0000" value={data.phone} onChange={e => updateField('phone', e.target.value)} />
          </div>
        </InputGroup>
        <InputGroup label="Ubicación">
          <Select value={data.location} onChange={e => updateField('location', e.target.value)}>
            <option value="Tegucigalpa">Tegucigalpa</option>
            <option value="San Pedro Sula">San Pedro Sula</option>
            <option value="La Ceiba">La Ceiba</option>
            <option value="Otro">Otro / Departamental</option>
          </Select>
        </InputGroup>
      </div>
    </div>
  );

  // Paso 3: Detalles Específicos (Dinámico según Tipo)
  const StepDetails = () => {
    if (data.insuranceType === 'auto') {
      return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
          <InputGroup label="Marca y Modelo">
            <Input placeholder="Ej. Toyota Hilux" value={data.vehicleModel} onChange={e => updateField('vehicleModel', e.target.value)} />
          </InputGroup>
          
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Año del Vehículo">
              <Input type="number" placeholder="2024" value={data.vehicleYear} onChange={e => updateField('vehicleYear', e.target.value)} />
            </InputGroup>
            <InputGroup label="Valor Estimado (Lps)">
              <Input type="number" placeholder="L. 0.00" value={data.vehicleValue} onChange={e => updateField('vehicleValue', e.target.value)} />
            </InputGroup>
          </div>

          <InputGroup label="Sexo del Propietario (Análisis de Riesgo)">
            <Select value={data.ownerGender} onChange={e => updateField('ownerGender', e.target.value)}>
              <option value="">Seleccione...</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="Juridico">Persona Jurídica (Empresa)</option>
            </Select>
          </InputGroup>
        </div>
      );
    }
    
    // Fallback para otros seguros (simplificado para el ejemplo)
    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
        <InputGroup label="Comentarios Adicionales o Necesidades">
          <textarea 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-omerhsa-primary focus:ring-2 outline-none bg-gray-50 min-h-[150px]"
            placeholder="Describe qué necesitas asegurar..."
            value={data.comments}
            onChange={e => updateField('comments', e.target.value)}
          />
        </InputGroup>
      </div>
    );
  };

  // UI del Modal de Éxito
  if (showSuccess) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-lg mx-auto border border-gray-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-4xl animate-bounce">
          ✓
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Solicitud Recibida!</h2>
        <p className="text-gray-600 mb-8">
          Gracias <strong>{data.firstName}</strong>. Un asesor experto de OMERHSA analizará tu caso y te contactará al <strong>{data.phone}</strong> en menos de 2 horas laborables con las mejores opciones del mercado.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-omerhsa-primary transition-colors"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  // UI Principal del Wizard
  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
      {/* Header / Progress Bar */}
      <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-omerhsa-primary font-bold text-xs tracking-wider uppercase">Paso {step} de {totalSteps}</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              {step === 1 && "Elige tu Protección"}
              {step === 2 && "Datos de Contacto"}
              {step === 3 && "Detalles del Riesgo"}
              {step === 4 && "Confirmación"}
            </h2>
          </div>
          <span className="font-bold text-gray-400 text-sm">{Math.round(progress)}%</span>
        </div>
        
        {/* Barra de Progreso */}
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-omerhsa-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Cuerpo del Formulario */}
      <div className="p-8 md:p-10 flex-grow flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="h-full">
          <AnimatePresence mode="wait">
            {step === 1 && <motion.div key="step1" exit={{ opacity: 0, x: -20 }}><StepSelection /></motion.div>}
            {step === 2 && <motion.div key="step2" exit={{ opacity: 0, x: -20 }}><StepPersonal /></motion.div>}
            {step === 3 && <motion.div key="step3" exit={{ opacity: 0, x: -20 }}><StepDetails /></motion.div>}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">¿Todo correcto?</h3>
                <p className="text-gray-500 mb-8">Revisa tus datos antes de enviar la solicitud a nuestros asesores.</p>
                <div className="bg-gray-50 p-6 rounded-2xl text-left text-sm space-y-3 mb-8 border border-gray-200">
                  <p><span className="font-bold text-gray-700">Seguro:</span> {data.insuranceType?.toUpperCase()}</p>
                  <p><span className="font-bold text-gray-700">Cliente:</span> {data.firstName} {data.lastName}</p>
                  <p><span className="font-bold text-gray-700">Contacto:</span> {data.email} | {data.phone}</p>
                  {data.insuranceType === 'auto' && (
                    <p><span className="font-bold text-gray-700">Vehículo:</span> {data.vehicleModel} ({data.vehicleYear})</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Footer / Botones de Navegación */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        {step > 1 ? (
          <button 
            onClick={handleBack}
            className="text-gray-500 font-bold hover:text-gray-900 transition-colors px-4 py-2"
          >
            ← Atrás
          </button>
        ) : (
          <div></div> // Spacer
        )}

        {step < totalSteps ? (
           // Botón Siguiente (oculto en paso 1 porque los botones de selección hacen de trigger)
           step !== 1 && (
            <button 
              onClick={handleNext}
              className="bg-omerhsa-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-omerhsa-dark transition-all shadow-lg hover:shadow-omerhsa-primary/40 flex items-center gap-2"
            >
              Siguiente Paso →
            </button>
           )
        ) : (
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gray-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>Enviando... <span className="animate-spin">⏳</span></>
            ) : (
              "Solicitar Cotización"
            )}
          </button>
        )}
      </div>
    </div>
  );
}