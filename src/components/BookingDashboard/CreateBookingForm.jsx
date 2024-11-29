import React, { useState, useEffect } from "react";
import { X, Plus, Minus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
const process = import.meta.env;

const CreateBookingForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    idDocument: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: 1,
    numberOfChildren: 0,
    numberOfInfants: 0,
    selectedRooms: [],
    paymentMethod: "",
    transactionId: "",
    totalAmount: 0,
  });

  const [rooms, setRooms] = useState([]);
  const [globalSettings, setGlobalSettings] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const [roomsResponse, settingsResponse] = await Promise.all([
          fetch(`${process.VITE_HOST_URL}/api/allRooms`),
          fetch(`${process.VITE_HOST_URL}/api/admin/global-settings`),
        ]);
        const roomsData = await roomsResponse.json();
        const settingsData = await settingsResponse.json();
        
    //     console.log('Rooms Data:', roomsData); // Debug this
    // console.log('Settings Data:', settingsData); // Debug this

        // setRooms(roomsData);
        console.log(Array.isArray(roomsData) ? roomsData : [])
        setRooms(Array.isArray(roomsData) ? roomsData : []);
        setGlobalSettings(settingsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => {
      const newValue = type === "number" ? parseInt(value, 10) : value;
      const updatedData = { ...prev, [name]: newValue };
  
     
      if (["numberOfAdults", "numberOfChildren"].includes(name) && 
          updatedData.selectedRooms.length > 0 && 
          globalSettings) {
        
        const isWeekendStay =
          isWeekend(updatedData.checkInDate) || isWeekend(updatedData.checkOutDate);
        
        const newTotal = calculateTotalAmount(
          updatedData.selectedRooms,
          isWeekendStay,
          updatedData
        );
  
        updatedData.totalAmount = newTotal;
      }
  
      return updatedData;
    });
  };
  
 
  useEffect(() => {
    if (formData.selectedRooms.length > 0 && globalSettings) {
      const isWeekendStay =
        isWeekend(formData.checkInDate) || isWeekend(formData.checkOutDate);
      
      const newTotal = calculateTotalAmount(
        formData.selectedRooms,
        isWeekendStay,
        formData
      );
      
      setFormData(prev => ({
        ...prev,
        totalAmount: newTotal
      }));
    }
  }, [
    formData.selectedRooms,
    formData.numberOfAdults,
    formData.numberOfChildren,
    formData.checkInDate,
    formData.checkOutDate,
    formData.paymentMethod,
    globalSettings,
  ]);
  
  const handleGuestChange = (type, increment) => {
    setFormData((prev) => {
     
      const newValue = Math.max(
        type === "numberOfAdults" ? 1 : 0,
        prev[type] + increment
      );
  
      
      const updatedData = {
        ...prev,
        [type]: newValue
      };
  
     
      if (updatedData.selectedRooms.length > 0 && globalSettings) {
        const isWeekendStay =
          isWeekend(updatedData.checkInDate) || isWeekend(updatedData.checkOutDate);
        
        const newTotal = calculateTotalAmount(
          updatedData.selectedRooms,
          isWeekendStay,
          {
            ...updatedData,
            numberOfAdults: type === "numberOfAdults" ? newValue : updatedData.numberOfAdults,
            numberOfChildren: type === "numberOfChildren" ? newValue : updatedData.numberOfChildren
          }
        );
  
        updatedData.totalAmount = newTotal;
      }
  
      return updatedData;
    });
  };
  

  const calculateTotalCapacity = (selectedRooms) => {
    return selectedRooms.reduce((total, room) => {
      return total + (room.id === "1729158937285" ? 10 : 3);
    }, 0);
  };

  const isWeekend = (date) => {
    const day = new Date(date).getDay();
    return day === 0 || day === 6;
  };

  const calculateTotalAmount = (selectedRooms, isWeekend, currentFormData = {}) => {
    if (!selectedRooms || selectedRooms.length === 0) {
      return 0;
    }
  
    // Calculate the base amount for selected rooms
    const baseAmount = selectedRooms.reduce((total, room) => {
      let roomPrice = Number(room.price) || 0;
      if (isWeekend && room.weekend) {
        roomPrice = Number(room.weekend) || roomPrice;
      }
      return total + roomPrice;
    }, 0);
  
    let totalAmount = baseAmount;
  
    // Extract required properties with fallback values
    const { numberOfAdults = 0, numberOfChildren = 0, paymentMethod } = currentFormData;
  
    // Add taxes, service charges, and service tax if global settings exist
    if (globalSettings) {
      const { tax = 0, serviceCharges = 0, serviceTaxRate = 0 } = globalSettings.roomTaxesAndCharges || {};
  
      const totalGuests = numberOfAdults + numberOfChildren;
      const serviceTax = serviceTaxRate * totalGuests;
  
      if (paymentMethod === "cash") {
        // Add tax and service charges as a percentage of the base amount
        const taxAndServiceCharge = (baseAmount * (Number(tax) + Number(serviceCharges))) / 100;
        totalAmount += taxAndServiceCharge;
      }
  
      // Add the fixed service tax per person (applies to all payment methods)
      totalAmount += serviceTax;
    }
  
    // Return the rounded total amount
    return Math.round(totalAmount) || 0;
  };
  
  

  const handleRoomSelection = (room) => {
    setFormData((prev) => {
      const isLargeRoom = room.id === '1729158937285';
      const isSelected = prev.selectedRooms.some((r) => r.id === room.id);
  
      let updatedRooms;
  
      if (isLargeRoom) {
        // If the selected room is a large room, toggle its selection
        updatedRooms = isSelected ? [] : [room];
      } else {
        // For regular rooms, toggle their selection while excluding large rooms if selected
        updatedRooms = isSelected
          ? prev.selectedRooms.filter((r) => r.id !== room.id)
          : [...prev.selectedRooms, room].filter((r) => r.id !== '1729158937285');
      }
  
      const totalCapacity = calculateTotalCapacity(updatedRooms);
      const totalGuests = prev.numberOfAdults + prev.numberOfChildren;
  
      if (totalCapacity >= totalGuests || isSelected) {
        const isWeekendStay = isWeekend(prev.checkInDate) || isWeekend(prev.checkOutDate);
        const newTotal = calculateTotalAmount(updatedRooms, isWeekendStay, {
          ...prev,
          selectedRooms: updatedRooms,
        });
  
        return {
          ...prev,
          selectedRooms: updatedRooms,
          totalAmount: newTotal,
        };
      }
  
      // If deselection fails due to capacity constraints, return the current state
      return prev;
    });
  };
  
  

  useEffect(() => {
  
  
    if (formData.selectedRooms.length > 0 && globalSettings) {
      const isWeekendStay =
        isWeekend(formData.checkInDate) || isWeekend(formData.checkOutDate);
      
      const newTotal = calculateTotalAmount(
        formData.selectedRooms,
        isWeekendStay
      );
  
      
      
      setTotalAmount(newTotal);
      setFormData(prev => ({
        ...prev,
        totalAmount: newTotal
      }));
    }
  }, [
    formData.selectedRooms,
    formData.numberOfAdults,
    formData.numberOfChildren,
    formData.checkInDate,
    formData.checkOutDate,
    formData.paymentMethod,
    globalSettings,
  ]);

  const validateForm = () => {
    const newErrors = {};
    const totalGuests = formData.numberOfAdults + formData.numberOfChildren;
    const totalCapacity = calculateTotalCapacity(formData.selectedRooms);

    if (totalGuests > totalCapacity) {
      newErrors.rooms = "Selected rooms cannot accommodate all guests";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Payment method is required";
    }

    if (formData.paymentMethod === "online" && !formData.transactionId) {
      newErrors.transactionId = "Transaction ID is required for online payment";
    }

     

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const isWeekendStay =
        isWeekend(formData.checkInDate) || isWeekend(formData.checkOutDate);
      const totalAmount = calculateTotalAmount(
        formData.selectedRooms,
        isWeekendStay
      );

      const bookingData = {
        ...formData,
        totalAmount,
        paymentStatus:
          formData.paymentMethod === "cash" ? "pending" : "completed",
      };

      onSubmit(bookingData);
      onClose();
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

        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Create New Booking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ID Document (Aadhar/Passport)
            </label>
            <input
              type="text"
              name="idDocument"
              required
              value={formData.idDocument}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Check-in Date
              </label>
              <input
                type="date"
                name="checkInDate"
                required
                value={formData.checkInDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Check-out Date
              </label>
              <input
                type="date"
                name="checkOutDate"
                required
                value={formData.checkOutDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adults
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleGuestChange("numberOfAdults", -1)}
                  className="p-1 border rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  name="numberOfAdults"
                  required
                  min="1"
                  value={formData.numberOfAdults}
                  onChange={handleChange}
                  className="w-16 px-2 py-1 text-center border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleGuestChange("numberOfAdults", 1)}
                  className="p-1 border rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Children
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleGuestChange("numberOfChildren", -1)}
                  className="p-1 border rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  name="numberOfChildren"
                  required
                  min="0"
                  value={formData.numberOfChildren}
                  onChange={handleChange}
                  className="w-16 px-2 py-1 text-center border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleGuestChange("numberOfChildren", 1)}
                  className="p-1 border rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Infants
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleGuestChange("numberOfInfants", -1)}
                  className="p-1 border rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  name="numberOfInfants"
                  required
                  min="0"
                  value={formData.numberOfInfants}
                  onChange={handleChange}
                  className="w-16 px-2 py-1 text-center border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleGuestChange("numberOfInfants", 1)}
                  className="p-1 border rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Room Selection */}
          <div className="space-y-4">
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
                      checked={formData.selectedRooms.some(
                        (r) => r.id === room.id
                      )}
                      onChange={() => handleRoomSelection(room)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{room.name}</h4>
                      {/* <p className="text-sm text-gray-500">{room.description}</p> */}
                      <p className="mt-1">
                        Capacity: {room.id === "1729158937285" ? "10" : "3"}{" "}
                        guests
                      </p>
                      <p className="mt-1">
                        Price: ₹{room.price}{" "}
                        {room.weekend && `(Weekend: ₹${room.weekend})`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.rooms && (
              <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{errors.rooms}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Details</h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "paymentMethod",
                          value: e.target.value,
                        },
                      })
                    }
                  />
                  <span>Cash Payment</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === "online"}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "paymentMethod",
                          value: e.target.value,
                        },
                      })
                    }
                  />
                  <span>Online Payment</span>
                </label>
              </div>

              {formData.paymentMethod === "online" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Transaction ID
                  </label>
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
                <label className="block text-sm font-medium text-gray-700">
                  Total Amount
                </label>
                <input
                  type="text" 
                  name="totalAmount"
                  value={`₹${formData.totalAmount.toLocaleString()}`} 
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  readOnly
                />
                {formData.paymentMethod === "cash" && globalSettings && (
                  <div className="mt-1 text-sm text-gray-500">
                    <p>Includes:</p>
                    <ul className="ml-4 list-disc">
                      <li>{globalSettings.roomTaxesAndCharges.tax}% tax</li>
                      <li>
                        {globalSettings.roomTaxesAndCharges.serviceCharges}%
                        service charges
                      </li>
                      <li>
                        Service tax of ₹
                        {globalSettings.roomTaxesAndCharges.serviceTaxRate} per
                        person (
                        {formData.numberOfAdults + formData.numberOfChildren}{" "}
                        guests)
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isSubmitting ? "Creating Booking..." : "Create Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingForm;
