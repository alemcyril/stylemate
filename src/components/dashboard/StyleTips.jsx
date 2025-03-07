import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Sparkles } from "lucide-react";

const StyleTips = ({ tips, trends }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Lightbulb className="text-yellow-500" />
        Style Tips & Trends
      </h2>

      <div className="space-y-6">
        {/* Current Trends */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <TrendingUp className="text-purple-500" />
            Current Trends
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trends.map((trend, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-purple-50 p-4 rounded-lg"
              >
                <h4 className="font-semibold text-gray-800 mb-2">
                  {trend.title}
                </h4>
                <p className="text-sm text-gray-600">{trend.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Style Tips */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Sparkles className="text-blue-500" />
            Personalized Tips
          </h3>
          <div className="space-y-4">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg"
              >
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Lightbulb className="text-blue-500" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {tip.title}
                  </h4>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleTips;
