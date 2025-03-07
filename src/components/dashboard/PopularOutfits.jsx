import React from "react";
import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";

const PopularOutfits = ({ outfits }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ThumbsUp className="text-orange-600" />
        Popular Outfits
      </h2>
      <div className="space-y-4">
        {outfits.map((outfit) => (
          <motion.div
            key={outfit.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
          >
            <img
              src={outfit.image}
              alt={outfit.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{outfit.name}</h3>
              <p className="text-sm text-gray-500">{outfit.occasion}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularOutfits;
