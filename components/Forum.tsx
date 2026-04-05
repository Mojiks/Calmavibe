import React, { useState, useEffect } from "react";

interface UserProfile {
  fullName: string;
  photoUrl: string;
  mood: string;
}

interface Comment {
  id: number;
  text: string;
  author: UserProfile;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: UserProfile;
  comments: Comment[];
}

interface Props {
  userProfile: UserProfile;
}

const Forum: React.FC<Props> = ({ userProfile }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // cargar posts
  useEffect(() => {
    const saved = localStorage.getItem("forumPosts");
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  // guardar posts
  useEffect(() => {
    localStorage.setItem("forumPosts", JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (!title.trim() || !content.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      author: userProfile,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
  };

  const handleComment = (postId: number, text: string) => {
    if (!text.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now(),
          text,
          author: userProfile
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-3xl mx-auto text-white space-y-6">

      <h2 className="text-2xl font-bold">Comunidad</h2>

      {/* CREAR POST */}
      <div className="bg-white/10 p-4 rounded-xl space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="w-full p-2 rounded bg-black/20"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Comparte tu experiencia..."
          className="w-full p-2 rounded bg-black/20"
        />

        <button
          onClick={handlePost}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          Publicar
        </button>
      </div>

      {/* POSTS */}
      {posts.map(post => (
        <div key={post.id} className="bg-white/10 p-4 rounded-xl space-y-4">

          {/* AUTOR */}
          <div className="flex items-center gap-3">
            <img
              src={post.author.photoUrl || "https://via.placeholder.com/40"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">
                {post.author.fullName || "Usuario"}
              </p>
              <p className="text-xs opacity-70">
                {post.author.mood || "Sin estado"}
              </p>
            </div>
          </div>

          {/* CONTENIDO */}
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p className="opacity-90">{post.content}</p>

          {/* COMENTARIOS */}
          <div className="space-y-3">
            {post.comments.map(c => (
              <div key={c.id} className="flex gap-3 items-start">

                <img
                  src={c.author.photoUrl || "https://via.placeholder.com/30"}
                  className="w-8 h-8 rounded-full"
                />

                <div className="bg-black/30 p-2 rounded-lg w-full">
                  <p className="text-sm font-semibold">
                    {c.author.fullName || "Usuario"}
                  </p>
                  <p className="text-xs opacity-70 mb-1">
                    {c.author.mood || "Sin estado"}
                  </p>
                  <p className="text-sm">{c.text}</p>
                </div>

              </div>
            ))}
          </div>

          {/* INPUT COMENTARIO */}
          <CommentBox onSend={(text) => handleComment(post.id, text)} />

        </div>
      ))}

    </div>
  );
};

// COMPONENTE COMENTARIO
const CommentBox = ({ onSend }: { onSend: (text: string) => void }) => {
  const [text, setText] = useState("");

  return (
    <div className="flex gap-2 mt-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un comentario..."
        className="flex-1 p-2 rounded bg-black/20"
      />
      <button
        onClick={() => {
          onSend(text);
          setText("");
        }}
        className="bg-green-500 px-3 rounded"
      >
        Enviar
      </button>
    </div>
  );
};

export default Forum;