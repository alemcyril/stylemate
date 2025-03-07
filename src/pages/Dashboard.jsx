import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiService from "../services/api";
import HeroSection from "../components/dashboard/HeroSection";
import QuickActions from "../components/dashboard/QuickActions";
import OutfitRecommendations from "../components/dashboard/OutfitRecommendations";
import RecentOutfits from "../components/dashboard/RecentOutfits";
import StyleAnalytics from "../components/dashboard/StyleAnalytics";
import PopularOutfits from "../components/dashboard/PopularOutfits";
import WeatherWidget from "../components/dashboard/WeatherWidget";
import WardrobeStats from "../components/dashboard/WardrobeStats";
import StyleTips from "../components/dashboard/StyleTips";
import Sidebar from "../components/dashboard/Sidebar";
import CalendarWidget from "../components/dashboard/Calendar";
import ChatBot from "../components/dashboard/ChatBot";
import { useWardrobe } from "../context/WardrobeContext";
import { useNotification } from "../context/NotificationContext";
import Outfits from "./Outfits";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    stats,
    loading: wardrobeLoading,
    error: wardrobeError,
  } = useWardrobe();
  const { showError } = useNotification();
  const [activeSection, setActiveSection] = useState("home");
  const [outfitRecommendations, setOutfitRecommendations] = useState([]);
  const [recentOutfits, setRecentOutfits] = useState([]);
  const [styleAnalytics, setStyleAnalytics] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default data for when API calls fail
  const defaultWeatherData = {
    temperature: "N/A",
    feelsLike: "N/A",
    humidity: "N/A",
    airQuality: "N/A",
    windSpeed: "N/A",
    windDirection: "N/A",
    forecast: "N/A",
  };

  const defaultWardrobeStats = {
    tops: 0,
    bottoms: 0,
    outerwear: 0,
    shoes: 0,
    accessories: 0,
    mostUsed: [],
    toReplace: [],
  };

  const defaultAnalytics = {
    styleScore: 0,
    outfitVariety: 0,
    mostWorn: [],
    favoriteColors: [],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Starting to fetch dashboard data...");

        const [
          recommendationsResponse,
          outfitsResponse,
          statsResponse,
          weatherResponse,
        ] = await Promise.all([
          apiService.outfits.getRecommendations().catch((error) => {
            console.error("Error fetching recommendations:", error);
            return { data: [] };
          }),
          apiService.outfits.getAll().catch((error) => {
            console.error("Error fetching outfits:", error);
            return { data: [] };
          }),
          apiService.wardrobe.getStats().catch((error) => {
            console.error("Error fetching wardrobe stats:", error);
            return { data: defaultWardrobeStats };
          }),
          apiService.weather.getCurrent().catch((error) => {
            console.error("Error fetching weather:", error);
            return { data: defaultWeatherData };
          }),
        ]);

        console.log("API responses received:", {
          recommendations: recommendationsResponse,
          outfits: outfitsResponse,
          stats: statsResponse,
          weather: weatherResponse,
        });

        setOutfitRecommendations(recommendationsResponse.data || []);
        setRecentOutfits((outfitsResponse.data || []).slice(0, 2));

        // Transform wardrobe stats into analytics format
        const stats = statsResponse.data || defaultWardrobeStats;
        console.log("Processing wardrobe stats:", stats);

        // Calculate total items with defensive checks
        const totalItems =
          (stats.tops || 0) +
          (stats.bottoms || 0) +
          (stats.outerwear || 0) +
          (stats.shoes || 0) +
          (stats.accessories || 0);

        // Ensure mostUsed is an array
        const mostUsedItems = Array.isArray(stats.mostUsed)
          ? stats.mostUsed
          : [];

        const analytics = {
          styleScore:
            totalItems > 0
              ? Math.round((mostUsedItems.length / totalItems) * 100)
              : 0,
          outfitVariety: Math.round((mostUsedItems.length / 10) * 100) || 0,
          mostWorn: mostUsedItems,
          favoriteColors: ["Black", "White", "Blue"], // Default colors if not available
        };
        console.log("Transformed analytics:", analytics);

        setStyleAnalytics(analytics);
        setWeatherData(weatherResponse.data || defaultWeatherData);

        console.log("Dashboard data successfully loaded");
      } catch (error) {
        console.error("Error in fetchData:", error);
        console.error("Error details:", {
          message: error.message,
          response: error.response,
          stack: error.stack,
        });
        setError(`Failed to load dashboard data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    try {
      // Clear tokens from storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const styleTips = {
    trends: [
      {
        title: "Sustainable Fashion",
        description:
          "Eco-friendly materials and sustainable practices are trending this season.",
      },
      {
        title: "Minimalist Accessories",
        description:
          "Less is more with subtle, elegant accessories making a statement.",
      },
    ],
    tips: [
      {
        title: "Color Coordination",
        description:
          "Try mixing neutral tones with bold accent colors for a balanced look.",
      },
      {
        title: "Layering Tips",
        description:
          "Layer lightweight pieces for a sophisticated, multi-dimensional outfit.",
      },
    ],
  };

  const renderContent = () => {
    if (loading || wardrobeLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (error || wardrobeError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-600">Error loading wardrobe data</div>
        </div>
      );
    }

    switch (activeSection) {
      case "home":
        return (
          <div className="space-y-8">
            <HeroSection userName={user?.username || "User"} />
            <QuickActions />
            <OutfitRecommendations
              recommendations={outfitRecommendations}
              onRefresh={(newRecommendations) =>
                setOutfitRecommendations(newRecommendations)
              }
            />
          </div>
        );
      case "wardrobe":
        return <WardrobeStats stats={stats} />;
      case "outfits":
        return <Outfits />;
      case "recommendations":
        return (
          <OutfitRecommendations
            recommendations={outfitRecommendations}
            onRefresh={setOutfitRecommendations}
          />
        );
      case "weather":
        return <WeatherWidget weather={weatherData} />;
      case "style-tips":
        return <StyleTips tips={styleTips.tips} trends={styleTips.trends} />;
      case "analytics":
        return <StyleAnalytics analytics={styleAnalytics} />;
      case "calendar":
        return <CalendarWidget />;
      case "chat":
        return <ChatBot />;
      case "saved-items":
        return (
          <div className="text-center text-gray-500">
            Saved Items section coming soon...
          </div>
        );
      case "community":
        return (
          <div className="text-center text-gray-500">
            Community section coming soon...
          </div>
        );
      case "help":
        return (
          <div className="text-center text-gray-500">
            Help & Support section coming soon...
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-500">Section not found</div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onSettings={handleSettings}
        onLogout={handleLogout}
        onProfile={handleProfile}
      />
      <div className="ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
