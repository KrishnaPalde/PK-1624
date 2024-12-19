import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    bookingPurpose: "", // Dropdown: Uttarakhand Tour, Party/Get Together, etc.
    bookingStatus: "", // Dropdown: Confirmed, No Show, etc.
    bookingSource: "", // Dropdown: AirBNB, Booking.com, etc.
    paymentMethods: [], // Multiple methods: Cash, UPI, Credit Card, etc.
    paymentAmounts: {}, // Object to store amounts for each payment method
    totalAmount: 0, // Editable by the user
    discountPercentage: 0,
    discountAmount: 0,
    commissionPercentage: 0,
    commissionAmount: 0,
    netPayable: 0, // Calculated based on totalAmount, discount, and commission
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
        setUnavailableDates(unavailableDatesResponse.data.unavailableDates.map(date => new Date(date)) || []);
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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if ((name === "checkInDate" || name === "checkOutDate") && isDateUnavailable(value)) {
  //     console.log(value);
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       dates: "Selected date is unavailable. Please choose another date.",
  //     }));
  //     return;
  //   }

  //   setErrors((prevErrors) => ({ ...prevErrors, dates: null }));
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
  const handleChange = (date, fieldName) => {
    // Convert date to string in ISO format for consistent handling
    const formattedDate = date ? date.toISOString() : null;
  
    // Validate date availability
    if (fieldName === "checkInDate" || fieldName === "checkOutDate") {
      if (formattedDate && isDateUnavailable(formattedDate)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dates: "Selected date is unavailable. Please choose another date.",
        }));
        return;
      }
      setErrors((prevErrors) => ({ ...prevErrors, dates: null }));
    }
  
    // Update the form data
    setFormData((prev) => ({
      ...prev,
      [fieldName]: formattedDate,
    }));
  };
  

  const handlePaymentAmountChange = (method, amount) => {
    setFormData((prev) => ({
      ...prev,
      paymentAmounts: {
        ...prev.paymentAmounts,
        [method]: parseFloat(amount) || 0, // Ensure the value is a number
      },
    }));
  };
  
  const handlePaymentMethodsChange = (method) => {
    setFormData((prev) => {
      const updatedMethods = prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method];
  
      // Remove the amount for the deselected method
      const updatedAmounts = { ...prev.paymentAmounts };
      if (!updatedMethods.includes(method)) {
        delete updatedAmounts[method];
      }
  
      return { ...prev, paymentMethods: updatedMethods, paymentAmounts: updatedAmounts };
    });
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
  
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

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
        email: formData.email || undefined, // Optional field
        phoneNumber: formData.phoneNumber || undefined, // Optional field
        idDocument: formData.idDocument || undefined, // Optional field
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        guestCount: formData.guestCount,
        selectedRooms: formData.selectedRooms.map((room) => ({
          id: room.id,
          name: room.name,
          price: room.price,
        })),
        bookingPurpose: formData.bookingPurpose,
        bookingStatus: formData.bookingStatus,
        bookingSource: formData.bookingSource,
        paymentMethods: formData.paymentMethods,
        paymentAmounts: formData.paymentAmounts,
        totalAmount: formData.totalAmount,
        discountPercentage: formData.discountPercentage,
        discountAmount: formData.discountAmount,
        commissionPercentage: formData.commissionPercentage,
        commissionAmount: formData.commissionAmount,
        netPayable: formData.netPayable,
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
                {/* <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  min={format(new Date(), "yyyy-MM-dd")}
                  required
                /> */}

<DatePicker
          id="checkInDate"
          selected={
            formData.checkInDate ? new Date(formData.checkInDate) : null
          }
          onChange={(date) => handleChange(date, "checkInDate")}
          dateFormat="dd/MM/yyyy"
          className="w-full px-3 py-2 border rounded-md"
          minDate={new Date()}
          excludeDates={unavailableDates}
          required
        />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
                {/* <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  min={formData.checkInDate || format(new Date(), "yyyy-MM-dd")}
                  required
                /> */}
                <DatePicker
  id="checkOutDate"
  selected={
    formData.checkOutDate ? new Date(formData.checkOutDate) : null
  }
  onChange={(date) => handleChange(date, "checkOutDate")}
  dateFormat="dd/MM/yyyy"
  className="w-full px-3 py-2 border rounded-md"
  minDate={
    formData.checkInDate
      ? addDays(new Date(formData.checkInDate), 1) // Set min date to one day after checkInDate
      : new Date() // Default to today if checkInDate is not set
  }
  excludeDates={unavailableDates}
  required
/>
              </div>
            </div>
            {errors.dates && <p className="text-red-500">{errors.dates}</p>}
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Nights</label>
              <input
        type="text"
        value={
          formData.checkInDate && formData.checkOutDate
            ? differenceInCalendarDays(
                new Date(formData.checkOutDate),
                new Date(formData.checkInDate)
              )
            : 0
        }
        className="w-full px-3 py-2 border rounded-md bg-gray-100"
        readOnly
      />
            </div>
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

    {/* Guest Details */}
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
      <div>
        <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
        <input
          type="number"
          name="guestCount"
          value={formData.guestCount}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              guestCount: Math.max(1, parseInt(e.target.value, 10)),
            }))
          }
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700">Booking Source</label>
      <select
        name="bookingSource"
        value={formData.bookingSource}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md"
        required
      >
        <option value="">Select Booking Source</option>
        <option value="AirBNB">AirBNB</option>
        <option value="Booking.com">Booking.com</option>
        <option value="MMT">MMT</option>
        <option value="Agoda">Agoda</option>
        <option value="Google">Google</option>
        <option value="Website">Website</option>
        <option value="Instagram">Instagram</option>
        <option value="Friends">Friends</option>
        <option value="Competitor Ref">Competitor Ref.</option>
        <option value="Repeat Guest">Repeat Guest</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Booking Purpose</label>
      <select
        name="bookingPurpose"
        value={formData.bookingPurpose}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md"
        required
      >
        <option value="">Select Booking Purpose</option>
        <option value="Uttarakhand Tour">Uttarakhand Tour</option>
        <option value="Party/Get Together">Party/Get Together</option>
        <option value="House Renovation">House Renovation</option>
        <option value="Weekend Holiday">Weekend Holiday</option>
        <option value="School Visit">School Visit</option>
        <option value="Special Day Celebration">Special Day Celebration</option>
        <option value="Wedding">Wedding</option>
        <option value="Hospital Visit">Hospital Visit</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Booking Status</label>
      <select
        name="bookingStatus"
        value={formData.bookingStatus}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md"
        required
      >
        <option value="">Select Booking Status</option>
        <option value="Confirmed">Confirmed</option>
        <option value="No Show">No Show</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Stayed">Stayed</option>
        <option value="Tentative">Tentative</option>
        <option value="Declined">Declined</option>
        <option value="No Response">No Response</option>
        <option value="Not Available">Not Available</option>
      </select>
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

    {/* Payment Methods */}
<div>
  <label className="block text-sm font-medium text-gray-700">Payment Methods</label>
  <div className="flex flex-wrap gap-4">
    {["Cash", "UPI", "Credit Card", "Bank Transfer", "Unpaid"].map((method) => (
      <label key={method} className="flex items-center space-x-2">
        <input
          type="checkbox"
          value={method.toLowerCase()}
          checked={formData.paymentMethods.includes(method.toLowerCase())}
          onChange={() => handlePaymentMethodsChange(method.toLowerCase())}
        />
        <span>{method}</span>
      </label>
    ))}
  </div>
</div>

    {/* Total Amount */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Total Amount</label>
      <input
        type="number"
        name="totalAmount"
        value={formData.totalAmount}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            totalAmount: parseFloat(e.target.value) || 0,
          }))
        }
        className="w-full px-3 py-2 border rounded-md"
        required
      />
    </div>

    
{/* Dynamic Fields for Payment Methods */}
{formData.paymentMethods.map((method) => (
  <div key={method}>
    <label className="block text-sm font-medium text-gray-700">
      {`${method.charAt(0).toUpperCase() + method.slice(1)} Amount`}
    </label>
    <input
      type="number"
      value={formData.paymentAmounts[method] || ""}
      onChange={(e) => handlePaymentAmountChange(method, e.target.value)}
      className="w-full px-3 py-2 border rounded-md"
      required
    />
  </div>
))}


    {/* Discount */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
        <input
          type="number"
          name="discountPercentage"
          value={formData.discountPercentage || ""}
          onChange={(e) =>
            setFormData((prev) => {
              const discountPercentage = parseFloat(e.target.value) || 0;
              const discountAmount = (formData.totalAmount * discountPercentage) / 100;
              return { ...prev, discountPercentage, discountAmount };
            })
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Discount Amount</label>
        <input
          type="number"
          name="discountAmount"
          value={formData.discountAmount || ""}
          onChange={(e) =>
            setFormData((prev) => {
              const discountAmount = parseFloat(e.target.value) || 0;
              const discountPercentage = ((discountAmount / formData.totalAmount) * 100).toFixed(2);
              return { ...prev, discountAmount, discountPercentage };
            })
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>

    {/* Commission */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Commission (%)</label>
        <input
          type="number"
          name="commissionPercentage"
          value={formData.commissionPercentage || ""}
          onChange={(e) =>
            setFormData((prev) => {
              const commissionPercentage = parseFloat(e.target.value) || 0;
              const commissionAmount = (formData.totalAmount * commissionPercentage) / 100;
              return { ...prev, commissionPercentage, commissionAmount };
            })
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Commission Amount</label>
        <input
          type="number"
          name="commissionAmount"
          value={formData.commissionAmount || ""}
          onChange={(e) =>
            setFormData((prev) => {
              const commissionAmount = parseFloat(e.target.value) || 0;
              const commissionPercentage = ((commissionAmount / formData.totalAmount) * 100).toFixed(2);
              return { ...prev, commissionAmount, commissionPercentage };
            })
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>

    {/* Net Payable */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Net Payable</label>
      <input
        type="number"
        name="netPayable"
        value={
          formData.totalAmount -
          (formData.discountAmount || 0) +
          (formData.commissionAmount || 0)
        }
        className="w-full px-3 py-2 border rounded-md bg-gray-100"
        readOnly
      />
    </div>

    {/* Taxes and Service Charges */}
    {globalSettings && (
      <div className="mt-4 text-sm text-gray-700">
        <p>Taxes: ₹{globalSettings.roomTaxesAndCharges.tax || 0}</p>
        <p>
          Service Charges: ₹
          {(formData.guestCount * globalSettings.roomTaxesAndCharges.serviceCharges) || 0}
        </p>
      </div>
    )}

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
