import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import AdminNav from "../components/BookingDashboard/AdminNav";
import axios from "axios";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isBefore,
  isSameDay,
} from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const process = import.meta.env;

const AdminCalendarPage = () => {
  const [roomOptions, setRoomOptions] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);

   useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/allRooms`);
        const roomNames = response.data.map((room) => room.name); // assuming 'name' is the field
        setRoomOptions(roomNames);
        if (roomNames.length > 0) {
          setSelectedRoom(roomNames[0]);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // Fetch unavailable dates whenever selected room changes
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      if (!selectedRoom) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST_URL}/api/calendar/unavailable_dates?roomType=${selectedRoom}`
        );
        setUnavailableDates(response.data.unavailableDates || []);
      } catch (error) {
        console.error("Error fetching unavailable dates:", error);
      }
    };

    fetchUnavailableDates();
  }, [selectedRoom]);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getDateStatus = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const foundDate = unavailableDates.find(
      (unavailableDate) => unavailableDate.date === dateStr
    );
    return foundDate ? foundDate : { status: "available", source: "" };
  };

  const renderDaysHeader = () => {
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return dayNames.map((day) => (
      <div
        key={day}
        className="text-sm font-semibold text-center text-gray-700 uppercase"
      >
        {day}
      </div>
    ));
  };

  const renderDays = () => {
    const today = new Date();
    const monthStart = startOfMonth(currentMonth);
    const startDate = monthStart.getDay();
    const days = [];

    for (let i = 0; i < 42; i++) {
      const day = new Date(monthStart);
      day.setDate(i - startDate + 1);
      const formattedDate = format(day, "d");
      const isCurrentMonth = isSameMonth(day, currentMonth);
      const isPastDate = isBefore(day, today) && !isSameDay(day, today);
      const { status, source } = getDateStatus(day);

      const statusClass =
        status === "fullyBooked"
          ? "bg-gradient-to-br from-red-500 to-red-700 text-white font-bold"
          : status === "partiallyBooked"
          ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 font-semibold"
          : "bg-gray-100 text-gray-800";

      const disabledClass = isPastDate
        ? "bg-gray-50 text-gray-400 cursor-not-allowed shadow-none" // Subtle styling for disabled dates
        : "";

      const activeHoverClass =
        !isPastDate && status === "available"
          ? "hover:shadow-lg hover:bg-gray-200 cursor-pointer"
          : "";

      days.push(
        <div
          key={i}
          className={`relative text-center p-3 rounded-xl shadow-md transition-all ${
            isCurrentMonth ? "" : "text-gray-300"
          } ${statusClass} ${disabledClass} ${activeHoverClass}`}
          title={
            isPastDate
              ? "Past Date"
              : source
              ? `Blocked by: ${source}`
              : "Available"
          }
        >
          <span className="text-lg">{formattedDate}</span>
          {!isPastDate && source && (
            <div
              className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg"
              title={`Blocked by ${source}`}
            >
              {source}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <div className="lg:block lg:w-64">
        <SideNav />
      </div>
      <div className="flex-1 overflow-auto">
        <AdminNav title="Room Calendar" />
        <main className="flex flex-col p-6 space-y-6">
          {/* Room Name Display */}
          <section className="bg-blue-50 text-blue-900 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Room: {selectedRoom}</h2>
            <p className="text-sm font-light">
              Manage calendar and availability for the selected room.
            </p>
          </section>

          {/* Dropdown for Room Selection */}
          <section className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Room Availability</h2>
            <div>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {roomOptions.map((room, index) => (
                  <option key={index} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Calendar */}
          <section className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <div>
                <button
                  onClick={prevMonth}
                  className="p-2 text-gray-600 rounded-full hover:bg-gray-200"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 text-gray-600 rounded-full hover:bg-gray-200"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-3">
              {renderDaysHeader()}
              {renderDays()}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminCalendarPage;
