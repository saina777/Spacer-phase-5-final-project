import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserBookings } from '../redux/bookingsSlice';
import SpaceCard from '../components/SpaceCard';
import BookingModal from '../components/BookingModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiSearch, FiFilter, FiCalendar, FiMapPin, FiDollarSign, FiClock } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [activeTab, setActiveTab] = useState('browse');

  const dispatch = useDispatch();
  const { spaces } = useSelector(state => state.spaces);
  const { user } = useSelector(state => state.auth);
  const userBookings = useSelector(state => selectUserBookings(state, user?.id));

  const categories = ['all', 'coworking', 'meeting-room', 'event-space', 'private-office', 'studio', 'office', 'conference', 'creative-studio', 'wellness', 'classroom', 'recording', 'photography', 'virtual', 'retail'];
  const locations = ['all', 'cbd', 'westlands', 'kilimani', 'karen', 'upper-hill', 'parklands', 'runda'];
  const priceRanges = ['all', '0-5000', '5001-10000', '10001-20000', '20001-50000', '50001+'];

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           space.type === selectedCategory ||
                           space.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    
    const matchesLocation = selectedLocation === 'all' || 
                           space.location.toLowerCase().includes(selectedLocation);
    
    const matchesPrice = priceRange === 'all' || 
      (priceRange === '0-5000' && space.price <= 5000) ||
      (priceRange === '5001-10000' && space.price > 5000 && space.price <= 10000) ||
      (priceRange === '10001-20000' && space.price > 10000 && space.price <= 20000) ||
      (priceRange === '20001-50000' && space.price > 20000 && space.price <= 50000) ||
      (priceRange === '50001+' && space.price > 50000);

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const handleBookSpace = (space) => {
    setSelectedSpace(space);
    setShowBookingModal(true);
  };

  const currentBookings = userBookings.filter(booking => 
    new Date(booking.date) >= new Date().setHours(0,0,0,0)
  );

  const pastBookings = userBookings.filter(booking => 
    new Date(booking.date) < new Date().setHours(0,0,0,0)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar dashboardType="client" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Find and book your perfect workspace</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('browse')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'browse'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Browse Spaces
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Bookings ({userBookings.length})
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'browse' && (
          <>
            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search spaces..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>
                      {cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>

                {/* Location Filter */}
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Locations</option>
                  {locations.slice(1).map(loc => (
                    <option key={loc} value={loc}>
                      {loc.charAt(0).toUpperCase() + loc.slice(1)}
                    </option>
                  ))}
                </select>

                {/* Price Filter */}
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="0-5000">KSH 0 - 5,000</option>
                  <option value="5001-10000">KSH 5,001 - 10,000</option>
                  <option value="10001-20000">KSH 10,001 - 20,000</option>
                  <option value="20001-50000">KSH 20,001 - 50,000</option>
                  <option value="50001+">KSH 50,001+</option>
                </select>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedLocation('all');
                    setPriceRange('all');
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="mb-4">
              <p className="text-gray-600">{filteredSpaces.length} spaces found</p>
            </div>

            {/* Spaces Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSpaces.map((space) => (
                <SpaceCard key={space.id} space={space} onBookClick={handleBookSpace} />
              ))}
            </div>

            {filteredSpaces.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No spaces found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedLocation('all');
                    setPriceRange('all');
                  }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-8">
            {/* Current Bookings */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Bookings</h2>
              {currentBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentBookings.map((booking) => {
                    const space = spaces.find(s => s.id === booking.spaceId);
                    return (
                      <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-2">{space?.name}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <FiCalendar className="mr-2" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <FiClock className="mr-2" />
                            <span>{booking.startTime} - {booking.endTime}</span>
                          </div>
                          <div className="flex items-center">
                            <FiMapPin className="mr-2" />
                            <span>{space?.location}</span>
                          </div>
                          <div className="flex items-center">
                            <FiDollarSign className="mr-2" />
                              <span>KSH {booking.totalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No current bookings</p>
              )}
            </div>

            {/* Past Bookings */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Bookings</h2>
              {pastBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastBookings.map((booking) => {
                    const space = spaces.find(s => s.id === booking.spaceId);
                    return (
                      <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md opacity-75">
                        <h3 className="font-semibold text-lg mb-2">{space?.name}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <FiCalendar className="mr-2" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <FiClock className="mr-2" />
                            <span>{booking.startTime} - {booking.endTime}</span>
                          </div>
                          <div className="flex items-center">
                            <FiDollarSign className="mr-2" />
                              <span>KSH {booking.totalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Completed
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No past bookings</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
        space={selectedSpace} 
      />
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <Footer />
    </div>
  );
};

export default ClientDashboard;
