import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-fuchsia-500 text-white px-6 overflow-hidden pt-20">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-white rounded-full opacity-30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-fuchsia-300 rounded-full opacity-20 blur-3xl"
        />
      </div>

      <div className="w-full mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 py-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left px-4 md:px-8 lg:px-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Outfit
            </span>{" "}
            Instantly
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-100">
            StyleMate uses advanced AI to help you look your best every day. Get
            personalized outfit recommendations based on your style, the
            weather, and any occasion.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-4 pb-8"
          >
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg"
            >
              Get Started <FaArrowRight />
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block px-4 md:px-8 lg:px-12"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
