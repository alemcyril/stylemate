import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Droplets,
  Wind,
  Thermometer,
  Calendar,
} from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const Weather = () => {
  const { showError } = useNotification();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // First try to get user's location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          });
        });

        // Get city name from coordinates
        const { latitude, longitude } = position.coords;
        console.log("Location coordinates:", { latitude, longitude });

        const openWeatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        if (!openWeatherApiKey) {
          throw new Error("OpenWeather API key is not configured");
        }

        // Fetch current weather
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}&units=metric`
        );
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}&units=metric`
        );
        const forecastData = await forecastResponse.json();
        setForecast(forecastData.list.slice(0, 5));
      } catch (err) {
        console.error("Weather error:", err);
        setError("Failed to fetch weather data");
        showError("Failed to load weather information");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [showError]);

  const getWeatherIcon = (condition) => {
    const weatherCode = condition?.toLowerCase() || "";
    switch (true) {
      case weatherCode.includes("01"):
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case weatherCode.includes("02") ||
        weatherCode.includes("03") ||
        weatherCode.includes("04"):
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case weatherCode.includes("09") || weatherCode.includes("10"):
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case weatherCode.includes("11"):
        return <CloudLightning className="w-8 h-8 text-yellow-500" />;
      case weatherCode.includes("13"):
        return <CloudSnow className="w-8 h-8 text-blue-300" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-center text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Current Weather */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Current Weather
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              {getWeatherIcon(weather?.weather[0]?.icon)}
              <div>
                <h2 className="text-4xl font-bold text-gray-800">
                  {Math.round(weather?.main?.temp)}°C
                </h2>
                <p className="text-gray-600 capitalize">
                  {weather?.weather[0]?.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Thermometer className="w-5 h-5" />
                <span>
                  Feels like {Math.round(weather?.main?.feels_like)}°C
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Droplets className="w-5 h-5" />
                <span>{weather?.main?.humidity}% humidity</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Wind className="w-5 h-5" />
                <span>{weather?.wind?.speed} m/s</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5-Day Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            5-Day Forecast
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="text-sm text-gray-600 mb-2">
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </div>
                {getWeatherIcon(day.weather[0]?.icon)}
                <div className="text-lg font-semibold text-gray-800 mt-2">
                  {Math.round(day.main.temp)}°C
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Weather;
