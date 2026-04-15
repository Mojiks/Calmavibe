import { useState } from "react";

type Book = {
  title: string;
  author: string;
  url: string;
};

const books: Book[] = [
  {
    title: "Meditaciones",
    author: "Marco Aurelio",
    url: "https://archive.org/embed/las-meditaciones.-marco-aurelio/mode/2up",
  },
  {
    title: "El Profeta",
    author: "Khalil Gibran",
    url: "https://archive.org/embed/elprofeta0000khal",
  },
  {
    title: "Tao Te Ching",
    author: "Lao Tse",
    url: "https://archive.org/embed/tao-te-ching-lao-tse",
  },
  {
    title: "Walden",
    author: "Henry David Thoreau",
    url: "https://archive.org/embed/henry-david-thoreau_walden",
  },
  {
    title: "Cartas a Lucilio",
    author: "Séneca",
    url: "https://archive.org/embed/seneca.-cartas-a-lucilio-2018",
  },
  {
    title: "Reflexiones de Vida",
    author: "Dominio Público",
    url: "https://archive.org/embed/bwb_T5-CWM-574",
  },
];

export default function Books() {
  const [selected, setSelected] = useState<Book | null>(null);

  return (
    <div
      className="min-h-screen text-white p-6"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl mb-6 text-center">
        Biblioteca 
      </h1>

      {!selected && (
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {books.map((book, i) => (
            <button
              key={i}
              onClick={() => setSelected(book)}
              className="bg-black/50 backdrop-blur-md p-4 rounded-xl text-left hover:bg-black/70 transition"
            >
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm opacity-70">{book.author}</p>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setSelected(null)}
            className="mb-4 bg-white text-black px-4 py-2 rounded"
          >
            ← Volver
          </button>

          <h2 className="text-xl mb-2">{selected.title}</h2>
          <p className="mb-4 opacity-70">{selected.author}</p>

          <div className="w-full h-[80vh] rounded overflow-hidden">
            <iframe
              src={selected.url}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}