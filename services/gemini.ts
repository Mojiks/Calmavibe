export class GeminiService {
  async moderateImage() {
    return { allowed: true };
  }

  async moderateText() {
    return { allowed: true };
  }

  async getChatResponse(message: string) {
    return "Estoy aquí para escucharte. Cuéntame más.";
  }

  async generateSpeech() {
    return null;
  }

  async searchNearbyPlaces() {
    return { text: "Función no disponible por ahora.", groundingChunks: [] };
  }
}

export const geminiService = new GeminiService();