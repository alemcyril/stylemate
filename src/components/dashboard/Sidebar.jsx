import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Shirt,
  Cloud,
  Lightbulb,
  BarChart,
  Calendar,
  Settings,
  LogOut,
  ShoppingBag,
  Heart,
  Users,
  Bookmark,
  Camera,
  Palette,
  HelpCircle,
  MessageSquare,
  User,
} from "lucide-react";

const Sidebar = ({
  activeSection,
  onSectionChange,
  onSettings,
  onLogout,
  onProfile,
}) => {
  const menuItems = [
    { id: "home", label: "Home", icon: <Home /> },
    { id: "wardrobe", label: "My Wardrobe", icon: <Shirt /> },
    { id: "outfits", label: "My Outfits", icon: <ShoppingBag /> },
    { id: "recommendations", label: "Outfit Ideas", icon: <Lightbulb /> },
    { id: "weather", label: "Weather", icon: <Cloud /> },
    { id: "analytics", label: "Style Stats", icon: <BarChart /> },
    { id: "calendar", label: "Outfit Planner", icon: <Calendar /> },
    { id: "chat", label: "AI Style Assistant", icon: <MessageSquare /> },
    { id: "saved-items", label: "Saved Outfits", icon: <Bookmark /> },
  ];

  const handleSettings = () => {
    onSettings();
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleProfile = () => {
    onProfile();
  };

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg flex flex-col">
      <div className="p-6 flex-1 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">StyleMate</h1>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span
                className={`${
                  activeSection === item.id ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-100 space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleProfile}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <User className="text-gray-500" />
          <span className="font-medium">Profile</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSettings}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <Settings className="text-gray-500" />
          <span className="font-medium">Settings</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
        >
          <LogOut className="text-red-500" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;
