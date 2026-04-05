import React, { useState, useEffect, useRef } from 'react';
import { ForumPost, ForumComment, UserProfile } from '../types';
import { geminiService } from '../services/gemini';

interface ForumProps {
  userProfile: UserProfile;
}

const bannedWords = ["suicidio", "matar", "odio", "idiota", "estupido", "imbecil"];

const containsBannedWords = (text: string) => {
  return bannedWords.some(word => text.toLowerCase().includes(word));
};

const Forum: React.FC<ForumProps> = ({ userProfile }) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModerating, setIsModerating] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('posts');
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  const savePosts = (data: ForumPost[]) => {
    setPosts(data);
    localStorage.setItem('posts', JSON.stringify(data));
  };

  // ✅ POST
  const handleAddPost = async () => {
    if (!newTitle || !newContent) return;

    if (containsBannedWords(newTitle + " " + newContent)) {
      alert("Contenido no permitido.");
      return;
    }

    setIsModerating(true);

    const moderation = await geminiService.moderateText(newTitle + " " + newContent);

    if (!moderation.allowed) {
      alert("Publicación bloqueada.");
      setIsModerating(false);
      return;
    }

    const post: ForumPost = {
      id: Date.now().toString(),
      author: userProfile.fullName,
      authorPhoto: userProfile.photoUrl,
      date: 'Ahora',
      title: newTitle,
      content: newContent,
      likes: 0,
      category: 'General'
    };

    savePosts([post, ...posts]);

    setNewTitle('');
    setNewContent('');
    setIsModerating(false);
  };

  // ✅ COMMENT
  const handleAddComment = async (postId: string) => {
    if (!newComment) return;

    if (containsBannedWords(newComment)) {
      alert("Comentario no permitido.");
      return;
    }

    const moderation = await geminiService.moderateText(newComment);

    if (!moderation.allowed) {
      alert("Comentario bloqueado.");
      return;
    }

    const comment: ForumComment = {
      id: Date.now().toString(),
      postId,
      author: userProfile.fullName,
      date: 'Ahora',
      content: newComment
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">Foro</h2>

      <input
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        placeholder="Título"
        className="w-full mb-2 p-2 rounded bg-black/20"
      />

      <textarea
        value={newContent}
        onChange={e => setNewContent(e.target.value)}
        placeholder="Contenido"
        className="w-full mb-2 p-2 rounded bg-black/20"
      />

      <button
        onClick={handleAddPost}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Publicar
      </button>

      <div className="mt-6 space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white/10 p-4 rounded">

            <h3 className="font-bold">{post.title}</h3>
            <p>{post.content}</p>

            <input
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Comentar..."
              className="w-full mt-2 p-2 rounded bg-black/20"
            />

            <button
              onClick={() => handleAddComment(post.id)}
              className="mt-2 bg-green-500 px-3 py-1 rounded"
            >
              Comentar
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Forum;