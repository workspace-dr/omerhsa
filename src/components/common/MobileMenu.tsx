import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../lib/constants';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="lg:hidden">
      {/* Botón Hamburguesa */}
      <button
        onClick={toggleMenu}
        className="text-omerhsa-primary p-2 focus:outline-none z-50 relative"
        aria-label="Toggle Menu"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Menú Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 h-screen w-screen"
          >
            <nav className="flex flex-col space-y-6 text-center text-xl">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={toggleMenu}
                  className="text-gray-800 hover:text-omerhsa-primary font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-omerhsa-light my-4" />
              <a
                href="/cotizar"
                onClick={toggleMenu}
                className="bg-omerhsa-primary text-white py-3 px-6 rounded-lg font-bold shadow-md"
              >
                Cotizar Ahora
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}