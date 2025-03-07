import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import apiService from "../../services/api";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
} from "react-icons/wi";
import { IoNotifications, IoSettings } from "react-icons/io5";
import { User } from "lucide-react";

const HeroSection = ({ userName }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New outfit suggestion available!" },
    { id: 2, message: "Weather alert: Rain expected tomorrow" },
  ]);

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

        // Get coordinates
        const { latitude, longitude } = position.coords;
        console.log("Location coordinates:", { latitude, longitude });

        // First get the city name from coordinates
        const openWeatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        if (!openWeatherApiKey) {
          throw new Error("OpenWeather API key is not configured");
        }

        const geocodeResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${openWeatherApiKey}`
        );

        if (!geocodeResponse.ok) {
          throw new Error("Failed to get location data");
        }

        const locationData = await geocodeResponse.json();
        const city = locationData[0].name;

        // Get weather data from our backend
        const response = await apiService.weather.getCurrent({ city });

        if (!response.data) {
          throw new Error("No weather data received");
        }

        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
        if (error.code === 1) {
          setError("Please enable location access to see weather data");
        } else if (error.message === "OpenWeather API key is not configured") {
          setError("Weather service is not properly configured");
        } else if (error.response?.status === 401) {
          setError("Please log in to see weather data");
        } else if (error.response?.status === 404) {
          setError("Weather service is not available");
        } else if (error.response?.status === 500) {
          setError("Weather service is experiencing issues");
        } else {
          setError("Failed to fetch weather data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const getWeatherIcon = (weatherCode) => {
    // Map weather codes to icons
    const iconMap = {
      "01": WiDaySunny,
      "02": WiCloudy,
      "03": WiCloudy,
      "04": WiCloudy,
      "09": WiRain,
      10: WiRain,
      11: WiThunderstorm,
      13: WiSnow,
      50: WiCloudy,
    };

    const code = weatherCode.substring(0, 2);
    return iconMap[code] || WiDaySunny;
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 shadow-xl">
      <div className="flex items-center justify-between text-white">
        {/* Left Section: User Info */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Welcome back, {userName}! 👋</h2>
          <p className="text-md opacity-90">
            Let's create your perfect look today
          </p>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center space-x-4">
          {/* Profile */}
          <button
            className="p-2 hover:bg-white/20 rounded-full transition"
            onClick={handleProfileClick}
          >
            <User className="text-2xl" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              className="p-2 hover:bg-white/20 rounded-full transition"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <IoNotifications className="text-2xl" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-10">
                <div className="p-4">
                  <h3 className="text-gray-800 font-semibold mb-3">
                    Notifications
                  </h3>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="text-gray-600 text-sm p-2 hover:bg-gray-100 rounded"
                    >
                      {notif.message}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button
            className="p-2 hover:bg-white/20 rounded-full transition"
            onClick={handleSettingsClick}
          >
            <IoSettings className="text-2xl" />
          </button>

          {/* Logout */}
          <button
            className="bg-white text-blue-600 hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="mt-6 bg-white/20 backdrop-blur-sm p-4 inline-flex items-center space-x-6">
        {loading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        ) : error ? (
          <div className="text-white/90">{error}</div>
        ) : weatherData ? (
          <>
            {getWeatherIcon(weatherData.icon)({
              className: "text-5xl text-white",
            })}
            <div className="border-r border-white/30 pr-6">
              <p className="text-2xl font-bold text-white">
                {Math.round(weatherData.temperature)}°C
              </p>
              <p className="text-white/90">{weatherData.description}</p>
            </div>
            <div className="text-white">
              <p className="text-sm">
                Feels like: {Math.round(weatherData.feelsLike)}°C
              </p>
              <p className="text-sm">Humidity: {weatherData.humidity}%</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default HeroSection;
