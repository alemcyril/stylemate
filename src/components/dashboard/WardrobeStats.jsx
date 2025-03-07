import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Shirt,
  Footprints,
  Glasses,
  Plus,
  Clock,
  ChevronRight,
  Camera,
  Tag,
  Calendar,
  Star,
} from "lucide-react";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { useWardrobe } from "../../context/WardrobeContext";
import { useNotification } from "../../context/NotificationContext";

const WardrobeStats = ({ stats }) => {
  const navigate = useNavigate();
  const { wardrobeItems, refreshData } = useWardrobe();
  const { showSuccess, showError } = useNotification();

  // Default values if stats is null
  const defaultStats = {
    tops: 0,
    bottoms: 0,
    outerwear: 0,
    shoes: 0,
    accessories: 0,
  };

  const currentStats = stats || defaultStats;

  const categories = [
    {
      name: "Tops",
      count: currentStats.tops,
      icon: <Shirt className="w-6 h-6" />,
      color: "blue",
    },
    {
      name: "Bottoms",
      count: currentStats.bottoms,
      icon: <AccessibilityNewIcon className="w-6 h-6" />,
      color: "green",
    },
    {
      name: "Outerwear",
      count: currentStats.outerwear,
      icon: <CheckroomIcon className="w-6 h-6" />,
      color: "purple",
    },
    {
      name: "Shoes",
      count: currentStats.shoes,
      icon: <Footprints className="w-6 h-6" />,
      color: "orange",
    },
    {
      name: "Accessories",
      count: currentStats.accessories,
      icon: <Glasses className="w-6 h-6" />,
      color: "pink",
    },
  ];

  // Get recent additions from wardrobe items
  const recentAdditions = wardrobeItems
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
    .map((item) => ({
      name: item.name,
      date: new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      category: item.category,
    }));

  const quickActions = [
    {
      name: "Take Photo",
      icon: <Camera className="w-5 h-5" />,
      color: "blue",
      action: () => navigate("/wardrobe/upload"),
    },
    {
      name: "Add Tags",
      icon: <Tag className="w-5 h-5" />,
      color: "green",
      action: () => navigate("/wardrobe/tags"),
    },
    {
      name: "Plan Outfit",
      icon: <Calendar className="w-5 h-5" />,
      color: "purple",
      action: () => navigate("/calendar"),
    },
    {
      name: "Rate Items",
      icon: <Star className="w-5 h-5" />,
      color: "yellow",
      action: () => navigate("/wardrobe/rate"),
    },
  ];

  const handleAddItem = () => {
    navigate("/wardrobe/upload");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Shirt className="text-blue-600" />
          Wardrobe Statistics
        </h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddItem}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add to Wardrobe</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className={`bg-${category.color}-50 p-6 rounded-lg flex items-center gap-4 min-h-[100px]`}
          >
            <div
              className={`p-3 bg-${category.color}-100 rounded-lg shadow-sm`}
            >
              {category.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">{category.name}</p>
              <p className="text-2xl font-bold text-gray-800">
                {category.count}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Additions */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-700">
              Recent Additions
            </h3>
          </div>
          <div className="space-y-3">
            {recentAdditions.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-3 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <ChevronRight className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-700">
              Quick Actions
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.action}
                className={`bg-white p-3 rounded-lg flex items-center gap-2 hover:bg-${action.color}-50 transition-colors`}
              >
                <div className={`text-${action.color}-600`}>{action.icon}</div>
                <span className="text-sm font-medium text-gray-700">
                  {action.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardrobeStats;
