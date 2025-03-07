import React, { createContext, useContext, useState, useEffect } from "react";
import apiService from "../services/api";

const WardrobeContext = createContext();

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error("useWardrobe must be used within a WardrobeProvider");
  }
  return context;
};

export const WardrobeProvider = ({ children }) => {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [outfitItems, setOutfitItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    tops: 0,
    bottoms: 0,
    outerwear: 0,
    shoes: 0,
    accessories: 0,
  });

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [wardrobeResponse, outfitsResponse] = await Promise.all([
        apiService.wardrobe.getAll(),
        apiService.outfits.getAll(),
      ]);
      setWardrobeItems(wardrobeResponse.data);
      setOutfitItems(outfitsResponse.data);
      calculateStats(wardrobeResponse.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching wardrobe data:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (items) => {
    const newStats = {
      tops: 0,
      bottoms: 0,
      outerwear: 0,
      shoes: 0,
      accessories: 0,
    };

    items.forEach((item) => {
      const category = item.category.toLowerCase();
      if (newStats[category] !== undefined) {
        newStats[category]++;
      }
    });

    setStats(newStats);
  };

  const addItem = async (itemData) => {
    try {
      const response = await apiService.wardrobe.add(itemData);
      setWardrobeItems((prev) => [...prev, response.data]);
      calculateStats([...wardrobeItems, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error("Error adding wardrobe item:", err);
      throw err;
    }
  };

  const updateItem = async (id, itemData) => {
    try {
      const response = await apiService.wardrobe.update(id, itemData);
      setWardrobeItems((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      );
      calculateStats(
        wardrobeItems.map((item) => (item.id === id ? response.data : item))
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error("Error updating wardrobe item:", err);
      throw err;
    }
  };

  const deleteItem = async (id) => {
    try {
      await apiService.wardrobe.delete(id);
      setWardrobeItems((prev) => prev.filter((item) => item.id !== id));
      calculateStats(wardrobeItems.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
      console.error("Error deleting wardrobe item:", err);
      throw err;
    }
  };

  const addOutfit = async (outfitData) => {
    try {
      const response = await apiService.outfits.create(outfitData);
      setOutfitItems((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error("Error adding outfit:", err);
      throw err;
    }
  };

  const updateOutfit = async (id, outfitData) => {
    try {
      const response = await apiService.outfits.update(id, outfitData);
      setOutfitItems((prev) =>
        prev.map((outfit) => (outfit._id === id ? response.data : outfit))
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error("Error updating outfit:", err);
      throw err;
    }
  };

  const deleteOutfit = async (id) => {
    try {
      await apiService.outfits.delete(id);
      setOutfitItems((prev) => prev.filter((outfit) => outfit._id !== id));
    } catch (err) {
      setError(err.message);
      console.error("Error deleting outfit:", err);
      throw err;
    }
  };

  const toggleOutfitFavorite = async (id) => {
    try {
      await apiService.outfits.toggleFavorite(id);
      setOutfitItems((prev) =>
        prev.map((outfit) =>
          outfit._id === id
            ? { ...outfit, isFavorite: !outfit.isFavorite }
            : outfit
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Error toggling outfit favorite:", err);
      throw err;
    }
  };

  const saveOutfitForLater = async (id) => {
    try {
      await apiService.outfits.saveForLater(id);
      setOutfitItems((prev) =>
        prev.map((outfit) =>
          outfit._id === id
            ? { ...outfit, savedForLater: !outfit.savedForLater }
            : outfit
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Error saving outfit for later:", err);
      throw err;
    }
  };

  const refreshData = () => {
    return fetchInitialData();
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const value = {
    wardrobeItems,
    outfitItems,
    loading,
    error,
    stats,
    addItem,
    updateItem,
    deleteItem,
    addOutfit,
    updateOutfit,
    deleteOutfit,
    toggleOutfitFavorite,
    saveOutfitForLater,
    refreshData,
  };

  return (
    <WardrobeContext.Provider value={value}>
      {children}
    </WardrobeContext.Provider>
  );
};
