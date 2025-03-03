import { Sparkles, Shirt, Palette, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Sparkles size={40} className="text-blue-500" />,
    title: "AI-Powered Recommendations",
    description:
      "Get personalized outfit suggestions based on your style and preferences.",
  },
  {
    icon: <Shirt size={40} className="text-green-500" />,
    title: "Virtual Wardrobe",
    description:
      "Upload and manage your wardrobe to mix and match outfits effortlessly.",
  },
  {
    icon: <Palette size={40} className="text-yellow-500" />,
    title: "Color Coordination",
    description:
      "Find perfect color combinations to enhance your fashion game.",
  },
  {
    icon: <Smartphone size={40} className="text-purple-500" />,
    title: "Mobile-Friendly",
    description: "Access your style companion anytime, anywhere on any device.",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Why Choose StyleMate?
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Enhance your fashion experience with our smart outfit suggestions.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 mx-auto">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-center mt-2">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
