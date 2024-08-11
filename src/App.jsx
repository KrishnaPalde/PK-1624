// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './ProtectedRoute';
import RoomDetailsPage from './pages/RoomDetailsPage';
import YourBookingDetails from './pages/YourBookingDetails';
import BookingConfirm from './pages/BookingConfirm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contactus" element={<ContactPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/room/:id" element={<RoomDetailsPage />} />
          <Route path="/yourdetails" element={<YourBookingDetails/>}/>
          <Route path="/bookingconfirm" element={<BookingConfirm/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin-panel"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
