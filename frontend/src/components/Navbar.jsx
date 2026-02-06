
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { FiMenu, FiX, FiUser, FiHome, FiGrid } from 'react-icons/fi';

const Navbar = ({ onLoginClick, dashboardType = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  // Define navigation items based on dashboard type
  const getNavItems = () => {
    if (dashboardType === 'client') {
      return [
        { label: 'Browse Spaces', action: () => {}, internal: true },
        { label: 'My Bookings', action: () => {}, internal: true },
      ];
    } else if (dashboardType === 'admin') {
      return [
        { label: 'Overview', action: () => {}, internal: true },
        { label: 'Spaces', action: () => {}, internal: true },
        { label: 'Bookings', action: () => {}, internal: true },
        { label: 'Users', action: () => {}, internal: true },
      ];
    } else {
      // Homepage navbar
      return [
        { label: 'Home', href: '#home' },
        { label: 'Spaces', href: '#spaces' },
        { label: 'About', href: '#about' },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={handleLogoClick}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2"
            >
              <FiGrid className="text-3xl" />
              <span>Spacer</span>
            </button>
            {dashboardType && (
              <span className="ml-4 text-sm text-gray-500 hidden sm:inline">
                {dashboardType === 'client' ? 'Client Dashboard' : 'Admin Dashboard'}
              </span>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {!dashboardType && navItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 flex items-center">
                  <FiUser className="mr-2" />
                  {user?.name}
                </span>
                {dashboardType && (
                  <button
                    onClick={handleLogoClick}
                    className="text-gray-700 hover:text-blue-600 flex items-center"
                  >
                    <FiHome className="mr-1" />
                    Home
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!dashboardType && navItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-gray-700 border-b">
                  Hi, {user?.name}
                </div>
                {dashboardType && (
                  <button
                    onClick={() => {
                      handleLogoClick();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-blue-600 flex items-center"
                  >
                    <FiHome className="mr-2" />
                    Back to Home
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="block w-full text-left px-3 py-2 text-blue-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;