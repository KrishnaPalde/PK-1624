import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

function EditRoomForm({ initialData, onSubmit, onCancel }) {
  const [room, setRoom] = useState({ ...initialData });
  const [propertyOptions, setPropertyOptions] = useState([]);

  useEffect(() => {
    if (!room.isProperty) {
      fetch(`${import.meta.env.VITE_HOST_URL}/api/admin/rooms/properties`)
        .then((res) => res.json())
        .then(setPropertyOptions)
        .catch(console.error);
    }
  }, [room.isProperty]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoom((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRoom = {
      name: room.name,
      title: room.title,
      description: room.description,
      price: Number(room.price),
      weekend: Number(room.weekend),
      rating: Number(room.rating),
    };
    onSubmit(updatedRoom);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="mb-6 text-2xl font-bold">Edit Room</h2>

      {/* Disabled IsProperty */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="isProperty"
          checked={room.isProperty}
          disabled
          className="w-4 h-4 cursor-not-allowed"
        />
        <label className="text-sm font-medium text-gray-700">Is this an entire property package?</label>
      </div>

      {/* Disabled Property Ref */}
      {!room.isProperty && (
        <div>
          <label className="block mb-1 font-medium text-gray-700">Select Parent Property</label>
          <select
            name="propertyRef"
            value={room.propertyRef}
            disabled
            className="w-full px-3 py-2 border rounded cursor-not-allowed bg-gray-100"
          >
            <option value="">Select a property</option>
            {propertyOptions.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Editable fields */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={room.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={room.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-1 font-medium text-gray-700">City</label>
        <input
          type="text"
          name="city"
          value={room.city}
          disabled
          className="w-full px-3 py-2 border rounded cursor-not-allowed bg-gray-100 capitalize"
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={room.description}
          onChange={handleChange}
          rows={6}
          className="w-full px-3 py-2 border rounded"
          required
        ></textarea>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block mb-1">Weekday Price</label>
          <input
            type="number"
            name="price"
            value={room.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1">Weekend Price</label>
          <input
            type="number"
            name="weekend"
            value={room.weekend}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1">Rating</label>
          <input
            type="number"
            name="rating"
            value={room.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      {/* Disabled image section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="flex flex-wrap gap-4 mt-2">
          {room.images && room.images.length > 0 ? (
            room.images.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Room image ${index + 1}`}
                  className="object-cover w-24 h-24 rounded-lg shadow-md"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No images available</p>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">Images cannot be edited here.</p>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-[#255d69] hover:bg-[#243947] rounded"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default EditRoomForm;
