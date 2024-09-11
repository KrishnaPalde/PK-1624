import React,{useState,useEffect} from 'react';
import { Star, ThumbsUp, ThumbsDown, Trash2, User,ChevronLeft, ChevronRight } from 'lucide-react';
import SideNav from '../components/SideNav';
import AdminNav from '../components/BookingDashboard/AdminNav';
const process = import.meta.env;

const calculateAverageRating = (review) => {
  const ratingFields = ['overallExperience', 'roomCleanliness', 'comfort', 'amenities', 'easeOfBooking', 'websiteUsability'];
  const sum = ratingFields.reduce((acc, field) => acc + review[field], 0);
  return sum / ratingFields.length;
};

const StarRating = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
    ))}
  </div>
);


const MostRecentReviews = ({ reviews }) => {
  return (
    <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-3 text-xl font-bold">Most Recent Reviews</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review._id} className="flex items-start p-3 space-x-3 rounded-lg bg-gray-50">
            <div className="flex-shrink-0">
              <User className="w-10 h-10 p-2 text-gray-400 bg-gray-200 rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{review.name}</p>
              <StarRating rating={review.overallExperience} />
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{review.comments}</p>
              <p className="mt-1 text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-gray-600 bg-gray-100 rounded-md disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="mx-4">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-gray-600 bg-gray-100 rounded-md disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const AllReviewsList = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">All Reviews</h2>
      <div className="overflow-auto max-h-96">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Rating</th>
              <th className="px-4 py-2 text-left">Comment</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.map((review) => (
              <tr key={review._id} className="border-b">
                <td className="px-4 py-2">{review.name}</td>
                <td className="px-4 py-2">
                  <StarRating rating={review.overallExperience} />
                </td>
                <td className="px-4 py-2">{review.comments}</td>
                <td className="px-4 py-2">{new Date(review.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const BadReviews = ({ onReviewUpdate, updateRoomRating }) => {
  const [badReviews, setBadReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const reviewsPerPage = 2;

  useEffect(() => {
    fetchBadReviews();
  }, []);

  const fetchBadReviews = async () => {
    try {
      const response = await fetch(`${process.VITE_HOST_URL}/api/admin/feedbacks/below-3-stars`);
      if (response.ok) {
        const data = await response.json();
        setBadReviews(data);
      } else {
        throw new Error('Failed to fetch bad reviews');
      }
    } catch (error) {
      console.error('Error fetching bad reviews:', error);
      setError('Failed to load reviews. Please try again.');
    }
  };

  const handleApprove = async (reviewId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.VITE_HOST_URL}/api/feedbacks/${reviewId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to approve review');
      }
      const data = await response.json();
      console.log('Feedback approved successfully:', data);
      updateRoomRating(data.room);
      onReviewUpdate();
      fetchBadReviews();
    } catch (error) {
      console.error('Error approving review:', error);
      setError('Failed to approve review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.VITE_HOST_URL}/api/feedbacks/${reviewId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      const data = await response.json();
      console.log('Feedback deleted successfully:', data);
      updateRoomRating(data.room);
      onReviewUpdate();
      fetchBadReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('Failed to delete review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = badReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(badReviews.length / reviewsPerPage);
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Approve or Delete Bad Reviews</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <div className="space-y-4">
        {currentReviews.map((review) => (
          <div key={review._id} className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{review.name}</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleApprove(review._id)} 
                  className="text-green-500 hover:text-green-600 disabled:opacity-50"
                  disabled={isLoading}
                >
                  <ThumbsUp className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(review._id)} 
                  className="text-red-500 hover:text-red-600 disabled:opacity-50"
                  disabled={isLoading}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <StarRating rating={review.overallExperience} />
            <p className="mt-1 text-gray-600">{review.comments}</p>
            <span className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};



const AdminReviewsPage = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [rooms, setRooms] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.VITE_HOST_URL}/api/public-feedbacks`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setAllReviews(data);

      // Sort reviews by date and get the 5 most recent
      const sortedReviews = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentReviews(sortedReviews.slice(0, 5));
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateRoomRating = (roomData) => {
    setRooms(prevRooms => ({
      ...prevRooms,
      [roomData.id]: { ...prevRooms[roomData.id], rating: roomData.rating }
    }));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="flex w-full h-screen bg-[#f5f7fa]">
      <div className="lg:block lg:w-64">
        <SideNav />
      </div>
      <div className="flex-1 overflow-auto">
        <AdminNav title="Customer Reviews"/>
        <div className="p-6">
          {isLoading && <p className="text-center">Loading reviews...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!isLoading && !error && (
            <>
              <MostRecentReviews reviews={recentReviews} />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <AllReviewsList reviews={allReviews} />
                <BadReviews onReviewUpdate={fetchReviews} updateRoomRating={updateRoomRating} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviewsPage;