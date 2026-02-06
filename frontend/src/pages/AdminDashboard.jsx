import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSpace, updateSpace, deleteSpace } from '../redux/spacesSlice';
import { updateBookingStatus, deleteBooking } from '../redux/bookingsSlice';
import { addUser, updateUser, deleteUser, updateUserRole } from '../redux/usersSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiPlus, FiEdit, FiTrash, FiUsers, FiMapPin, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSpaceModal, setShowSpaceModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingSpace, setEditingSpace] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const dispatch = useDispatch();
  const { spaces } = useSelector(state => state.spaces);
  const { bookings } = useSelector(state => state.bookings);
  const { users } = useSelector(state => state.users);

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const totalSpaces = spaces.length;
  const totalBookings = bookings.length;
  const totalUsers = users.filter(u => u.role === 'client').length;

  const recentBookings = bookings.slice(-5).reverse();
  const popularSpaces = spaces
    .map(space => ({
      ...space,
      bookingCount: bookings.filter(b => b.spaceId === space.id).length
    }))
    .sort((a, b) => b.bookingCount - a.bookingCount)
    .slice(0, 5);

  const SpaceModal = () => {
    const [formData, setFormData] = useState(editingSpace || {
      name: '', location: '', category: 'coworking', capacity: '', price: '', description: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingSpace) {
        dispatch(updateSpace({ id: editingSpace.id, ...formData }));
        toast.success('Space updated successfully');
      } else {
        dispatch(addSpace(formData));
        toast.success('Space added successfully');
      }
      setShowSpaceModal(false);
      setEditingSpace(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h2 className="text-xl font-semibold mb-4">
            {editingSpace ? 'Edit Space' : 'Add New Space'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Space Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="coworking">Coworking</option>
              <option value="meeting-room">Meeting Room</option>
              <option value="event-space">Event Space</option>
              <option value="private-office">Private Office</option>
              <option value="studio">Studio</option>
            </select>
            <input
              type="number"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Price (KSH)"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowSpaceModal(false);
                  setEditingSpace(null);
                }}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingSpace ? 'Update' : 'Add'} Space
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const UserModal = () => {
    const [formData, setFormData] = useState(editingUser || {
      name: '', email: '', password: '', role: 'client', phone: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingUser) {
        dispatch(updateUser({ id: editingUser.id, ...formData }));
        toast.success('User updated successfully');
      } else {
        dispatch(addUser(formData));
        toast.success('User added successfully');
      }
      setShowUserModal(false);
      setEditingUser(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h2 className="text-xl font-semibold mb-4">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            {!editingUser && (
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            )}
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowUserModal(false);
                  setEditingUser(null);
                }}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingUser ? 'Update' : 'Add'} User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar dashboardType="admin" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your spaces, bookings, and users</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'spaces', 'bookings', 'users'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <FiMapPin className="text-blue-600 text-2xl mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Total Spaces</p>
                    <p className="text-2xl font-bold">{totalSpaces}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <FiCalendar className="text-green-600 text-2xl mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold">{totalBookings}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <FiUsers className="text-purple-600 text-2xl mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold">{totalUsers}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <FiDollarSign className="text-yellow-600 text-2xl mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold">KSH {totalRevenue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {recentBookings.map((booking) => {
                    const space = spaces.find(s => s.id === booking.spaceId);
                    const user = users.find(u => u.id === booking.userId);
                    return (
                      <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{space?.name}</p>
                          <p className="text-sm text-gray-600">{user?.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">KSH {booking.totalPrice.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{new Date(booking.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Popular Spaces</h3>
                <div className="space-y-3">
                  {popularSpaces.map((space) => (
                    <div key={space.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{space.name}</p>
                        <p className="text-sm text-gray-600">{space.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{space.bookingCount} bookings</p>
                        <p className="text-sm text-gray-600">KSH {space.price.toLocaleString()}/{space.priceUnit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Spaces Tab */}
        {activeTab === 'spaces' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Spaces</h2>
              <button
                onClick={() => setShowSpaceModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FiPlus className="mr-2" /> Add Space
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {spaces.map((space) => (
                    <tr key={space.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{space.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{space.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 capitalize">
                        {space.category.replace('-', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">KSH {space.price.toLocaleString()}/{space.priceUnit}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setEditingSpace(space);
                            setShowSpaceModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => {
                            dispatch(deleteSpace(space.id));
                            toast.success('Space deleted successfully');
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Manage Bookings</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Space</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking) => {
                    const space = spaces.find(s => s.id === booking.spaceId);
                    const user = users.find(u => u.id === booking.userId);
                    return (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{space?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {new Date(booking.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {booking.startTime} - {booking.endTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">KSH {booking.totalPrice.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={booking.status}
                            onChange={(e) => {
                              dispatch(updateBookingStatus({ id: booking.id, status: e.target.value }));
                              toast.success('Booking status updated');
                            }}
                            className="px-2 py-1 border rounded text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              dispatch(deleteBooking(booking.id));
                              toast.success('Booking deleted successfully');
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Users</h2>
              <button
                onClick={() => setShowUserModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FiPlus className="mr-2" /> Add User
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => {
                            dispatch(updateUserRole({ id: user.id, role: e.target.value }));
                            toast.success('User role updated');
                          }}
                          className="px-2 py-1 border rounded text-sm capitalize"
                        >
                          <option value="client">Client</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.totalBookings || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">KSH {user.totalSpent || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setShowUserModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => {
                            dispatch(deleteUser(user.id));
                            toast.success('User deleted successfully');
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showSpaceModal && <SpaceModal />}
      {showUserModal && <UserModal />}
      
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

export default AdminDashboard;
