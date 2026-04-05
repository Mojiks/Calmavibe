export interface UserProfile {
  name: string;
  avatar: string;
  mood: string;
  instagram?: string;
  twitter?: string;
}

const STORAGE_KEY = "calmavibe_user";

export const getUser = (): UserProfile => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {
    name: "Usuario",
    avatar: "",
    mood: "Neutral"
  };
};

export const saveUser = (user: UserProfile) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};