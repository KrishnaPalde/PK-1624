import React, { useState, useEffect } from "react";
import AddRoomForm from "./AddRoomForm";
import { Trash2, PencilLine } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion, AnimatePresence } from "framer-motion";
const process = import.meta.env;
import axios from 'axios';
import EditRoomForm from "../EditRoomForm";

function RoomTable({ addRoom }) {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [activePopup, setActivePopup] = useState(null);
  const [editRoom, setEditRoom] = useState(null);
  const [weekdayPrice, setWeekdayPrice] = useState("");
  const [weekendPrice, setWeekendPrice] = useState("");
  const itemsPerPage = 10;
  const [editRoomData, setEditRoomData] = useState(null);
const [showEditForm, setShowEditForm] = useState(false);

  const filterRooms = (status) => {
    setCurrentFilter(status);
    if (status === "All") {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(rooms.filter((room) => room.status === status));
    }
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (
      newPage > 0 &&
      newPage <= Math.ceil(filteredRooms.length / itemsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  const displayedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddRoom = (newRoom) => {
    addRoom(newRoom);
    setShowAddForm(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      await fetch(`${process.VITE_HOST_URL}/api/admin/getroomstatus`);
      const response = await fetch(`${process.VITE_HOST_URL}/api/allRooms`);
      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }
      const data = await response.json();
      setRooms(data);
      setFilteredRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleUpdateRoom = (room) => {
    setEditRoom(room);
    setWeekdayPrice(room.price || "");
    setWeekendPrice(room.weekend || "");
  };

  const handleSavePrice = async () => {
    try {
      const updatedRoom = { price: weekdayPrice, weekend: weekendPrice };

      const response = await fetch(
        `${process.VITE_HOST_URL}/api/admin/updateroom/${editRoom.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRoom),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update room prices");
      }

      const updatedData = await response.json();
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room.id === editRoom.id ? updatedData : room))
      );
      setEditRoom(null);
    } catch (error) {
      console.error("Error updating room prices:", error);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      console.log("Attempting to delete room with ID:", roomId);
      // const response = await fetch(`http://localhost:4444/api/admin/deleteroom/${roomId}`, {
      //   method: 'DELETE',
      // });
      const response = await fetch(
        `${process.VITE_HOST_URL}/api/admin/deleteroom/${roomId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete room");
      }
      const data = await response.json();
      console.log(data.message);
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
      setFilteredRooms((prevRooms) =>
        prevRooms.filter((room) => room.id !== roomId)
      );
      setActivePopup(null);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activePopup &&
        !event.target.closest(".profile-popup") &&
        !event.target.closest(".profile-icon-button") &&
        !event.target.closest(".settings-popup") &&
        !event.target.closest(".settings-icon-button") &&
        !event.target.closest(".taxes-popup") &&
        !event.target.closest(".payment-popup")
      ) {
        setActivePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activePopup]);

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col w-full max-w-full bg-white rounded-lg shadow-md">
        <div className="flex flex-col w-full text-sm font-medium border-b border-gray-200 md:flex-row">
          <div className="flex gap-4 p-4 md:gap-2">
            <div
              className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer ${
                currentFilter === "All"
                  ? "bg-[#255d69] text-white border-blue-600"
                  : "text-gray-600 border-gray-400 hover:bg-blue-50"
              }`}
              onClick={() => filterRooms("All")}
            >
              All rooms ({rooms.length})
            </div>
            <div
              className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer ${
                currentFilter === "Available"
                  ? "bg-[#255d69] text-white border-blue-600"
                  : "text-gray-600 border-gray-400 hover:bg-blue-50"
              }`}
              onClick={() => filterRooms("Available")}
            >
              Available (
              {rooms.filter((room) => room.status === "Available").length})
            </div>
          </div>
          <div className="flex gap-4 p-4 md:gap-2">
            <div
              className={`flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer ${
                currentFilter === "Booked"
                  ? "bg-[#255d69] text-white border-blue-600"
                  : "text-gray-600 border-gray-400 hover:bg-blue-50"
              }`}
              onClick={() => filterRooms("Booked")}
            >
              Booked ({rooms.filter((room) => room.status === "Booked").length})
            </div>
            <div className="md:ml-0">
              <button
                className="px-6 py-2.5 text-white bg-[#255d69] hover:bg-[#243947] rounded-lg"
                onClick={() => setShowAddForm(true)}
              >
                Add room
              </button>
            </div>
          </div>
        </div>
        <div className="relative overflow-visible">

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Room ID
                </th> */}
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  City
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Weekday Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Weekend Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Options</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedRooms.map((room, index) => (
                <tr key={index}>
                  {/* <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{room.id}</td> */}
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap capitalize">
                    {room.city}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {room.name}
                  </td>
                  <td className="max-w-lg px-6 py-4 text-sm text-gray-500 min-w-sm">
                    <div className="text-justify break-words whitespace-normal">
                      {room.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-left text-gray-500 whitespace-nowrap">
                    ₹{room.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {" "}
                    ₹{room.weekend}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                        room.status === "Available"
                          ? "text-blue-800 bg-blue-100"
                          : room.status === "Booked"
                          ? "text-red-800 bg-red-100"
                          : room.status === "Reserved"
                          ? "text-green-800 bg-green-100"
                          : room.status === "Waitlist"
                          ? "text-yellow-800 bg-yellow-100"
                          : room.status === "Blocked"
                          ? "text-gray-800 bg-gray-100"
                          : ""
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActivePopup(
                            activePopup === room.id ? null : room.id
                          )
                        }
                        className="text-gray-600 hover:text-gray-900 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <circle cx="12" cy="5" r="2"></circle>
                          <circle cx="12" cy="12" r="2"></circle>
                          <circle cx="12" cy="19" r="2"></circle>
                        </svg>
                      </button>
                      <AnimatePresence>
                        {activePopup === room.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            className="absolute right-0 z-20 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <div className="py-1">
                              <ul>
                                <li>
                                    <button
                                      onClick={() => {
                                        setEditRoomData(room);
                                        setShowEditForm(true);
                                        setActivePopup(null); // close the menu
                                      }}
                                      className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    >
                                      <PencilLine className="w-4 h-4 mr-2 text-yellow-500" />
                                      Edit Room
                                    </button>
                                  </li>

                                <li>
                                  <button
                                    onClick={() => handleUpdateRoom(room)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                  >
                                    <PencilLine className="w-4 h-4 mr-2 text-blue-500" />
                                    Update Price
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => handleDeleteRoom(room.id)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                                    Delete Room
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editRoom && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <motion.div className="p-10 bg-white rounded-lg">
                <h3 className="mb-5 text-xl font-medium">
                  Update Prices for {editRoom.name}
                </h3>
                <div className="mb-5">
                  <label className="mr-5">
                    <b>Weekday</b> Price
                  </label>
                  <input
                    type="number"
                    value={weekdayPrice}
                    onChange={(e) => setWeekdayPrice(e.target.value)}
                    className="p-2 border"
                  />
                </div>
                <div>
                  <label className="mr-5">
                    <b>Weekend</b> Price
                  </label>
                  <input
                    type="number"
                    value={weekendPrice}
                    onChange={(e) => setWeekendPrice(e.target.value)}
                    className="p-2 border"
                  />
                </div>
                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => setEditRoom(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-[#255d69] hover:bg-[#243947] rounded"
                    onClick={handleSavePrice}
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 bg-white border-t border-gray-200">
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              <svg
                className="inline-block w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              Previous
            </button>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex -space-x-px shadow-sm"
              aria-label="Pagination"
            >
              {Array.from(
                { length: Math.ceil(filteredRooms.length / itemsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      i + 1 === currentPage
                        ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </nav>
          </div>
          <div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Next
              <svg
                className="inline-block w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg">
              <AddRoomForm
                onSubmit={handleAddRoom}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          </div>
        )}
        {showEditForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-full max-w-4xl p-8 bg-white rounded-lg">
      <EditRoomForm
        initialData={editRoomData}
        onCancel={() => setShowEditForm(false)}
        onSubmit={async (updatedData) => {
          try {
            const res = await fetch(
              `${process.VITE_HOST_URL}/api/admin/editroom/${editRoomData.id}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
              }
            );

            if (!res.ok) throw new Error("Update failed");

            const updatedRoom = await res.json();

            setRooms((prev) =>
              prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r))
            );
            setFilteredRooms((prev) =>
              prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r))
            );

            setShowEditForm(false);
          } catch (error) {
            console.error("Edit room failed:", error);
          }
        }}
      />
    </div>
  </div>
)}

      </div>
    </div>
  );
}

const roomData = [
  {
    number: "#001",
    bedType: "Double bed",
    floor: "Floor - 1",
    facility: ["AC", "shower", "Double bed", "towel", "bathtub", "TV"],
    status: "Available",
  },
  {
    number: "#002",
    bedType: "Single bed",
    floor: "Floor - 2",
    facility: ["AC", "shower", "Double bed", "towel", "bathtub", "TV"],
    status: "Booked",
  },
  {
    number: "#003",
    bedType: "VIP",
    floor: "Floor - 1",
    facility: ["AC", "shower", "Double bed", "towel", "bathtub", "TV"],
    status: "Booked",
  },
  {
    number: "#004",
    bedType: "VIP",
    floor: "Floor - 1",
    facility: ["AC", "shower", "Double bed", "towel", "bathtub", "TV"],
    status: "Reserved",
  },
  {
    number: "#005",
    bedType: "Single bed",
    floor: "Floor - 1",
    facility: ["AC", "shower", "Double bed", "towel", "bathtub", "TV"],
    status: "Reserved",
  },
  {
    number: "#006",
    bedType: "Double bed",
    floor: "Floor - 2",
    facility: ["AC", "shower", "Double bed", "towel", "bathtub", "TV"],
    status: "Waitlist",
  },
  {
    number: "#007",
    bedType: "Double bed",
    floor: "Floor - 3",
    facility: ["AC", "shower", "Double bed", "towel", "bathtub", "TV"],
    status: "Reserved",
  },
  {
    number: "#008",
    bedType: "Single bed",
    floor: "Floor - 5",
    facility: ["AC", "shower", "Double bed", "towel", "bathtub", "TV"],
    status: "Blocked",
  },
];

export default function App() {
  const [rooms, setRooms] = useState(roomData);

  const firebaseConfig = {
    apiKey: "AIzaSyBRXZB9kPFoD57lsXQSjT_gOZz8cZDc_AU",
    authDomain: "tranquil-trails-70973.firebaseapp.com",
    projectId: "tranquil-trails-70973",
    storageBucket: "tranquil-trails-70973.appspot.com",
    messagingSenderId: "784696713296",
    appId: "1:784696713296:web:3d7047b5e5a0ff6fd37155",
  };

  const generateImageName = (name) => {
    return name.replaceAll(" ", "_");
  };

  const addRoom = async (newRoom) => {
    try {
      const app = initializeApp(firebaseConfig);
      const storage = getStorage();


       var imageURL = new Array();
      
      console.log("hi" + imageURL);
      for (const [i, image] of newRoom.images.entries()) {
        const storageRef = ref(
          storage,
          `rooms/${generateImageName(newRoom.name)}_${i}`
        );

        const snapshot = await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        imageURL.push(downloadURL);
      }

      console.log("IMAGE URLS " + imageURL);
      console.log(newRoom);
      newRoom["images"]=imageURL;

      const response = await axios.post(`${process.VITE_HOST_URL}/api/admin/addroom`, {
       ...newRoom
      });

      if (response.status != 200) {
        throw new Error('Failed to add room');
      }

      const savedRoom = await response.data;
      setRooms(prevRooms => [...prevRooms, savedRoom]);
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  return <RoomTable rooms={rooms} addRoom={addRoom} />;
}
