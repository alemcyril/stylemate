import React, { useState } from "react";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Plus, Calendar as CalendarIcon } from "lucide-react";

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Business Meeting",
      outfit: "Business Professional",
      start: "2024-03-20T10:00:00",
      end: "2024-03-20T12:00:00",
      backgroundColor: "#3B82F6",
    },
    {
      id: "2",
      title: "Casual Friday",
      outfit: "Weekend Casual",
      start: "2024-03-22",
      backgroundColor: "#10B981",
    },
  ]);

  const handleDateClick = (arg) => {
    // Handle date click - could open a modal to add new event
    console.log("Date clicked:", arg.dateStr);
  };

  const handleEventClick = (arg) => {
    // Handle event click - could show event details
    console.log("Event clicked:", arg.event);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CalendarIcon className="text-blue-600" />
          Outfit Calendar
        </h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Event
        </motion.button>
      </div>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
          eventContent={(eventInfo) => (
            <div className="p-1">
              <div className="text-sm font-medium">{eventInfo.event.title}</div>
              <div className="text-xs text-gray-600">
                {eventInfo.event.extendedProps.outfit}
              </div>
            </div>
          )}
        />
      </div>

      <style jsx>{`
        .calendar-container {
          --fc-border-color: #e5e7eb;
          --fc-button-text-color: #374151;
          --fc-button-bg-color: #f3f4f6;
          --fc-button-border-color: #e5e7eb;
          --fc-button-hover-bg-color: #e5e7eb;
          --fc-button-hover-border-color: #d1d5db;
          --fc-button-active-bg-color: #3b82f6;
          --fc-button-active-border-color: #3b82f6;
          --fc-button-active-text-color: #ffffff;
          --fc-event-bg-color: #3b82f6;
          --fc-event-border-color: #3b82f6;
          --fc-today-bg-color: #eff6ff;
        }
      `}</style>
    </div>
  );
};

export default Calendar;
