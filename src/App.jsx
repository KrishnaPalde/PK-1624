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
import ScrollToTop from './components/ScrollToTop';
import BookingFormContext from './contexts/BookingFormContext';

function App() {
  return (
    <AuthProvider>
      <BookingFormContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contactus" element={<ContactPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/bookings" element={<><ScrollToTop/> <BookingPage /></>} />
          <Route path="/room/:id" element={<><ScrollToTop/> <RoomDetailsPage /></>} />
          <Route path="/room/:id/details" element={<><ScrollToTop/><YourBookingDetails/></>}/>
          <Route path="/room/:id/bookingconfirm" element={<><ScrollToTop/><BookingConfirm/></>}/>
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
      </BookingFormContext>
    </AuthProvider>
  );
}

export default App;
