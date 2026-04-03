
import React, { useState } from 'react';
import { Book } from '../types';
import { X, ExternalLink, BookOpen } from 'lucide-react';

const Books: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const library: Book[] = [
    { 
      id: '1', 
      title: 'Meditaciones', 
      author: 'Marco Aurelio', 
      description: 'Reflexiones estoicas sobre la virtud, la brevedad de la vida y la importancia de mantener la calma interior frente a las adversidades.', 
      coverUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=300&h=450',
      readUrl: 'https://www.holybooks.com/wp-content/uploads/Meditations-by-Marcus-Aurelius.pdf'
    },
    { 
      id: '2', 
      title: 'Como un Hombre Piensa', 
      author: 'James Allen', 
      description: 'Un clásico de la literatura de autoayuda que explora cómo nuestros pensamientos moldean nuestro carácter y nuestras circunstancias.', 
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=450',
      readUrl: 'https://www.gutenberg.org/files/19069/19069-pdf.pdf'
    },
    { 
      id: '3', 
      title: 'Siddhartha', 
      author: 'Hermann Hesse', 
      description: 'Un viaje poético y espiritual que enseña el valor de la experiencia propia y la búsqueda de la paz interior.', 
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300&h=450',
      readUrl: 'https://www.gutenberg.org/files/2500/2500-pdf.pdf'
    },
    { 
      id: '4', 
      title: 'El Profeta', 
      author: 'Kahlil Gibran', 
      description: 'Poemas filosóficos que exploran los grandes temas de la vida con una sabiduría atemporal.', 
      coverUrl: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=300&h=450',
      readUrl: 'https://www.gutenberg.org/files/58585/58585-pdf.pdf'
    },
    { 
      id: '5', 
      title: 'Tao Te Ching', 
      author: 'Lao Tse', 
      description: 'Sabiduría sobre cómo vivir en armonía con el flujo natural del universo.', 
      coverUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=300&h=450',
      readUrl: 'https://www.gutenberg.org/files/216/216-pdf.pdf'
    }
  ];

  return (
    <div className="glass-effect rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-white/30 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-3 italic tracking-tight">Biblioteca de Apoyo</h2>
        <p className="text-lg opacity-80 font-light max-w-2xl">
          Acceso directo a libros de dominio público en formato PDF para nutrir tu mente y encontrar nuevas perspectivas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {library.map((book) => (
          <div 
            key={book.id} 
            className="group glass-effect rounded-[2rem] overflow-hidden border border-white/10 hover:border-white/30 transition-all flex flex-col shadow-xl"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h4 className="font-bold text-xl mb-1 leading-tight group-hover:text-blue-300 transition-colors">{book.title}</h4>
              <p className="text-xs opacity-60 uppercase tracking-widest font-bold mb-4">{book.author}</p>
              
              <p className="text-sm opacity-80 italic line-clamp-3 mb-6 flex-1">
                "{book.description}"
              </p>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedBook(book)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all text-xs"
                >
                  Detalles
                </button>
                {book.readUrl && (
                  <a 
                    href={book.readUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all text-xs text-center flex items-center justify-center gap-1"
                  >
                    <BookOpen size={14} />
                    Leer ahora
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalles */}
      {selectedBook && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white/10 glass-effect border border-white/20 rounded-[3rem] max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setSelectedBook(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col md:flex-row gap-8 p-8 md:p-12">
              <div className="w-full md:w-1/3 shrink-0">
                <img 
                  src={selectedBook.coverUrl} 
                  alt={selectedBook.title} 
                  className="w-full rounded-2xl shadow-2xl border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 mb-2">Lectura Recomendada</span>
                <h3 className="text-3xl font-bold mb-1 leading-tight">{selectedBook.title}</h3>
                <p className="text-sm opacity-60 uppercase tracking-widest font-bold mb-6">{selectedBook.author}</p>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
                  <p className="text-sm leading-relaxed italic opacity-90">
                    "{selectedBook.description}"
                  </p>
                </div>
                
                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  {selectedBook.readUrl && (
                    <a 
                      href={selectedBook.readUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-white text-blue-700 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-xl active:scale-95"
                    >
                      <BookOpen size={18} />
                      Leer en línea
                    </a>
                  )}
                  <button 
                    onClick={() => setSelectedBook(null)}
                    className="flex-1 bg-white/10 hover:bg-white/20 font-bold py-4 rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-16 p-8 bg-blue-500/10 rounded-[2rem] border border-white/10 flex flex-col md:flex-row items-center gap-6">
        <div className="text-5xl drop-shadow-lg">📖</div>
        <div>
          <h4 className="font-bold text-xl mb-1">El valor de la lectura</h4>
          <p className="text-sm opacity-80 leading-relaxed max-w-3xl">
            La biblioterapia es una herramienta poderosa. Leer sobre las experiencias de otros y aprender nuevas perspectivas clínicas puede ayudarte a normalizar lo que sientes y encontrar caminos de salida que otros ya han recorrido con éxito.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Books;
