import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const RecentOutfits = ({ outfits }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Clock className="text-purple-600" />
        Recent Outfits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {outfits.map((outfit) => (
          <motion.div
            key={outfit.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
          >
            <img
              src={outfit.image}
              alt={outfit.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{outfit.name}</h3>
              <p className="text-sm text-gray-500">{outfit.date}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {outfit.items.map((item, index) => (
                  <span
                    key={index}
                    className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentOutfits;
