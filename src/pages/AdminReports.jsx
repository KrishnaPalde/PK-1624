import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "../components/SideNav";
import AdminNav from "../components/BookingDashboard/AdminNav";
import { FaBookmark, FaFileExport, FaHotel, FaRupeeSign } from "react-icons/fa";
import { saveAs } from "file-saver";
import StatCard from "../components/BookingDashboard/StatCard";
import Filters from "../components/Filters";
import ReportTable from "../components/ReportTable";

const process = import.meta.env;

const AdminReports = () => {
  const [stats, setStats] = useState({
    total: 0,
    revenue: 0,
    occupancy: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    preset: "",
  });
  const [reportInfo, setReportInfo] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load default stats and bookings
  useEffect(() => {
    const loadDefaultStats = async () => {
      try {
        const statsResponse = await axios.get(`${process.VITE_HOST_URL}/api/admin/reporting_stats`);
        const bookingsResponse = await axios.get(`${process.VITE_HOST_URL}/api/admin/bookings?limit=10`);
        setStats({
          total: statsResponse.data.totalBookings,
          revenue: statsResponse.data.revenueGenerated,
          occupancy: statsResponse.data.occupancyRate,
        });
        setBookings(bookingsResponse.data);

        // Default report info
        setReportInfo({
          period: filter.preset || "All Time",
          totalBookings: statsResponse.data.totalBookings,
          revenueGenerated: statsResponse.data.revenueGenerated,
          occupancyRate: statsResponse.data.occupancyRate,
        });
      } catch (err) {
        console.error("Failed to load default stats", err);
      }
    };
    loadDefaultStats();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
  
    setFilter((prev) => {
      if (name === "preset") {
        // Clear start and end dates when a preset is selected
        return { ...prev, preset: value, startDate: "", endDate: "" };
      }
      return { ...prev, [name]: value };
    });
  };
  

  const handleGenerateReport = async () => {
    try {
      setLoading(true);

      // Build query parameters
      const queryParams = {
        ...(filter.startDate && { startDate: filter.startDate }),
        ...(filter.endDate && { endDate: filter.endDate }),
        ...(filter.preset && { preset: filter.preset }),
      };

      const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/bookings`, {
        params: queryParams,
      });
      setBookings(response.data);

      // Update report info for filtered data
      setReportInfo({
        period: filter.preset || `${filter.startDate} to ${filter.endDate}`,
        totalBookings: stats.total,
        revenueGenerated: stats.revenue,
        occupancyRate: stats.occupancy,
      });

      setError(null);
    } catch (err) {
      console.error("Error generating report", err);
      setError("Failed to fetch report data.");
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (format, action) => {
    try {
      const response = await axios.post(
        `${process.VITE_HOST_URL}/api/admin/export_report`,
        { data: bookings, format, action, reportInfo },
        { responseType: action === "download" ? "blob" : "json" }
      );

      if (action === "download") {
        const fileExtension = format === "pdf" ? "pdf" : "xlsx";
        saveAs(response.data, `report.${fileExtension}`);
      } else {
        alert("Report emailed successfully!");
      }
    } catch (err) {
      console.error("Error exporting report", err);
    }
  };

  const headers = [
    "Booking ID",
    "Name",
    "Room Type",
    "Check-In",
    "Check-Out",
    "Total Payment",
    "Source",
    "Status",
  ];

  return (
    <div className="flex w-full h-screen bg-[#f5f7fa]">
      <div className="lg:block lg:w-64">
        <SideNav />
      </div>
      <div className="flex-1 overflow-auto">
        <AdminNav title="Reports" />
        <main className="p-6 space-y-6">
          {/* Stat Cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              title="Total Bookings"
              value={stats.total}
              bgColor="bg-blue-100"
              icon={FaBookmark}
              iconColor="text-blue-400"
            />
            <StatCard
              title="Revenue Generated"
              value={`₹${stats.revenue}`}
              bgColor="bg-green-100"
              icon={FaRupeeSign}
              iconColor="text-green-400"
            />
            <StatCard
              title="Occupancy Rate"
              value={`${stats.occupancy}%`}
              bgColor="bg-purple-100"
              icon={FaHotel}
              iconColor="text-purple-400"
            />
          </section>

          {/* Filters */}
          <Filters filter={filter} onFilterChange={handleFilterChange} onGenerateReport={handleGenerateReport} />

          {/* Export Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => exportReport("pdf", "download")}
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Export PDF
            </button>
            <button
              onClick={() => exportReport("excel", "download")}
              className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Export Excel
            </button>
            <button
              onClick={() => exportReport("pdf", "email")}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Email PDF
            </button>
            <button
              onClick={() => exportReport("excel", "email")}
              className="px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600"
            >
              Email Excel
            </button>
          </div>

          {/* Report Table */}
          <ReportTable bookings={bookings} headers={headers} />
        </main>
      </div>
    </div>
  );
};

export default AdminReports;
