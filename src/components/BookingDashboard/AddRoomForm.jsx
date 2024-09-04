// import React, { useState } from "react";

// function AddRoomForm({ onSubmit, onCancel }) {
//   const [room, setRoom] = useState({
//     name: "",
//     title: "",
//     description: "",
//     price: "",
//     weekend: "",
//     images: [],
//     amenities: "",
//     freebies: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRoom((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setRoom((prev) => ({ ...prev, images: files }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const amenitiesArray = room.amenities
//       .split(',')
//       .map(item => item.trim())
//       .filter(item => item !== '');
//     const freebiesArray = room.freebies
//       .split(',')
//       .map(item => item.trim())
//       .filter(item => item !== '');
//     onSubmit({ ...room, amenities: amenitiesArray, freebies: freebiesArray });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <h2 className="mb-4 text-2xl font-bold">Add New Room</h2>
//       <div className="flex space-x-4">
//         <div className="flex-1">
//           <label className="block mb-1">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={room.name}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <div className="flex-1">
//           <label className="block mb-1">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={room.title}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//       </div>
//       <div>
//         <label className="block mb-1">Description</label>
//         <textarea
//           name="description"
//           value={room.description}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//           required
//         ></textarea>
//       </div>
//       <div className="flex space-x-4">
//         <div className="flex-1">
//           <label className="block mb-1">Price</label>
//           <input
//             type="number"
//             name="price"
//             value={room.price}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <div className="flex-1">
//           <label className="block mb-1">Weekend Price</label>
//           <input
//             type="number"
//             name="weekend"
//             value={room.weekend}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//       </div>
//       <div>
//         <label className="block mb-1">Images (max 5)</label>
//         <input
//           type="file"
//           onChange={handleImageChange}
//           multiple
//           accept="image/*"
//           className="w-full"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Amenities (comma-separated)</label>
//         <input
//           type="text"
//           name="amenities"
//           value={room.amenities}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//           placeholder="e.g. Pool, TV, Air Conditioning"
//         />
//       </div>
//       <div>
//         <label className="block mb-1">Freebies (comma-separated)</label>
//         <input
//           type="text"
//           name="freebies"
//           value={room.freebies}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//           placeholder="e.g. Internet, Breakfast, Parking"
//         />
//       </div>
//       <div className="flex justify-end space-x-2">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 text-gray-600 border rounded"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 text-white bg-blue-500 rounded"
//         >
//           Add Room
//         </button>
//       </div>
//     </form>
//   );
// }

// export default AddRoomForm;


import React, { useState } from "react";
import { X } from "lucide-react";

function AddRoomForm({ onSubmit, onCancel }) {
  const [room, setRoom] = useState({
    name: "",
    title: "",
    description: "",
    price: "",
    weekend: "",
    images: [],
    amenities: "",
    freebies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setRoom((prev) => ({ ...prev, images: [...prev.images, ...files].slice(0, 5) }));
  };

  const handleRemoveImage = (index) => {
    setRoom((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amenitiesArray = room.amenities
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '');
    const freebiesArray = room.freebies
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '');
    onSubmit({ ...room, amenities: amenitiesArray, freebies: freebiesArray });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="mb-6 text-2xl font-bold">Add New Room</h2>
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
      <div className="flex space-x-4">
        <div className="flex-1">
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
        <div className="flex-1">
          <label className="block mb-1">Weekend Price</label>
          <input
            type="number"
            name="weekend"
            value={room.weekend}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Images (max 5)</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              type="file"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
        {room.images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {room.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Room image ${index + 1}`}
                  className="object-cover w-24 h-24 rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 p-1 text-white transition-opacity bg-red-500 opacity-0 group-hover:opacity-100"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
         <label className="block mb-1">Amenities (comma-separated)</label>
         <input
          type="text"
          name="amenities"
          value={room.amenities}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g. Pool, TV, Air Conditioning"
        />
      </div>
      <div>
        <label className="block mb-1">Freebies (comma-separated)</label>
        <input
          type="text"
          name="freebies"
          value={room.freebies}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g. Internet, Breakfast, Parking"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 transition-colors border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
        >
          Add Room
        </button>
      </div>
    </form>
  );
}

export default AddRoomForm;