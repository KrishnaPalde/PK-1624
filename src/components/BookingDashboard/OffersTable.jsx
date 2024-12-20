import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, PencilLine, Upload } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const process = import.meta.env;

const firebaseConfig = {
  apiKey: "AIzaSyBRXZB9kPFoD57lsXQSjT_gOZz8cZDc_AU",
  authDomain: "tranquil-trails-70973.firebaseapp.com",
  projectId: "tranquil-trails-70973",
  storageBucket: "tranquil-trails-70973.appspot.com",
  messagingSenderId: "784696713296",
  appId: "1:784696713296:web:3d7047b5e5a0ff6fd37155",
};

const OffersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [couponForm, setCouponForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    type: "",
    expirationDate: "",
    conditions: {
      advanceBookingDays: null,
      minBookingAmount: null,
      minLengthOfStay: null,
      seasonStartDate: null,
      seasonEndDate: null,
      applicableRoomTypes: [],
    },
    isActive: true,
  });
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const generateImageName = (code) => {
    return code.toLowerCase().replaceAll(" ", "_");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToFirebase = async (code, image) => {
    if (!image) return null;
    
    const storageRef = ref(
      storage,
      `coupons/${generateImageName(code)}_${Date.now()}`
    );

    const snapshot = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${process.VITE_HOST_URL}/api/offers/all-coupons`
        );
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [currentPage]);

  useEffect(() => {
    const fetchRooms = async () => {
      if (couponForm.type === "Room Type") {
        try {
          const response = await fetch(
            `${process.VITE_HOST_URL}/api/admin/rooms`
          );
          const data = await response.json();
          setRooms(data);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      }
    };

    fetchRooms();
  }, [couponForm.type]);

  const totalItems = bookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const headers = [
    { title: "Coupon Code", width: "w-[217px]" },
    { title: "Discount Type", width: "w-[217px]" },
    { title: "Coupon Type", width: "w-[257px]" },
    { title: "Discount Value", width: "w-[217px]" },
    { title: "Is Active", width: "flex-1" },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBookings = bookings.slice(startIndex, endIndex);

  const handleCouponFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "isActive") {
      setCouponForm({
        ...couponForm,
        [name]: value === "true",
      });
    } else {
      setCouponForm({
        ...couponForm,
        [name]: value,
      });
    }
  };

  const handleConditionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCouponForm((prevForm) => ({
      ...prevForm,
      conditions: {
        ...prevForm.conditions,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleRoomSelection = (roomName) => {
    let updatedRoomTypes;
    if (couponForm.conditions.applicableRoomTypes.includes(roomName)) {
      updatedRoomTypes = couponForm.conditions.applicableRoomTypes.filter(
        (name) => name !== roomName
      );
    } else {
      updatedRoomTypes = [
        ...couponForm.conditions.applicableRoomTypes,
        roomName,
      ];
    }

    setCouponForm({
      ...couponForm,
      conditions: {
        ...couponForm.conditions,
        applicableRoomTypes: updatedRoomTypes,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let image = null;
      if (selectedImage) {
        image = await uploadImageToFirebase(couponForm.code, selectedImage);
      }

      const response = await fetch(
        `${process.VITE_HOST_URL}/api/admin/offers/create-coupon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...couponForm,
            image: image
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Coupon created successfully!");
        setShowModal(false);
        setSelectedImage(null);
        setImagePreview(null);
        const updatedBookings = await fetch(
          `${process.VITE_HOST_URL}/api/offers/all-coupons`
        ).then((res) => res.json());
        setBookings(updatedBookings);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.VITE_HOST_URL}/api/offers/update-coupon/${selectedCoupon._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(couponForm),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Coupon updated successfully!");
        setShowUpdateModal(false);
        const updatedBookings = await fetch(
          `${process.VITE_HOST_URL}/api/offers/all-coupons`
        ).then((res) => res.json());
        setBookings(updatedBookings);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating coupon:", error);
    }
  };

  const handleUpdateCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      type: coupon.type,
      conditions: {
        advanceBookingDays: coupon.conditions.advanceBookingDays || "",
        minBookingAmount: coupon.conditions.minBookingAmount || "",
        minLengthOfStay: coupon.conditions.minLengthOfStay || "",
        seasonStartDate: coupon.conditions.seasonStartDate
          ? new Date(coupon.conditions.seasonStartDate)
              .toISOString()
              .split("T")[0]
          : "",
        seasonEndDate: coupon.conditions.seasonEndDate
          ? new Date(coupon.conditions.seasonEndDate)
              .toISOString()
              .split("T")[0]
          : "",
        applicableRoomTypes: coupon.conditions.applicableRoomTypes || [],
      },
      expirationDate: coupon.expirationDate
        ? new Date(coupon.expirationDate).toISOString().split("T")[0]
        : "",
      isActive: coupon.isActive,
    });
    setShowUpdateModal(true);
  };

  const handleDeleteCoupon = async (couponCode) => {
    try {
      const response = await fetch(
        `${process.VITE_HOST_URL}/api/admin/offers/delete-coupon/${couponCode}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Coupon deleted successfully!");
        const updatedBookings = await fetch(
          `${process.VITE_HOST_URL}/api/offers/all-coupons`
        ).then((res) => res.json());
        setBookings(updatedBookings);
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 text-white transition bg-[#255d69] hover:bg-[#243947] rounded-lg "
          onClick={() => setShowModal(true)}
        >
          Create Coupon
        </button>
      </div>

      <section className="w-full overflow-hidden bg-white shadow-md rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={`px-4 py-2 text-xs font-medium text-left text-gray-500 ${header.width}`}
                  >
                    {header.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedBookings.map((booking, index) => (
                <tr key={index} className="border-t border-indigo-50 ">
                  {/* <td className="px-4 py-4 whitespace-nowrap">
                    #{booking._id}
                  </td> */}
                  <td className="py-4 pl-4">{booking.code}</td>
                  <td className="px-4 py-4 capitalize">
                    {booking.discountType}
                  </td>
                  <td className="px-4 py-4 ">{booking.type}</td>
                  <td className="px-4 py-4">{booking.discountValue}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        booking.isActive ? "bg-green-200" : "bg-red-200"
                      }`}
                    >
                      {booking.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActivePopup(
                            activePopup === booking._id ? null : booking._id
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
                        {activePopup === booking._id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <div className="py-1">
                              <ul>
                                <li>
                                  <button
                                    onClick={() => handleUpdateCoupon(booking)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                  >
                                    <PencilLine className="w-4 h-4 mr-2 text-blue-500" />
                                    Update
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() =>
                                      handleDeleteCoupon(booking.code)
                                    }
                                    className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                                    Delete
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
        </div>
        <nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, totalItems)}
                </span>{" "}
                of <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav
                className="inline-flex rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <FaChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page + 1}
                    onClick={() => setCurrentPage(page + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                      ${
                        page + 1 === currentPage
                          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <FaChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </nav>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative">
            <IoClose
              className="absolute text-2xl cursor-pointer top-3 right-3"
              onClick={() => setShowModal(false)}
            />
            <h2 className="mb-4 text-xl font-semibold">Create Coupon</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="code" className="font-medium">
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  className="p-2 uppercase border rounded"
                  onChange={handleCouponFormChange}
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col">
                  <label className="font-medium">Discount Type</label>
                  <div className="flex items-center space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="discountType"
                        value="percentage"
                        checked={couponForm.discountType === "percentage"}
                        onChange={handleCouponFormChange}
                      />
                      Percentage
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="discountType"
                        value="fixed"
                        checked={couponForm.discountType === "fixed"}
                        onChange={handleCouponFormChange}
                      />
                      Fixed
                    </label>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="type" className="font-medium">
                    Coupon Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="p-2 border rounded "
                    value={couponForm.type}
                    onChange={handleCouponFormChange}
                    required
                  >
                    <option value="" disabled>
                      Select Coupon Type
                    </option>
                    <option value="Advance Booking">Advance Booking</option>
                    <option value="Minimum Booking Amount">
                      Minimum Booking Amount
                    </option>
                    <option value="Length of Stay">Length of Stay</option>
                    <option value="Seasonal Promotion">
                      Seasonal Promotion
                    </option>
                    <option value="Room Type">Room Type</option>
                    <option value="Fixed Amount">Fixed Amount</option>
                  </select>
                </div>
              </div>

              {couponForm.type === "Advance Booking" && (
                <div className="flex flex-col">
                  <label htmlFor="advanceBookingDays" className="font-medium">
                    Advance Booking Days
                  </label>
                  <input
                    type="number"
                    id="advanceBookingDays"
                    name="advanceBookingDays"
                    className="p-2 border rounded"
                    value={couponForm.conditions.advanceBookingDays || ""}
                    onChange={handleConditionChange}
                  />
                </div>
              )}
              {couponForm.type === "Minimum Booking Amount" && (
                <div className="flex flex-col">
                  <label htmlFor="minBookingAmount" className="font-medium">
                    Minimum Booking Amount
                  </label>
                  <input
                    type="number"
                    id="minBookingAmount"
                    name="minBookingAmount"
                    className="p-2 border rounded"
                    value={couponForm.conditions.minBookingAmount || ""}
                    onChange={handleConditionChange}
                  />
                </div>
              )}
              {couponForm.type === "Length of Stay" && (
                <div className="flex flex-col">
                  <label htmlFor="minLengthOfStay" className="font-medium">
                    Minimum Length of Stay
                  </label>
                  <input
                    type="number"
                    id="minLengthOfStay"
                    name="minLengthOfStay"
                    className="p-2 border rounded"
                    value={couponForm.conditions.minLengthOfStay || ""}
                    onChange={handleConditionChange}
                  />
                </div>
              )}
              {couponForm.type === "Seasonal Promotion" && (
                <div className="flex flex-row space-x-4">
                  <div>
                    <label htmlFor="seasonStartDate" className="font-medium">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="seasonStartDate"
                      name="seasonStartDate"
                      className="p-2 border rounded"
                      value={couponForm.conditions.seasonStartDate || ""}
                      onChange={handleConditionChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="seasonEndDate" className="font-medium">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="seasonEndDate"
                      name="seasonEndDate"
                      className="p-2 border rounded"
                      value={couponForm.conditions.seasonEndDate || ""}
                      onChange={handleConditionChange}
                    />
                  </div>
                </div>
              )}
              {couponForm.type === "Room Type" && (
                <div className="flex flex-col">
                  <label className="font-medium">Applicable Rooms</label>
                  <div className="overflow-y-auto max-h-40">
                    {rooms.map((room) => (
                      <label key={room._id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={couponForm.conditions.applicableRoomTypes.includes(
                            room.name
                          )}
                          onChange={() => handleRoomSelection(room.name)}
                          className="mr-2"
                        />
                        {room.name}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col">
                <label htmlFor="discountValue" className="font-medium">
                  Discount Value
                </label>
                <input
                  type="number"
                  id="discountValue"
                  name="discountValue"
                  className="p-2 border rounded"
                  value={couponForm.discountValue}
                  onChange={handleCouponFormChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="expirationDate" className="font-medium">
                  Expiration Date
                </label>
                <input
                  type="date"
                  id="expirationDate"
                  name="expirationDate"
                  className="p-2 border rounded"
                  value={couponForm.expirationDate}
                  onChange={handleCouponFormChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Is Active</label>
                <div className="flex items-center space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="isActive"
                      value="true"
                      checked={couponForm.isActive === true}
                      onChange={handleCouponFormChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="isActive"
                      value="false"
                      checked={couponForm.isActive === false}
                      onChange={handleCouponFormChange}
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-medium">Coupon Image</label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center px-4 py-2 space-x-2 text-white bg-[#255d69] hover:bg-[#243947] rounded cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Choose Image</span>
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="relative w-20 h-20">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="object-cover w-full h-full rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                        }}
                        className="absolute top-0 right-0 p-1 -mt-2 -mr-2 text-white bg-red-500 rounded-full"
                      >
                        <IoClose className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[#255d69] hover:bg-[#243947] rounded "
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative">
            <IoClose
              className="absolute text-2xl cursor-pointer top-3 right-3"
              onClick={() => setShowUpdateModal(false)}
            />
            <h2 className="mb-4 text-xl font-semibold">Update Coupon</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="code" className="font-medium">
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  className="p-2 uppercase border rounded"
                  value={couponForm.code}
                  onChange={handleCouponFormChange}
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col">
                  <label className="font-medium">Discount Type</label>
                  <div className="flex items-center space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="discountType"
                        value="percentage"
                        checked={couponForm.discountType === "percentage"}
                        onChange={handleCouponFormChange}
                      />
                      Percentage
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="discountType"
                        value="fixed"
                        checked={couponForm.discountType === "fixed"}
                        onChange={handleCouponFormChange}
                      />
                      Fixed
                    </label>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="type" className="font-medium">
                    Coupon Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="p-2 border rounded"
                    value={couponForm.type}
                    onChange={handleCouponFormChange}
                    required
                  >
                    <option value="" disabled>
                      Select Coupon Type
                    </option>
                    <option value="Advance Booking">Advance Booking</option>
                    <option value="Minimum Booking Amount">
                      Minimum Booking Amount
                    </option>
                    <option value="Length of Stay">Length of Stay</option>
                    <option value="Seasonal Promotion">
                      Seasonal Promotion
                    </option>
                    <option value="Room Type">Room Type</option>
                    <option value="Fixed Amount">Fixed Amount</option>
                  </select>
                </div>
              </div>

              {couponForm.type === "Advance Booking" && (
                <div className="flex flex-col">
                  <label htmlFor="advanceBookingDays" className="font-medium">
                    Advance Booking Days
                  </label>
                  <input
                    type="number"
                    id="advanceBookingDays"
                    name="advanceBookingDays"
                    className="p-2 border rounded"
                    value={couponForm.conditions.advanceBookingDays || ""}
                    onChange={handleConditionChange}
                  />
                </div>
              )}
              {couponForm.type === "Minimum Booking Amount" && (
                <div className="flex flex-col">
                  <label htmlFor="minBookingAmount" className="font-medium">
                    Minimum Booking Amount
                  </label>
                  <input
                    type="number"
                    id="minBookingAmount"
                    name="minBookingAmount"
                    className="p-2 border rounded"
                    value={couponForm.conditions.minBookingAmount || ""}
                    onChange={handleConditionChange}
                  />
                </div>
              )}
              {couponForm.type === "Length of Stay" && (
                <div className="flex flex-col">
                  <label htmlFor="minLengthOfStay" className="font-medium">
                    Minimum Length of Stay
                  </label>
                  <input
                    type="number"
                    id="minLengthOfStay"
                    name="minLengthOfStay"
                    className="p-2 border rounded"
                    value={couponForm.conditions.minLengthOfStay || ""}
                    onChange={handleConditionChange}
                  />
                </div>
              )}
              {couponForm.type === "Seasonal Promotion" && (
                <div className="flex flex-row space-x-4">
                  <div>
                    <label htmlFor="seasonStartDate" className="font-medium">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="seasonStartDate"
                      name="seasonStartDate"
                      className="p-2 border rounded"
                      value={couponForm.conditions.seasonStartDate || ""}
                      onChange={handleConditionChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="seasonEndDate" className="font-medium">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="seasonEndDate"
                      name="seasonEndDate"
                      className="p-2 border rounded"
                      value={couponForm.conditions.seasonEndDate || ""}
                      onChange={handleConditionChange}
                    />
                  </div>
                </div>
              )}
              {couponForm.type === "Room Type" && (
                <div className="flex flex-col">
                  <label className="font-medium">Applicable Rooms</label>
                  <div className="overflow-y-auto max-h-40">
                    {rooms.map((room) => (
                      <label key={room._id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={couponForm.conditions.applicableRoomTypes.includes(
                            room.name
                          )}
                          onChange={() => handleRoomSelection(room.name)}
                          className="mr-2"
                        />
                        {room.name}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col">
                <label htmlFor="discountValue" className="font-medium">
                  Discount Value
                </label>
                <input
                  type="number"
                  id="discountValue"
                  name="discountValue"
                  className="p-2 border rounded"
                  value={couponForm.discountValue}
                  onChange={handleCouponFormChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="expirationDate" className="font-medium">
                  Expiration Date
                </label>
                <input
                  type="date"
                  id="expirationDate"
                  name="expirationDate"
                  className="p-2 border rounded"
                  value={couponForm.expirationDate}
                  onChange={handleCouponFormChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Is Active</label>
                <div className="flex items-center space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="isActive"
                      value="true"
                      checked={couponForm.isActive === true}
                      onChange={handleCouponFormChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="isActive"
                      value="false"
                      checked={couponForm.isActive === false}
                      onChange={handleCouponFormChange}
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[#255d69] hover:bg-[#243947] rounded"
                >
                  Update Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default OffersTable;
