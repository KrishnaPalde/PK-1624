import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";

const process = import.meta.env;

const CreateBookingForm = ({ isOpen, onClose}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    idDocument: "",
    checkInDate: "",
    checkOutDate: "",
    guestCount: 1,
    selectedRooms: [],
    paymentMethod: "",
    transactionId: "",
    totalAmount: 0,
  });

  const [rooms, setRooms] = useState([]);
  const [globalSettings, setGlobalSettings] = useState(null);
  const [errors, setErrors] = useState({});
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // Step tracking state

  const fetchRooms = async () => {
    if (!formData.checkInDate || !formData.checkOutDate) return;

    try {
      const checkInDateISO = new Date(formData.checkInDate).toISOString();
      const checkOutDateISO = new Date(formData.checkOutDate).toISOString();
      const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/rooms`, {
        params: {
          checkinDate: checkInDateISO,
          checkoutDate: checkOutDateISO,
        },
      });
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsResponse, unavailableDatesResponse] = await Promise.all([
          axios.get(`${process.VITE_HOST_URL}/api/admin/global-settings`),
          axios.get(`${process.VITE_HOST_URL}/api/unavailable_dates`),
        ]);
        setGlobalSettings(settingsResponse.data);
        setUnavailableDates(unavailableDatesResponse.data.unavailableDates || []);
      } catch (error) {
        console.error("Failed to fetch global settings or unavailable dates:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [formData.checkInDate, formData.checkOutDate]);

  const isDateUnavailable = (date) => {
    if (!date || isNaN(new Date(date))) {
      return false;
    }
    const formattedDate = format(new Date(date), "yyyy-MM-dd");
    return unavailableDates.some((unavailableDate) => unavailableDate.date === formattedDate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "checkInDate" || name === "checkOutDate") && isDateUnavailable(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dates: "Selected date is unavailable. Please choose another date.",
      }));
      return;
    }

    setErrors((prevErrors) => ({ ...prevErrors, dates: null }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [formData.checkInDate, formData.checkOutDate, formData.selectedRooms]);
  

  const calculateTotalAmount = () => {
    if (!formData.checkInDate || !formData.checkOutDate || formData.selectedRooms.length === 0) {
      setFormData((prev) => ({ ...prev, totalAmount: 0 }));
      return;
    }
  
    const numberOfNights = differenceInCalendarDays(
      new Date(formData.checkOutDate),
      new Date(formData.checkInDate)
    );
  
    // Base room price calculation
    let baseAmount = formData.selectedRooms.reduce(
      (total, room) => total + room.price * numberOfNights,
      0
    );
  
    if (globalSettings) {
      const { tax, serviceCharges } = globalSettings.roomTaxesAndCharges || {};
      const taxAmount = (baseAmount * tax) / 100;
  
      // Service charge calculation (fixed per person)
      const totalGuests = formData.guestCount || formData.numberOfAdults + formData.numberOfChildren;
      const serviceChargeAmount = totalGuests * serviceCharges;
  
      baseAmount += taxAmount + serviceChargeAmount;
    }
  
    setFormData((prev) => ({ ...prev, totalAmount: baseAmount }));
  };
  
  

  const validateForm = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.checkInDate || !formData.checkOutDate) {
        newErrors.dates = "Check-in and Check-out dates are required.";
      } else if (isDateUnavailable(formData.checkInDate) || isDateUnavailable(formData.checkOutDate)) {
        newErrors.dates = "Selected dates are unavailable.";
      }
    }

    if (step === 2 && formData.selectedRooms.length === 0) {
      newErrors.rooms = "Select at least one room.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      setIsSubmitting(true);
  
      // Prepare the payload to match the required backend format
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        idDocument: formData.idDocument,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        guestCount: formData.guestCount,
        selectedRooms: formData.selectedRooms.map((room) => ({
          id: room.id,
          name: room.name,
          price: room.price,
        })),
        paymentMethod: formData.paymentMethod,
        totalAmount: formData.totalAmount,
      };
  
      try {
        const response = await axios.post(`${process.VITE_HOST_URL}/api/custom_booking`, payload);
        // onSubmit(response.data);
        onClose();
      } catch (error) {
        console.error("Error submitting booking:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute p-2 text-gray-500 hover:text-gray-700 right-4 top-4"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Create New Booking</h2>

        {/* Step 1: Select Dates */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  min={format(new Date(), "yyyy-MM-dd")}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  min={formData.checkInDate || format(new Date(), "yyyy-MM-dd")}
                  required
                />
              </div>
            </div>
            {errors.dates && <p className="text-red-500">{errors.dates}</p>}
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Select Rooms and Fill Guest Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Room Selection</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-4 border rounded-lg ${
                    formData.selectedRooms.some((r) => r.id === room.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={formData.selectedRooms.some((r) => r.id === room.id)}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedRooms: prev.selectedRooms.some((r) => r.id === room.id)
                            ? prev.selectedRooms.filter((r) => r.id !== room.id)
                            : [...prev.selectedRooms, room],
                        }))
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{room.name}</h4>
                      <p className="mt-1">Capacity: {room.capacity} guests</p>
                      <p className="mt-1">Price: ₹{room.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.rooms && <p className="text-red-500">{errors.rooms}</p>}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">ID Document Number (Aadhar/Passport)</label>
                  <input
                    type="text"
                    name="idDocument"
                    value={formData.idDocument}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>  
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount || formData.numberOfAdults + formData.numberOfChildren}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        guestCount: Math.max(1, parseInt(e.target.value, 10)), // Ensure at least 1 guest
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                
              </div>
            
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Details */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Payment Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleChange}
                  />
                  <span>Cash</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === "online"}
                    onChange={handleChange}
                  />
                  <span>Online</span>
                </label>
              </div>
            </div>
            {formData.paymentMethod === "online" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Amount</label>
              <input
                type="text"
                value={`₹${formData.totalAmount.toLocaleString()}`}
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
                readOnly
              />
              </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Previous
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Create Booking"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBookingForm;
