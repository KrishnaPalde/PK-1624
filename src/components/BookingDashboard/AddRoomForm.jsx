import React, { useState } from "react";

function AddRoomForm({ onSubmit, onCancel }) {
  const [room, setRoom] = useState({
    name: "",
    title: "",
    description: "",
    price: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setRoom((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(room);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-2xl font-bold">Add New Room</h2>
      <div>
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
      <div>
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
      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={room.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        ></textarea>
      </div>
      <div>
        <label className="block mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={room.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Images (max 5)</label>
        <input
          type="file"
          onChange={handleImageChange}
          multiple
          accept="image/*"
          className="w-full"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Add Room
        </button>
      </div>
    </form>
  );
}

export default AddRoomForm;