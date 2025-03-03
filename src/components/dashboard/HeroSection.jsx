import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WiDaySunny, WiCloudy, WiRain } from "react-icons/wi";

const HeroSection = ({ userName, onLogout }) => {

  const navigate = useNavigate();
  
  const [weather, setWeather] = useState({
    temp: "28°C",
    condition: "Sunny",
  });

  // Dummy function to simulate fetching weather data
  useEffect(() => {
    // Here, you can integrate an actual weather API
    setWeather({
      temp: "24°C",
      condition: "Cloudy",
    });
  }, []);

  const handleLogout = async () => {
    try {
      // Clear token from storage
      localStorage.removeItem("token");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Function to determine the weather icon
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "Sunny":
        return <WiDaySunny className="text-yellow-500 text-4xl" />;
      case "Cloudy":
        return <WiCloudy className="text-gray-400 text-4xl" />;
      case "Rainy":
        return <WiRain className="text-blue-500 text-4xl" />;
      default:
        return <WiDaySunny className="text-yellow-500 text-4xl" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-2xl shadow-lg flex items-center justify-between text-white">
      {/* Left Section: User Info */}
      <div>
        <h2 className="text-xl font-semibold">Welcome, {userName}!</h2>
        <p className="text-sm opacity-80">Your style assistant is ready</p>
      </div>

      {/* Middle Section: Weather Widget */}
      <div className="flex items-center space-x-3">
        {getWeatherIcon()}
        <div>
          <p className="text-lg font-medium">{weather.temp}</p>
          <p className="text-sm">{weather.condition}</p>
        </div>
      </div>

      {/* Right Section: Logout Button */}
      <button
        className="bg-white text-blue-600 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition duration-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default HeroSection;
