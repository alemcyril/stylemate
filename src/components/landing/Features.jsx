import { Sparkles, Shirt, Palette, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Sparkles size={40} className="text-blue-500" />,
    title: "AI-Powered Recommendations",
    description:
      "Get personalized outfit suggestions based on your style and preferences.",
    bgGradient: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: <Shirt size={40} className="text-green-500" />,
    title: "Virtual Wardrobe",
    description:
      "Upload and manage your wardrobe to mix and match outfits effortlessly.",
    bgGradient: "from-green-50 to-green-100",
    iconBg: "bg-green-100",
  },
  {
    icon: <Palette size={40} className="text-yellow-500" />,
    title: "Color Coordination",
    description:
      "Find perfect color combinations to enhance your fashion game.",
    bgGradient: "from-yellow-50 to-yellow-100",
    iconBg: "bg-yellow-100",
  },
  {
    icon: <Smartphone size={40} className="text-purple-500" />,
    title: "Mobile-Friendly",
    description: "Access your style companion anytime, anywhere on any device.",
    bgGradient: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-100",
  },
];

export default function Features() {
  return (
    <section id="Features" className="py-24 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Why Choose StyleMate?
        </h2>
        <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Enhance your fashion experience with our intelligent outfit suggestions and cutting-edge features.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${feature.bgGradient} p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <div className={`flex items-center justify-center w-20 h-20 ${feature.iconBg} rounded-2xl mb-6 mx-auto transform hover:rotate-6 transition-transform duration-300`}>
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-center text-lg leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
