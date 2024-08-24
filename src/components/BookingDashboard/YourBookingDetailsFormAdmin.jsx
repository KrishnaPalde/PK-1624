import React, { useState,useEffect } from 'react';

const YourBookingDetailsFormAdmin = ({userDetails}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  useEffect(() => {
    if (userDetails) {
      setFormData({
        firstName: userDetails.firstName || '',
        lastName: userDetails.lastName || '',
        email: userDetails.email || '',
        phoneNumber: userDetails.phoneNumber || '',
        address: userDetails.address || 'New Avenue Street Corner near St Aloyius High School South Block Delhi 224151',
      });
    }
  }, [userDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log('Saved data:', formData);
    
  };

  const handleEdit = () => {
    
  };

  return (
    <article className="flex overflow-hidden flex-col p-6 bg-white rounded-3xl max-w-[500px] max-md:px-5">
      <div className="flex flex-col max-w-[480px]">
        <div className="flex flex-col w-full">
          <div className="flex items-start w-full gap-8">
            <div className="flex flex-col flex-1 shrink basis-0">
              <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium leading-none text-slate-700">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="flex overflow-hidden gap-2 items-center px-4 py-3 mt-1.5 w-full text-base text-gray-900 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 shrink basis-0">
              <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium leading-none text-slate-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="flex overflow-hidden gap-2 items-center px-4 py-3 mt-1.5 w-full text-base text-gray-900 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mt-6">
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium leading-none text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="flex overflow-hidden gap-2 items-center px-4 py-3 mt-1.5 w-full text-base text-gray-900 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
              />
            </div>
          </div>
          <div className="flex flex-col w-full mt-6">
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium leading-none text-slate-700">
                Phone number
              </label>
              <div className="flex overflow-hidden mt-1.5 w-full text-base bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="flex-1 shrink gap-2 self-start py-3 pr-4 text-gray-900 basis-3 min-w-[240px]  px-4 border border-gray-300 border-solid"
                />
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col mt-6 w-full text-sm font-medium min-h-[154px]">
            <div className="flex flex-col flex-1 w-full">
              <label className="leading-none text-slate-700">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="overflow-hidden flex-1 shrink gap-2 self-stretch px-3.5 py-2.5 mt-1.5 leading-5 text-gray-900 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
              />
            </div>
          </div> */}
        </div>
        {/* <div className="flex items-start self-start gap-10 mt-4 text-xl text-center">
          <button
            onClick={handleEdit}
            className="flex-1 shrink gap-2.5 self-stretch px-2 py-1 text-sky-400 rounded border-2 border-sky-400 border-solid min-h-[48px] w-[120px]"
          >
            Edit
          </button>
          <button
            onClick={handleSave}
            className="flex-1 shrink gap-2.5 self-stretch px-2 py-1 text-white whitespace-nowrap bg-sky-400 rounded min-h-[48px] w-[120px]"
          >
            Save
          </button>
        </div> */}
      </div>
    </article>
  );
};

export default YourBookingDetailsFormAdmin;