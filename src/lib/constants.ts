import logoOmerhsa from '../assets/images/logos/omerhsa.png';

export const SITE_CONFIG = {
  name: 'OMERHSA',
  description: 'Correduría de Seguros experta en protección patrimonial.',
  logo: logoOmerhsa, // Objeto de imagen procesado por Astro/Vite
  contact: {
    phone: '+504 2222-0000',
    email: 'info@omerhsa.com',
    address: 'Tegucigalpa, Honduras'
  },
  social: {
    facebook: '#',
    linkedin: '#',
    instagram: '#'
  }
};

export const NAV_LINKS = [
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Seguros', href: '/seguros' },
  { name: 'Reclamos', href: '/reclamos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contacto', href: '/contacto' },
];