import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6">
      <div className="max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Find Your Perfect Outfit Instantly
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl mb-8"
        >
          StyleMate helps you pick the best outfit based on your preferences and
          the occasion.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-200 rounded-lg"
          >
            Get Started
          </button>
          <button className="px-6 py-3 text-lg font-semibold border border-white text-white hover:bg-white hover:text-blue-600 rounded-lg">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
