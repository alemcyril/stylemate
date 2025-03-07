import React from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, Upload, Cloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";

const QuickActions = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();

  const actions = [
    {
      title: "Add New Outfit",
      description: "Create a new outfit combination",
      icon: <Plus className="w-6 h-6" />,
      color: "blue",
      action: () => {
        navigate("/outfits/new");
      },
    },
    {
      title: "Plan Today's Outfit",
      description: "Choose what to wear today",
      icon: <Calendar className="w-6 h-6" />,
      color: "green",
      action: () => {
        navigate("/calendar");
      },
    },
    {
      title: "Upload New Item",
      description: "Add a new piece to your wardrobe",
      icon: <Upload className="w-6 h-6" />,
      color: "purple",
      action: () => {
        navigate("/wardrobe/upload");
      },
    },
    {
      title: "Weather Check",
      description: "View today's weather forecast",
      icon: <Cloud className="w-6 h-6" />,
      color: "orange",
      action: () => {
        navigate("/weather");
      },
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.action}
            className={`bg-${action.color}-50 p-4 rounded-lg text-left hover:bg-${action.color}-100 transition-colors`}
          >
            <div className={`text-${action.color}-600 mb-2`}>{action.icon}</div>
            <h3 className={`text-${action.color}-700 font-medium mb-1`}>
              {action.title}
            </h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
