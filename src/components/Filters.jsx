import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const Filters = ({ filter, onFilterChange, onGenerateReport }) => (
  <section className="p-6 bg-white rounded-xl shadow-lg">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Start Date */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          Start Date
        </label>
        <div className="relative">
          <input
            type="date"
            name="startDate"
            value={filter.startDate}
            onChange={onFilterChange}
            className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <FaCalendarAlt className="absolute top-2/4 right-3 transform -translate-y-2/4 text-gray-400" /> */}
        </div>
      </div>

      {/* End Date */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          End Date
        </label>
        <div className="relative">
          <input
            type="date"
            name="endDate"
            value={filter.endDate}
            onChange={onFilterChange}
            className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <FaCalendarAlt className="absolute top-2/4 right-3 transform -translate-y-2/4 text-gray-400" /> */}
        </div>
      </div>

      {/* Preset Dropdown */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          Preset
        </label>
        <select
          name="preset"
          value={filter.preset}
          onChange={onFilterChange}
          className="w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Preset</option>
          <option value="1_month">Last 1 Month</option>
          <option value="3_months">Last 3 Months</option>
          <option value="6_months">Last 6 Months</option>
        </select>
      </div>

      {/* Generate Report Button */}
      <div className="flex items-end">
        <button
          onClick={onGenerateReport}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          <FaCalendarAlt className="text-white" />
          Generate Report
        </button>
      </div>
    </div>
  </section>
);

export default Filters;
