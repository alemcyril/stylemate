import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Plus,
  X,
  Save,
  Clock,
  Tag,
  Star,
} from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const Calendar = () => {
  const { showSuccess, showError } = useNotification();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddOutfit, setShowAddOutfit] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [notes, setNotes] = useState("");

  // Mock data for planned outfits
  const [plannedOutfits, setPlannedOutfits] = useState([
    {
      id: 1,
      date: "2024-03-20",
      outfit: "Casual Blue Jeans",
      notes: "Meeting with clients",
    },
    {
      id: 2,
      date: "2024-03-21",
      outfit: "Business Suit",
      notes: "Important presentation",
    },
  ]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const plannedOutfit = plannedOutfits.find(
      (outfit) => outfit.date === date.toISOString().split("T")[0]
    );
    setSelectedOutfit(plannedOutfit || null);
    setNotes(plannedOutfit?.notes || "");
    setShowAddOutfit(false);
  };

  const handleSaveOutfit = () => {
    try {
      const dateString = selectedDate.toISOString().split("T")[0];
      const newOutfit = {
        id: Date.now(),
        date: dateString,
        outfit: "New Outfit", // This would come from a selection
        notes: notes,
      };

      setPlannedOutfits([...plannedOutfits, newOutfit]);
      setSelectedOutfit(newOutfit);
      setShowAddOutfit(false);
      showSuccess("Outfit planned successfully!");
    } catch (error) {
      showError("Failed to plan outfit");
    }
  };

  const handleRemoveOutfit = () => {
    try {
      setPlannedOutfits(
        plannedOutfits.filter(
          (outfit) => outfit.date !== selectedDate.toISOString().split("T")[0]
        )
      );
      setSelectedOutfit(null);
      setNotes("");
      showSuccess("Outfit removed successfully!");
    } catch (error) {
      showError("Failed to remove outfit");
    }
  };

  const renderCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      const dateString = currentDate.toISOString().split("T")[0];
      const hasPlannedOutfit = plannedOutfits.some(
        (outfit) => outfit.date === dateString
      );

      days.push(
        <motion.button
          key={day}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDateSelect(currentDate)}
          className={`h-12 w-12 rounded-full flex items-center justify-center ${
            currentDate.toDateString() === selectedDate.toDateString()
              ? "bg-blue-500 text-white"
              : hasPlannedOutfit
              ? "bg-green-100 text-green-600"
              : "hover:bg-gray-100"
          }`}
        >
          {day}
        </motion.button>
      );
    }

    return days;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Outfit Planner</h1>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddOutfit(true)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <Plus className="w-4 h-4" />
              <span>Plan Outfit</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-500"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {renderCalendarDays()}
              </div>
            </div>

            {/* Selected Date Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
                {selectedOutfit && (
                  <button
                    onClick={handleRemoveOutfit}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {showAddOutfit ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Outfit
                    </label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option>Casual Blue Jeans</option>
                      <option>Business Suit</option>
                      <option>Summer Dress</option>
                      <option>Sport Outfit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Add any notes about this outfit..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveOutfit}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAddOutfit(false)}
                      className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </motion.button>
                  </div>
                </div>
              ) : selectedOutfit ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tag className="w-4 h-4" />
                    <span>{selectedOutfit.outfit}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{selectedOutfit.notes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4" />
                    <span>Rating: 4.5/5</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No outfit planned for this day
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
