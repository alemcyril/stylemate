import React, { createContext, useContext, useState } from "react";
import { chatbotService } from "../services/chatbotService";

const ChatbotContext = createContext(null);

export const ChatbotProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm your AI Style Assistant. I can help you with:\n- Style recommendations\n- Outfit combinations\n- Weather-appropriate clothing\n- Wardrobe organization\n- Fashion trends\n\nHow can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const sendMessage = async (message) => {
    try {
      // Add user message immediately
      const userMessage = {
        type: "user",
        content: message,
        timestamp: new Date().toISOString(),
      };
      addMessage(userMessage);

      // Show typing indicator
      setIsTyping(true);

      // Send message to backend
      const response = await chatbotService.sendMessage(message);

      // Add bot response
      const botMessage = {
        type: "bot",
        content: response.message,
        timestamp: new Date().toISOString(),
      };
      addMessage(botMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      addMessage({
        type: "error",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsTyping(false);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        type: "bot",
        content:
          "Hello! I'm your AI Style Assistant. I can help you with:\n- Style recommendations\n- Outfit combinations\n- Weather-appropriate clothing\n- Wardrobe organization\n- Fashion trends\n\nHow can I help you today?",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const value = {
    messages,
    isOpen,
    isTyping,
    sendMessage,
    clearMessages,
    toggleChat,
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};

function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
}

export { useChatbot };
