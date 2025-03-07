import api from "./api";

export const chatbotService = {
  sendMessage: async (message) => {
    try {
      const response = await api.post("/chatbot/message", { message });
      return response.data;
    } catch (error) {
      console.error("Chatbot API error:", error);
      throw error;
    }
  },
};
