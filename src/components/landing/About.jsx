import { motion } from "framer-motion";
import { Sparkles, Cloud, Smile } from "lucide-react";

const About = () => {
  return (
    <section id="About" className="bg-gradient-to-b from-gray-50 to-gray-100 py-24 px-6 md:px-12 lg:px-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          About StyleMate
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed">
          StyleMate is your intelligent fashion companion, leveraging AI to deliver personalized outfit
          recommendations. Whether you're preparing for a special event, work, or casual
          outing, we help you discover the perfect look that matches your unique style
          preferences and adapts to current weather conditions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-xl rounded-3xl p-8 transform transition-all duration-300 hover:shadow-2xl"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles size={32} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Personalized Suggestions
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our AI analyzes your preferences, style history, and current trends to curate
              outfits that perfectly match your unique personality.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-xl rounded-3xl p-8 transform transition-all duration-300 hover:shadow-2xl"
          >
            <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Cloud size={32} className="text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Weather-Smart Choices
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Stay comfortable and stylish with intelligent outfit recommendations that
              adapt to real-time weather conditions and forecasts.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-xl rounded-3xl p-8 transform transition-all duration-300 hover:shadow-2xl"
          >
            <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Smile size={32} className="text-pink-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Effortless Experience
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Enjoy an intuitive interface that makes outfit selection and customization
              a delightful and hassle-free experience.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
