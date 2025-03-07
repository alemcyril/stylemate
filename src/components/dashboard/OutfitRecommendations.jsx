import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Calendar,
  Cloud,
  Clock,
  Filter,
  Heart,
  Share2,
  ThumbsUp,
  Bookmark,
  X,
  ChevronDown,
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Scale,
  RefreshCw,
} from "lucide-react";
import apiService from "../../services/api";
import { useNotification } from "../../context/NotificationContext";

const OutfitRecommendations = ({
  recommendations: initialRecommendations,
  onRefresh,
}) => {
  const [recommendations, setRecommendations] = useState(
    initialRecommendations
  );
  const [selectedOccasion, setSelectedOccasion] = useState("all");
  const [selectedWeather, setSelectedWeather] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedOutfits, setSelectedOutfits] = useState([]);
  const [activeFilterCategory, setActiveFilterCategory] = useState("occasion");
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const occasions = ["all", "casual", "work", "formal", "sport", "party"];
  const weatherTypes = ["all", "sunny", "cloudy", "rainy", "cold", "hot"];
  const colors = [
    "all",
    "black",
    "white",
    "blue",
    "red",
    "green",
    "yellow",
    "purple",
  ];
  const seasons = ["all", "spring", "summer", "fall", "winter"];

  const filterCategories = [
    { id: "occasion", name: "Occasion", options: occasions },
    { id: "weather", name: "Weather", options: weatherTypes },
    { id: "color", name: "Color", options: colors },
    { id: "season", name: "Season", options: seasons },
  ];

  const getActiveFilterValue = () => {
    switch (activeFilterCategory) {
      case "occasion":
        return selectedOccasion;
      case "weather":
        return selectedWeather;
      case "color":
        return selectedColor;
      case "season":
        return selectedSeason;
      default:
        return "all";
    }
  };

  const setActiveFilterValue = (value) => {
    switch (activeFilterCategory) {
      case "occasion":
        setSelectedOccasion(value);
        break;
      case "weather":
        setSelectedWeather(value);
        break;
      case "color":
        setSelectedColor(value);
        break;
      case "season":
        setSelectedSeason(value);
        break;
    }
  };

  const filteredRecommendations = recommendations
    .filter(
      (outfit) =>
        selectedOccasion === "all" ||
        outfit.occasion?.toLowerCase() === selectedOccasion
    )
    .filter(
      (outfit) =>
        selectedWeather === "all" ||
        outfit.weather?.toLowerCase() === selectedWeather
    )
    .filter(
      (outfit) =>
        selectedColor === "all" ||
        outfit.items?.some((item) => item.toLowerCase().includes(selectedColor))
    )
    .filter(
      (outfit) =>
        selectedSeason === "all" ||
        outfit.season?.toLowerCase() === selectedSeason
    )
    .sort((a, b) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "newest") return b.id - a.id;
      return 0;
    });

  const toggleFavorite = async (outfitId) => {
    try {
      await apiService.outfits.toggleFavorite(outfitId);
      setFavorites((prev) =>
        prev.includes(outfitId)
          ? prev.filter((id) => id !== outfitId)
          : [...prev, outfitId]
      );
      showSuccess("Outfit updated successfully");
    } catch (error) {
      showError("Failed to update outfit");
    }
  };

  const toggleSaveForLater = async (outfitId) => {
    try {
      await apiService.outfits.saveForLater(outfitId);
      setSavedForLater((prev) =>
        prev.includes(outfitId)
          ? prev.filter((id) => id !== outfitId)
          : [...prev, outfitId]
      );
      showSuccess("Outfit saved for later");
    } catch (error) {
      showError("Failed to save outfit");
    }
  };

  const handleShare = async (outfitId, platform) => {
    setShowShareMenu(outfitId);
    const shareUrl = window.location.href;
    const shareText = "Check out this great outfit on StyleMate!";

    try {
      switch (platform) {
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`
          );
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              shareText
            )}&url=${encodeURIComponent(shareUrl)}`
          );
          break;
        case "instagram":
          await navigator.clipboard.writeText(shareUrl);
          showSuccess("Link copied! You can now paste it in Instagram.");
          break;
        case "email":
          window.open(
            `mailto:?subject=Check out this outfit!&body=${encodeURIComponent(
              shareText + "\n" + shareUrl
            )}`
          );
          break;
        default:
          if (navigator.share) {
            await navigator.share({
              title: "Check out this outfit!",
              text: shareText,
              url: shareUrl,
            });
          } else {
            await navigator.clipboard.writeText(shareUrl);
            showSuccess("Link copied to clipboard!");
          }
      }
    } catch (error) {
      console.error("Error sharing:", error);
      showError("Failed to share outfit");
    } finally {
      setShowShareMenu(null);
    }
  };

  const toggleOutfitComparison = (outfitId) => {
    setSelectedOutfits((prev) => {
      if (prev.includes(outfitId)) {
        return prev.filter((id) => id !== outfitId);
      }
      if (prev.length >= 2) {
        return [prev[1], outfitId];
      }
      return [...prev, outfitId];
    });
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.outfits.getRecommendations();
      setRecommendations(response.data);
      onRefresh?.(response.data);
      showSuccess("New recommendations loaded!");
    } catch (error) {
      console.error("Error getting recommendations:", error);
      showError("Failed to load new recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-800">
            Outfit Recommendations
          </h2>
          <p className="text-sm text-gray-500">
            Get personalized outfit suggestions based on your preferences
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleGetRecommendations}
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            <span>Get New Recommendations</span>
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border rounded-lg px-3 py-1.5 text-gray-600"
          >
            <option value="rating">Sort by Rating</option>
            <option value="newest">Sort by Newest</option>
          </select>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
      </div>

      {/* Filters Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 mb-4"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {showFilters ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 space-y-4"
          >
            {/* Filter Category Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filter by:</span>
              <select
                value={activeFilterCategory}
                onChange={(e) => setActiveFilterCategory(e.target.value)}
                className="text-sm border rounded-lg px-3 py-1.5 text-gray-600"
              >
                {filterCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Filter Options */}
            <div className="flex flex-wrap gap-2">
              {filterCategories
                .find((cat) => cat.id === activeFilterCategory)
                ?.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setActiveFilterValue(option)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      getActiveFilterValue() === option
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                selectedOccasion,
                selectedWeather,
                selectedColor,
                selectedSeason,
              ]
                .filter((filter) => filter !== "all")
                .map((filter) => (
                  <span
                    key={filter}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    <button
                      onClick={() => {
                        if (filter === selectedOccasion)
                          setSelectedOccasion("all");
                        if (filter === selectedWeather)
                          setSelectedWeather("all");
                        if (filter === selectedColor) setSelectedColor("all");
                        if (filter === selectedSeason) setSelectedSeason("all");
                      }}
                      className="hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outfit Comparison */}
      {selectedOutfits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-800">
              Compare Outfits
            </h3>
            <button
              onClick={() => setSelectedOutfits([])}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2">
            {selectedOutfits.map((outfitId) => (
              <div
                key={outfitId}
                className="w-16 h-16 rounded-lg overflow-hidden border-2 border-blue-500"
              >
                <img
                  src={recommendations.find((o) => o.id === outfitId)?.image}
                  alt="Selected outfit"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowComparison(true)}
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Scale className="w-4 h-4" />
            Compare
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.map((outfit, index) => (
          <motion.div
            key={outfit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 rounded-lg overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={outfit.image}
                alt={outfit.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                {outfit.rating}{" "}
                <Star className="inline-block w-4 h-4 text-yellow-400" />
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-2">{outfit.name}</h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{outfit.occasion}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Cloud className="w-4 h-4" />
                  <span>{outfit.weather}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Items:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {outfit.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white px-2 py-1 rounded-full text-gray-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Plan Outfit</span>
                </button>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => toggleFavorite(outfit.id)}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(outfit.id)
                          ? "text-red-500 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(outfit.id)}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                    {showShareMenu === outfit.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-2 z-10"
                      >
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleShare(outfit.id, "facebook")}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Facebook className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleShare(outfit.id, "twitter")}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Twitter className="w-4 h-4 text-blue-400" />
                          </button>
                          <button
                            onClick={() => handleShare(outfit.id, "instagram")}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Instagram className="w-4 h-4 text-pink-600" />
                          </button>
                          <button
                            onClick={() => handleShare(outfit.id, "email")}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Mail className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleSaveForLater(outfit.id)}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        savedForLater.includes(outfit.id)
                          ? "text-blue-500 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => toggleOutfitComparison(outfit.id)}
                    className={`p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors ${
                      selectedOutfits.includes(outfit.id) ? "bg-blue-100" : ""
                    }`}
                  >
                    <Scale className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OutfitRecommendations;
