import React from "react";

const About = () => {
  return (
    <section className="bg-gray-200 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          About StyleMate
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          StyleMate is your smart companion for personalized outfit
          recommendations. Whether you're dressing for an event, work, or casual
          outing, we help you find the perfect look tailored to your style
          preferences and weather conditions.
        </p>
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center">
          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Personalized Suggestions
            </h3>
            <p className="text-gray-600">
              We analyze your preferences and trends to offer outfits that suit
              your unique style.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Weather-Based Recommendations
            </h3>
            <p className="text-gray-600">
              Stay comfortable and stylish with outfit recommendations tailored
              to the weather.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Seamless Experience
            </h3>
            <p className="text-gray-600">
              Enjoy a user-friendly interface with effortless outfit selection
              and customization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
