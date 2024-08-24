import React, { useState } from "react";
import AddRoomForm from "./AddRoomForm";

function RoomTable({ rooms, addRoom }) {
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const itemsPerPage = 10;

  const filterRooms = (status) => {
    if (status === "All") {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(rooms.filter(room => room.status === status));
    }
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(filteredRooms.length / itemsPerPage)) {
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

  
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col w-full max-w-full bg-white rounded-lg shadow-md">
        

<div className="flex flex-col w-full text-sm font-medium border-b border-gray-200 md:flex-row">
          <div className="flex gap-4 p-4 md:gap-2">
            <div
              className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full cursor-pointer bg-indigo-50"
              onClick={() => filterRooms("All")}
            >
              All rooms ({rooms.length})
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-full cursor-pointer"
              onClick={() => filterRooms("Available")}
            >
              Available ({rooms.filter(room => room.status === 'Available').length})
            </div>
          </div>
          <div className="flex gap-4 p-4 md:gap-2">
            <div
              className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-full cursor-pointer"
              onClick={() => filterRooms("Booked")}
            >
              Booked ({rooms.filter(room => room.status === 'Booked').length})
            </div>
            <div className=" md:ml-0">
              <button className="px-6 py-2.5 text-white bg-blue-500 rounded-lg" onClick={() => setShowAddForm(true)}>
                Add room
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Room number
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Bed type
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Room floor
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Room facility
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
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
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{room.number}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{room.bedType}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{room.floor}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {room.facility.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                        room.status === 'Available'
                          ? 'text-blue-800 bg-blue-100'
                          : room.status === 'Booked'
                          ? 'text-red-800 bg-red-100'
                          : room.status === 'Reserved'
                          ? 'text-green-800 bg-green-100'
                          : room.status === 'Waitlist'
                          ? 'text-yellow-800 bg-yellow-100'
                          : room.status === 'Blocked'
                          ? 'text-gray-800 bg-gray-100'
                          : ''
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="2"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                        <circle cx="12" cy="19" r="2"></circle>
                      </svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            <nav className="relative z-0 inline-flex -space-x-px shadow-sm" aria-label="Pagination">
              {Array.from({ length: Math.ceil(filteredRooms.length / itemsPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    i + 1 === currentPage
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
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
            <div className="w-full max-w-md p-8 bg-white rounded-lg">
              <AddRoomForm onSubmit={handleAddRoom} onCancel={() => setShowAddForm(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const roomData = [
  { number: '#001', bedType: 'Double bed', floor: 'Floor - 1', facility: ['AC', 'shower', 'Double bed', 'towel', 'bathtub', 'TV'], status: 'Available' },
  { number: '#002', bedType: 'Single bed', floor: 'Floor - 2', facility: ['AC', 'shower', 'Double bed', 'towel', 'bathtub', 'TV'], status: 'Booked' },
  { number: '#003', bedType: 'VIP', floor: 'Floor - 1', facility: ['AC', 'shower', 'Double bed', 'towel', 'bathtub', 'TV'], status: 'Booked' },
  { number: '#004', bedType: 'VIP', floor: 'Floor - 1', facility: ['AC', 'shower', 'Double bed', 'towel', 'bathtub', 'TV'], status: 'Reserved' },
  { number: '#005', bedType: 'Single bed', floor: 'Floor - 1', facility: ['AC', 'shower', 'Double bed', 'towel', 'bathtub', 'TV'], status: 'Reserved' },
  { number: '#006', bedType: 'Double bed', floor: 'Floor - 2', facility: ['AC', 'shower', 'Double bed', 'towel', 'bathtub', 'TV'], status: 'Waitlist' },
  { number: '#007', bedType: 'Double bed', floor: 'Floor - 3', facility: ['AC', 'shower', 'Double bed', 'towel', 'bathtub', 'TV'], status: 'Reserved' },
  { number: '#008', bedType: 'Single bed', floor: 'Floor - 5', facility: ['AC', 'shower', 'Double bed', 'towel', 'bathtub', 'TV'], status: 'Blocked' },
];

export default function App() {
  const [rooms, setRooms] = useState(roomData);

  const addRoom = async (newRoom) => {
    try {
      const formData = new FormData();
      Object.keys(newRoom).forEach(key => {
        if (key === 'images') {
          newRoom[key].forEach(image => formData.append('images', image));
        } else {
          formData.append(key, newRoom[key]);
        }
      });

      const response = await fetch('http://localhost:4444/api/admin/addroom', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add room');
      }

      const savedRoom = await response.json();
      setRooms(prevRooms => [...prevRooms, savedRoom]);
    } catch (error) {
      console.error('Error adding room:', error);
      
    }
  };

  return <RoomTable rooms={rooms} addRoom={addRoom} />;
}