import React, { useState, useEffect } from "react";
import { useWardrobe } from "../context/WardrobeContext";
import { useNotification } from "../context/NotificationContext";
import { RefreshCw, Filter, Heart, Bookmark } from "lucide-react";

const Recommendations = () => {
  const { getOutfitRecommendations, weatherData, loading } = useWardrobe();
  const { showSuccess, showError } = useNotification();

  const [recommendations, setRecommendations] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    occasion: "all",
    weather: "all",
    season: "all",
  });

  const fetchRecommendations = async () => {
    try {
      const data = await getOutfitRecommendations();
      setRecommendations(data);
      showSuccess("New recommendations loaded!");
    } catch (error) {
      showError("Failed to load recommendations");
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleSaveOutfit = async (outfit) => {
    try {
      // Add outfit to saved outfits
      // You might want to add a saveOutfit function to WardrobeContext
      showSuccess("Outfit saved successfully!");
    } catch (error) {
      showError("Failed to save outfit");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Outfit Recommendations
          </h1>
          <p className="text-gray-600 mt-2">
            Personalized outfit suggestions based on your wardrobe and current
            weather
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Filter className="w-5 h-5" />
          </button>
          <button
            onClick={fetchRecommendations}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Get New Recommendations</span>
          </button>
        </div>
      </div>

      {/* Weather Info */}
      {weatherData && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Current Weather</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-gray-600">Temperature</p>
              <p className="text-xl font-bold">{weatherData.temperature}°C</p>
            </div>
            <div>
              <p className="text-gray-600">Condition</p>
              <p className="text-xl font-bold">{weatherData.condition}</p>
            </div>
            <div>
              <p className="text-gray-600">Humidity</p>
              <p className="text-xl font-bold">{weatherData.humidity}%</p>
            </div>
            <div>
              <p className="text-gray-600">Wind Speed</p>
              <p className="text-xl font-bold">{weatherData.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-3 gap-4">
            <select
              value={filters.occasion}
              onChange={(e) =>
                setFilters({ ...filters, occasion: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Occasions</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="business">Business</option>
              <option value="sport">Sport</option>
            </select>
            <select
              value={filters.weather}
              onChange={(e) =>
                setFilters({ ...filters, weather: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Weather</option>
              <option value="sunny">Sunny</option>
              <option value="rainy">Rainy</option>
              <option value="cold">Cold</option>
              <option value="hot">Hot</option>
            </select>
            <select
              value={filters.season}
              onChange={(e) =>
                setFilters({ ...filters, season: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Seasons</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
              <option value="winter">Winter</option>
            </select>
          </div>
        </div>
      )}

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendations.map((outfit) => (
          <div
            key={outfit._id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="relative">
              <img
                src={outfit.imageUrl}
                alt={outfit.name}
                className="h-48 w-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleSaveOutfit(outfit)}
                  className="p-1 bg-white/80 hover:bg-white rounded-full"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleSaveOutfit(outfit)}
                  className="p-1 bg-white/80 hover:bg-white rounded-full"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{outfit.name}</h3>
              <p className="text-gray-600">{outfit.occasion}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  {outfit.season}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  {outfit.weather}
                </span>
              </div>
              <div className="mt-4">
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  Plan This Outfit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
