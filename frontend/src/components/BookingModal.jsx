import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../redux/bookingsSlice';
import { FiX, FiCalendar, FiClock } from 'react-icons/fi';
import { toast } from 'react-toastify';

const BookingModal = ({ isOpen, onClose, space }) => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    purpose: ''
  });
  
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.bookings);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to make a booking');
      return;
    }

    const bookingData = {
      spaceId: space.id,
      userId: user.id,
      spaceName: space.name,
      userName: user.name,
      userEmail: user.email,
      ...formData,
      totalPrice: calculatePrice()
    };

    try {
      const result = await dispatch(createBooking(bookingData)).unwrap();
      toast.success('Booking created successfully!');
      onClose();
      setFormData({ date: '', startTime: '', endTime: '', purpose: '' });
    } catch (error) {
      toast.error(error || 'Failed to create booking');
    }
  };

  const calculatePrice = () => {
    if (!formData.startTime || !formData.endTime) return 0;
    const start = new Date(`2000-01-01 ${formData.startTime}`);
    const end = new Date(`2000-01-01 ${formData.endTime}`);
    const hours = (end - start) / (1000 * 60 * 60);
    return hours * space?.price || 0;
  };

  if (!isOpen || !space) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Book {space.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <div className="relative">
                <FiClock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <div className="relative">
                <FiClock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Purpose</label>
            <textarea
              value={formData.purpose}
              onChange={(e) => setFormData({...formData, purpose: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Meeting, workshop, etc."
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between">
              <span>Total Price:</span>
              <span className="font-semibold">KSH {calculatePrice().toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;