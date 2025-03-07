import React from "react";
import { motion } from "framer-motion";
import { useChatbot } from "../../context/ChatbotContext";
import { MessageCircle } from "lucide-react";

const ChatbotToggle = () => {
  const { isOpen, toggleChat } = useChatbot();

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleChat}
      className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg ${
        isOpen ? "bg-red-500" : "bg-blue-500"
      } text-white hover:shadow-xl transition-shadow`}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      <MessageCircle size={24} />
    </motion.button>
  );
};

export default ChatbotToggle;
