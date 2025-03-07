import React, { useState } from "react";
import { useWardrobe } from "../context/WardrobeContext";
import { useUpload } from "../context/UploadContext";
import { useNotification } from "../context/NotificationContext";
import { Plus, Upload, Grid, List, Filter } from "lucide-react";

const Wardrobe = () => {
  const {
    wardrobeItems,
    addWardrobeItem,
    updateWardrobeItem,
    deleteWardrobeItem,
    loading,
  } = useWardrobe();
  const { uploadFile, uploading, uploadProgress } = useUpload();
  const { showSuccess, showError } = useNotification();

  const [viewMode, setViewMode] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    color: "all",
    season: "all",
  });

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const uploadedFile = await uploadFile(file, "wardrobe");
      showSuccess("Item added to wardrobe successfully!");
      // Refresh wardrobe items
      // You might want to add a refresh function to WardrobeContext
    } catch (error) {
      showError("Failed to upload item");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteWardrobeItem(id);
      showSuccess("Item deleted successfully");
    } catch (error) {
      showError("Failed to delete item");
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
        <h1 className="text-3xl font-bold text-gray-900">My Wardrobe</h1>
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
          <label className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className="w-5 h-5" />
          </label>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-3 gap-4">
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Categories</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="dresses">Dresses</option>
              <option value="shoes">Shoes</option>
              <option value="accessories">Accessories</option>
            </select>
            <select
              value={filters.color}
              onChange={(e) =>
                setFilters({ ...filters, color: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Colors</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
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

      {/* Wardrobe Items */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {wardrobeItems.map((item) => (
          <div
            key={item._id}
            className={`bg-white rounded-lg shadow overflow-hidden ${
              viewMode === "list" ? "flex" : ""
            }`}
          >
            <div
              className={`relative ${viewMode === "list" ? "w-32" : "w-full"}`}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className={`object-cover ${
                  viewMode === "list" ? "h-32" : "h-48 w-full"
                }`}
              />
              <button
                onClick={() => handleDeleteItem(item._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                ✕
              </button>
            </div>
            <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600">{item.category}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  {item.color}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  {item.season}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
          <div className="w-64">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Uploading... {uploadProgress}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wardrobe;
