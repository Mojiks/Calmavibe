export class GeminiService {

  async moderateText(text: string) {
    // Moderación básica local (puedes mejorar después)
    const bannedWords = ["suicidio", "matar", "odio", "idiota", "estupido", "imbecil"];

    const found = bannedWords.find(word => text.toLowerCase().includes(word));

    if (found) {
      return {
        allowed: false,
        reason: "Contenido inapropiado detectado"
      };
    }

    return { allowed: true };
  }

  async moderateImage(base64: string, mimeType: string) {
    // Por ahora TODO permitido (puedes mejorar después)
    return { allowed: true };
  }

  async getChatResponse(message: string) {
    return "Estoy aquí para escucharte. Cuéntame más.";
  }

  async generateSpeech(text?: string, voice?: string) {
    return null;
  }

  async searchNearbyPlaces() {
    return { text: "Función no disponible por ahora.", groundingChunks: [] };
  }
}

export const geminiService = new GeminiService();