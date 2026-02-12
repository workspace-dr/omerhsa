import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  author?: string;
  pdfUrl?: string;
  type: 'blog' | 'academic';
}

interface Props {
  items: ContentItem[];
  categories: string[];
  title: string;
  subtitle: string;
}

export default function ContentFilter({ items, categories, title, subtitle }: Props) {
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');

  // El post más reciente es el primero de la lista (asumiendo que vienen ordenados por fecha)
  const recentPost = items[0];

  // Filtramos la lista principal
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = filter === 'Todos' || item.category === filter;
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                            item.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, filter, search]);

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header simple */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-500">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- COLUMNA LATERAL (SIDEBAR) --- 
              Ocupa 4 de 12 columnas en escritorio, orden 2 en móvil (abajo) o 1 (arriba) según prefieras.
              Aquí lo pondremos primero en móvil para filtrar rápido, o puedes usar 'lg:order-last' para que en desktop salga a la derecha.
          */}
          <aside className="lg:col-span-4 space-y-8 sticky top-24">
            
            {/* 1. Widget de Búsqueda */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Buscar</h3>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Palabras clave..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-omerhsa-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* 2. Widget de Categorías */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Categorías</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('Todos')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all w-full text-left flex justify-between items-center ${
                    filter === 'Todos' ? 'bg-omerhsa-primary text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>Ver Todos</span>
                  <span className="opacity-60 text-xs">{items.length}</span>
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all w-full text-left flex justify-between items-center ${
                      filter === cat ? 'bg-omerhsa-primary text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Widget "Más Reciente" (Destacado Lateral) */}
            {recentPost && (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Más Reciente
                </h3>
                <div className="rounded-xl overflow-hidden mb-4 relative h-40">
                  {recentPost.image ? (
                     <img src={recentPost.image} alt={recentPost.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  ) : (
                     <div className="w-full h-full bg-omerhsa-light flex items-center justify-center text-omerhsa-primary text-3xl">📄</div>
                  )}
                </div>
                <div className="text-xs text-omerhsa-primary font-bold uppercase mb-2">{recentPost.category}</div>
                <a href={recentPost.type === 'blog' ? `/blog/${recentPost.slug}` : `/academic/${recentPost.slug}`} className="block">
                  <h4 className="font-bold text-gray-900 leading-snug hover:text-omerhsa-primary transition-colors">
                    {recentPost.title}
                  </h4>
                </a>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{recentPost.excerpt}</p>
              </div>
            )}

          </aside>

          {/* --- COLUMNA PRINCIPAL (GRID RESULTADOS) --- 
              Ocupa 8 de 12 columnas.
          */}
          <div className="lg:col-span-8">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.article
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={item.slug}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                  >
                    {item.type === 'blog' ? (
                      // --- TARJETA BLOG ---
                      <>
                        <div className="h-48 overflow-hidden relative">
                           {item.image && (
                             <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                           )}
                           <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold uppercase text-omerhsa-primary">
                             {item.category}
                           </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="text-gray-400 text-xs mb-2">{item.date}</div>
                          <h2 className="text-lg font-bold text-gray-900 mb-3 hover:text-omerhsa-primary transition-colors leading-tight">
                            <a href={`/blog/${item.slug}`} className="block">
                                {item.title}
                            </a>
                          </h2>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{item.excerpt}</p>
                          <a href={`/blog/${item.slug}`} className="text-omerhsa-primary font-bold text-sm inline-flex items-center mt-auto">
                            Leer más <span className="ml-1">&rarr;</span>
                          </a>
                        </div>
                      </>
                    ) : (
                      // --- TARJETA ACADÉMICO ---
                      <div className="p-6 flex flex-col h-full relative border-t-4 border-omerhsa-primary">
                        <div className="mb-4">
                          <span className="inline-block bg-blue-50 text-blue-800 text-xs font-bold px-2 py-1 rounded-md mb-2">{item.category}</span>
                          <div className="text-gray-400 text-xs">{item.date} • {item.author}</div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-omerhsa-primary transition-colors">
                           <a href={`/academic/${item.slug}`} className="block">
                                {item.title}
                            </a>
                        </h2>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow italic bg-gray-50 p-3 rounded-lg">
                          "{item.excerpt}"
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                           <a href={`/academic/${item.slug}`} className="text-omerhsa-primary font-bold text-sm">Ver Estudio</a>
                           {item.pdfUrl && <span className="text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded">PDF</span>}
                        </div>
                      </div>
                    )}
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <div className="text-4xl mb-4">😕</div>
                <p className="text-gray-500 font-medium">No encontramos resultados para "{search}"</p>
                <button 
                  onClick={() => {setFilter('Todos'); setSearch('')}} 
                  className="mt-4 text-omerhsa-primary font-bold hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}