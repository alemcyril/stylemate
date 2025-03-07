import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WardrobeProvider } from "./context/WardrobeContext";
import { ChatbotProvider } from "./context/ChatbotContext";
import { UploadProvider } from "./context/UploadContext";
import { NotificationProvider } from "./context/NotificationContext";
import NotificationContainer from "./components/common/NotificationContainer";
import ChatbotInterface from "./components/chatbot/ChatbotInterface";
import ChatbotToggle from "./components/chatbot/ChatbotToggle";
import AppRoutes from "./routes";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <WardrobeProvider>
          <ChatbotProvider>
            <UploadProvider>
              <NotificationProvider>
                <div className="min-h-screen bg-gray-50">
                  <AppRoutes />
                  <NotificationContainer />
                  <ChatbotInterface />
                  <ChatbotToggle />
                </div>
              </NotificationProvider>
            </UploadProvider>
          </ChatbotProvider>
        </WardrobeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
