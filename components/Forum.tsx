
import React, { useState, useEffect, useRef } from 'react';
import { ForumPost, ForumComment, UserProfile } from '../types';
import { geminiService } from '../services/gemini';

interface ForumProps {
  userProfile: UserProfile;
}

const CATEGORIES = ['General', 'Ansiedad', 'Logros', 'Consejos', 'Depresión'];

const Forum: React.FC<ForumProps> = ({ userProfile }) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModerating, setIsModerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedPosts = localStorage.getItem('calmavibe_forum_posts');
    const savedComments = localStorage.getItem('calmavibe_forum_comments');
    
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Posts iniciales de ejemplo
      const initialPosts: ForumPost[] = [
        {
          id: '1',
          author: 'Sofía',
          authorPhoto: 'https://picsum.photos/seed/sofia/100/100',
          date: 'Hoy',
          title: 'Hoy logré salir a caminar',
          content: 'Llevaba tres días sin fuerzas, pero hoy pude dar una vuelta de 10 minutos. Me siento orgullosa.',
          likes: 12,
          category: 'Logros'
        },
        {
          id: '2',
          author: 'Carlos',
          authorPhoto: 'https://picsum.photos/seed/carlos/100/100',
          date: 'Ayer',
          title: 'Consejo para respirar',
          content: 'Cuando siento que el pecho se cierra, uso la técnica 4-7-8. Realmente me ayuda a bajar las pulsaciones.',
          likes: 24,
          category: 'Consejos'
        }
      ];
      setPosts(initialPosts);
      localStorage.setItem('calmavibe_forum_posts', JSON.stringify(initialPosts));
    }
    
    if (savedComments) setComments(JSON.parse(savedComments));
  }, []);

  const savePosts = (updated: ForumPost[]) => {
    setPosts(updated);
    localStorage.setItem('calmavibe_forum_posts', JSON.stringify(updated));
  };

  const saveComments = (updated: ForumComment[]) => {
    setComments(updated);
    localStorage.setItem('calmavibe_forum_comments', JSON.stringify(updated));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPost = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    setIsModerating(true);

    // Moderación de Texto
    try {
      const textModeration = await geminiService.moderateText(`${newTitle} ${newContent}`);
      if (!textModeration.allowed) {
        alert(`Tu publicación ha sido rechazada por nuestro moderador de IA: ${textModeration.reason}`);
        setIsModerating(false);
        return;
      }
    } catch (error) {
      console.error("Text moderation error:", error);
    }

    let imageUrl = selectedImage;

    if (selectedImage) {
      try {
        const base64Data = selectedImage.split(',')[1];
        const mimeType = selectedImage.split(';')[0].split(':')[1];
        const moderation = await geminiService.moderateImage(base64Data, mimeType);

        if (!moderation.allowed) {
          alert(`Lo sentimos, tu imagen ha sido rechazada: ${moderation.reason}. Recuerda que solo permitimos contenido positivo y seguro.`);
          setIsModerating(false);
          return;
        }
      } catch (error) {
        console.error("Image moderation error:", error);
        alert("Hubo un error al validar tu imagen. Por favor, inténtalo de nuevo.");
        setIsModerating(false);
        return;
      }
    }

    const post: ForumPost = {
      id: Date.now().toString(),
      author: userProfile.fullName,
      authorPhoto: userProfile.photoUrl,
      date: 'Recién',
      title: newTitle,
      content: newContent,
      likes: 0,
      category: selectedCategory,
      image: imageUrl || undefined
    };
    savePosts([post, ...posts]);
    setNewTitle('');
    setNewContent('');
    setSelectedImage(null);
    setIsAdding(false);
    setIsModerating(false);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    savePosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleAddComment = async (postId: string) => {
    if (!newComment.trim() || isModerating) return;
    
    setIsModerating(true);
    try {
      const moderation = await geminiService.moderateText(newComment);
      if (!moderation.allowed) {
        alert(`Tu comentario ha sido rechazado por nuestro moderador de IA: ${moderation.reason}`);
        setIsModerating(false);
        return;
      }
    } catch (error) {
      console.error("Comment moderation error:", error);
    }

    const comment: ForumComment = {
      id: Date.now().toString(),
      postId,
      author: userProfile.fullName,
      date: 'Ahora',
      content: newComment
    };
    saveComments([...comments, comment]);
    setNewComment('');
    setIsModerating(false);
  };

  const filteredPosts = filterCategory === 'Todas' 
    ? posts 
    : posts.filter(p => p.category === filterCategory);

  return (
    <div className="glass-effect rounded-3xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto animate-fade-in min-h-[70vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Comunidad Calma</h2>
          <p className="text-sm opacity-70 italic">Un lugar seguro para compartir y sanar juntos.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-white text-blue-700 px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-all"
          >
            + Compartir Experiencia
          </button>
        )}
      </div>

      <div className="mb-8 flex overflow-x-auto no-scrollbar gap-2 pb-2">
        <button 
          onClick={() => setFilterCategory('Todas')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            filterCategory === 'Todas' ? 'bg-white text-blue-700' : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          Todas
        </button>
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              filterCategory === cat ? 'bg-white text-blue-700' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isAdding ? (
        <div className="bg-white/20 p-6 rounded-2xl animate-fade-in space-y-4">
          <div className="flex gap-2 mb-2">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] px-3 py-1 rounded-full border transition-all ${
                  selectedCategory === cat ? 'bg-blue-400 border-white' : 'bg-transparent border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input 
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Título de tu historia..."
            className="w-full bg-transparent border-b border-white/30 text-xl font-bold py-2 outline-none placeholder:text-white/40"
          />
          <textarea 
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="¿Qué te gustaría compartir con la comunidad?"
            className="w-full bg-transparent h-40 outline-none resize-none leading-relaxed placeholder:text-white/40"
          />
          
          <div className="space-y-2">
            <label className="text-xs opacity-60 block">Compartir una foto (Opcional - Solo contenido positivo)</label>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm transition-all flex items-center gap-2"
              >
                📷 {selectedImage ? 'Cambiar Foto' : 'Subir Foto'}
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {selectedImage && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20">
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-0 right-0 bg-red-500 text-white text-[8px] p-1 rounded-bl-lg"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 opacity-70" disabled={isModerating}>Cancelar</button>
            <button 
              onClick={handleAddPost} 
              disabled={isModerating}
              className="bg-blue-500 px-8 py-2 rounded-xl font-bold shadow-md hover:bg-blue-600 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isModerating ? (
                <>
                  <span className="animate-spin">⏳</span> Moderando...
                </>
              ) : 'Publicar'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center opacity-60">
              <span className="text-5xl mb-4 block">🍃</span>
              <p>Aún no hay historias en esta categoría. <br/> ¡Sé el primero en compartir!</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white/10 rounded-2xl p-5 hover:bg-white/15 transition-all cursor-pointer border border-white/5"
                onClick={() => setActivePostId(activePostId === post.id ? null : post.id)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={post.authorPhoto} alt={post.author} className="w-8 h-8 rounded-full border border-white/20" />
                  <div>
                    <h4 className="text-sm font-bold">{post.author}</h4>
                    <span className="text-[10px] opacity-60 uppercase">{post.date} • {post.category}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed mb-4">{post.content}</p>
                
                {post.image && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-white/10 max-h-80">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="flex items-center gap-6 text-xs font-semibold">
                  <button 
                    onClick={(e) => handleLike(post.id, e)}
                    className="flex items-center gap-1.5 hover:text-blue-200 transition-colors"
                  >
                    ❤️ {post.likes}
                  </button>
                  <div className="flex items-center gap-1.5 opacity-70">
                    💬 {comments.filter(c => c.postId === post.id).length} comentarios
                  </div>
                </div>

                {activePostId === post.id && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4 animate-fade-in" onClick={e => e.stopPropagation()}>
                    <div className="space-y-3">
                      {comments.filter(c => c.postId === post.id).map(comment => (
                        <div key={comment.id} className="bg-black/10 p-3 rounded-xl">
                          <div className="flex justify-between text-[10px] opacity-60 mb-1">
                            <span className="font-bold">{comment.author}</span>
                            <span>{comment.date}</span>
                          </div>
                          <p className="text-xs">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe un comentario de apoyo..."
                        className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs outline-none"
                      />
                      <button 
                        onClick={() => handleAddComment(post.id)}
                        className="bg-blue-500 p-2 rounded-full text-sm"
                      >
                        ➔
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Forum;
