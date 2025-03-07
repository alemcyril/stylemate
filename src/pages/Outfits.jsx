import React, { useState } from "react";
import { useWardrobe } from "../context/WardrobeContext";
import { useNotification } from "../context/NotificationContext";
import { Plus, Grid, List, Filter, Heart, Bookmark } from "lucide-react";

const Outfits = () => {
  const {
    outfitItems,
    addOutfit,
    updateOutfit,
    deleteOutfit,
    toggleOutfitFavorite,
    saveOutfitForLater,
    loading,
  } = useWardrobe();
  const { showSuccess, showError } = useNotification();

  const [viewMode, setViewMode] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    occasion: "all",
    season: "all",
    favorite: false,
  });

  const handleDeleteOutfit = async (id) => {
    try {
      await deleteOutfit(id);
      showSuccess("Outfit deleted successfully");
    } catch (error) {
      showError("Failed to delete outfit");
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      await toggleOutfitFavorite(id);
      showSuccess("Outfit updated successfully");
    } catch (error) {
      showError("Failed to update outfit");
    }
  };

  const handleSaveForLater = async (id) => {
    try {
      await saveOutfitForLater(id);
      showSuccess("Outfit saved for later");
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
        <h1 className="text-3xl font-bold text-gray-900">My Outfits</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Filter className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {viewMode === "grid" ? (
              <List className="w-5 h-5" />
            ) : (
              <Grid className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
            <span>Create Outfit</span>
          </button>
        </div>
      </div>

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
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="favorite"
                checked={filters.favorite}
                onChange={(e) =>
                  setFilters({ ...filters, favorite: e.target.checked })
                }
                className="rounded"
              />
              <label htmlFor="favorite">Favorites Only</label>
            </div>
          </div>
        </div>
      )}

      {/* Outfits Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {outfitItems.map((outfit) => (
          <div
            key={outfit._id}
            className={`bg-white rounded-lg shadow overflow-hidden ${
              viewMode === "list" ? "flex" : ""
            }`}
          >
            <div
              className={`relative ${viewMode === "list" ? "w-32" : "w-full"}`}
            >
              <img
                src={outfit.imageUrl}
                alt={outfit.name}
                className={`object-cover ${
                  viewMode === "list" ? "h-32" : "h-48 w-full"
                }`}
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleToggleFavorite(outfit._id)}
                  className={`p-1 rounded-full ${
                    outfit.isFavorite
                      ? "bg-red-500 text-white"
                      : "bg-white/80 hover:bg-white"
                  }`}
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleSaveForLater(outfit._id)}
                  className={`p-1 rounded-full ${
                    outfit.savedForLater
                      ? "bg-blue-500 text-white"
                      : "bg-white/80 hover:bg-white"
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
              <h3 className="font-semibold text-lg">{outfit.name}</h3>
              <p className="text-gray-600">{outfit.occasion}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  {outfit.season}
                </span>
                {outfit.weather && (
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {outfit.weather}
                  </span>
                )}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleDeleteOutfit(outfit._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
                <button className="text-blue-500 hover:text-blue-600">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Outfits;
