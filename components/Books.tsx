import React, { useState } from 'react';

type Book = {
  id: string;
  title: string;
  author: string;
  url: string;
};

const Books: React.FC = () => {
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  const books: Book[] = [
    {
      id: '1',
      title: 'Meditaciones',
      author: 'Marco Aurelio',
      url: 'https://archive.org/embed/las-meditaciones.-marco-aurelio/mode/2up'
    },
    {
      id: '2',
      title: 'El Profeta',
      author: 'Khalil Gibran',
      url: 'https://archive.org/embed/elprofeta0000khal'
    },
    {
      id: '3',
      title: 'Tao Te Ching',
      author: 'Lao Tse',
      url: 'https://archive.org/embed/tao-te-ching-lao-tse'
    },
    {
      id: '4',
      title: 'Walden',
      author: 'Henry David Thoreau',
      url: 'https://archive.org/embed/henry-david-thoreau_walden'
    },
    {
      id: '5',
      title: 'Cartas a Lucilio',
      author: 'Séneca',
      url: 'https://archive.org/embed/seneca.-cartas-a-lucilio-2018'
    },
    {
      id: '6',
      title: 'Reflexiones de Vida',
      author: 'Dominio Público',
      url: 'https://archive.org/embed/bwb_T5-CWM-574'
    }
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">

      {!activeBook && (
        <>
          <h2 className="text-3xl font-bold mb-6">Biblioteca de Bienestar</h2>

          <p className="mb-8 opacity-70">
            Libros de dominio público enfocados en reflexión, calma mental y crecimiento personal.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {books.map(book => (
              <div
                key={book.id}
                onClick={() => setActiveBook(book)}
                className="p-6 rounded-xl border border-white/10 cursor-pointer hover:bg-white/5 transition"
              >
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="opacity-60">{book.author}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {activeBook && (
        <div>

          <button
            onClick={() => setActiveBook(null)}
            className="mb-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            ← Volver
          </button>

          <h2 className="text-2xl font-bold mb-4">
            {activeBook.title}
          </h2>

          <div className="rounded-xl overflow-hidden border border-white/10">
            <iframe
              src={activeBook.url}
              width="100%"
              height="600px"
              allowFullScreen
            />
          </div>

        </div>
      )}

    </div>
  );
};

export default Books;