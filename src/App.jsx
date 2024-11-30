import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import RoomDetailsPage from './pages/RoomDetailsPage';
import YourBookingDetails from './pages/YourBookingDetails';
import BookingConfirm from './pages/BookingConfirm';
import ScrollToTop from './components/ScrollToTop';
import BookingFormContext from './contexts/BookingFormContext';
import AdminBooking from './pages/AdminBooking';
import YourBookingDetailsAdmin from './components/BookingDashboard/YourBookingDetailsAdmin';
import AdminRoom from './pages/AdminRoom';
import AdminBlog from './pages/AdminBlog';
import AdminCreatePost from './pages/AdminCreatePost';
import Feedback from './pages/Feedback';
import FAQ from './pages/FAQ';
import AdminOffersPage from './pages/AdminOffersPage';
import AdminReviewsPage from './pages/AdminReviewsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import HouseRules from './pages/HouseRules';
import NearbyAttractions from './pages/NearbyAttractions';
import AdminCalendarPage from './pages/AdminCalendarPage';

function App() {
  return (
    <AuthProvider>
      <BookingFormContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><ScrollToTop/><LandingPage /></>} />
          <Route path="/contactus" element={<><ScrollToTop/><ContactPage /></>} />
          <Route path="/privacy-policy" element={<><ScrollToTop/><PrivacyPolicy /></>} />
          <Route path="/terms-conditions" element={<><ScrollToTop/><TermsAndConditions /></>} />
          <Route path='/nearby-attractions' element={<NearbyAttractions />}/>
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/bookings" element={<><ScrollToTop/> <BookingPage /></>} />
          <Route path="/room/:id" element={<><ScrollToTop/> <RoomDetailsPage /></>} />
          <Route path="/room/:id/details" element={<><ScrollToTop/><YourBookingDetails/></>}/>
          <Route path="/room/bookingconfirm" element={<><ScrollToTop/><BookingConfirm/></>}/>
          <Route path="/feedback" element={<><ScrollToTop/><Feedback/></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faq" element={<><ScrollToTop/><FAQ /></>} />
          <Route path="/house-rules" element={<><ScrollToTop/><HouseRules /></>} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path='/admin/booking' element={<ProtectedRoute><AdminBooking/></ProtectedRoute>}/>
          <Route path="/admin/booking/details/:bookingId" element={<ProtectedRoute><YourBookingDetailsAdmin/></ProtectedRoute>}/>
          <Route path="/admin/blogs" element={<ProtectedRoute><AdminBlog/></ProtectedRoute>}/>
          <Route path="/admin/createblog" element={<ProtectedRoute><AdminCreatePost/></ProtectedRoute>}/>
          <Route path="/admin/room" element={<ProtectedRoute><AdminRoom/></ProtectedRoute>}/>
          <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviewsPage/></ProtectedRoute>}/>
          <Route path='/admin/offers' element={<ProtectedRoute><AdminOffersPage/></ProtectedRoute>}/>
          <Route path='/admin/calendar' element={<ProtectedRoute><AdminCalendarPage/></ProtectedRoute>}/>
          <Route path="/feedback" element={<Feedback/>}/>
          <Route path="/card" element={<BookingConfirm/>}/>
        </Routes>
      </BrowserRouter>
      </BookingFormContext>
    </AuthProvider>
  );
}

export default App;
