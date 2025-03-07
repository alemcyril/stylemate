import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Droplets, Wind, Sun, RefreshCw } from "lucide-react";
import { weatherService } from "../../services/weatherService";
import { useNotification } from "../../context/NotificationContext";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showError } = useNotification();

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getCurrentWeather();
      setWeather(data);
    } catch (err) {
      console.error("Weather error:", err);
      setError("Failed to fetch weather data");
      showError("Unable to load weather information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // Default values if weather is null
  const defaultWeather = {
    temperature: "N/A",
    feelsLike: "N/A",
    humidity: "N/A",
    description: "N/A",
    windSpeed: "N/A",
    city: "N/A",
    icon: "01d",
  };

  const currentWeather = weather || defaultWeather;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Cloud className="text-blue-600" />
          Weather Forecast
        </h2>
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Cloud className="text-blue-600" />
          Weather Forecast
        </h2>
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={fetchWeather}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Cloud className="text-blue-600" />
          Weather in {currentWeather.city}
        </h2>
        <button
          onClick={fetchWeather}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <RefreshCw className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-blue-50 p-4 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sun className="text-yellow-500" size={20} />
            <span className="text-sm text-gray-600">Temperature</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {currentWeather.temperature !== "N/A"
              ? `${Math.round(currentWeather.temperature)}°C`
              : "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            Feels like{" "}
            {currentWeather.feelsLike !== "N/A"
              ? `${Math.round(currentWeather.feelsLike)}°C`
              : "N/A"}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-blue-50 p-4 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="text-blue-500" size={20} />
            <span className="text-sm text-gray-600">Humidity</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {currentWeather.humidity !== "N/A"
              ? `${currentWeather.humidity}%`
              : "N/A"}
          </p>
          <p className="text-sm text-gray-500">{currentWeather.description}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-blue-50 p-4 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Wind className="text-gray-500" size={20} />
            <span className="text-sm text-gray-600">Wind</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {currentWeather.windSpeed !== "N/A"
              ? `${currentWeather.windSpeed} m/s`
              : "N/A"}
          </p>
          <p className="text-sm text-gray-500">Wind Speed</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-blue-50 p-4 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="text-gray-500" size={20} />
            <span className="text-sm text-gray-600">Conditions</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {currentWeather.description}
          </p>
          <p className="text-sm text-gray-500">Current weather</p>
        </motion.div>
      </div>
    </div>
  );
};

export default WeatherWidget;
