
import { FiMapPin, FiUsers, FiWifi } from 'react-icons/fi';
import placeholderImage from '../assets/images/placeholder.svg';

const SpaceCard = ({ space, onBookClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gray-300 flex items-center justify-center overflow-hidden">
        <img 
          src={space.image || placeholderImage} 
          alt={space.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{space.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <FiMapPin className="mr-1" />
          <span className="text-sm">{space.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <FiUsers className="mr-1" />
            <span className="text-sm">{space.capacity} people</span>
          </div>
          <div className="flex items-center text-green-600">
            <FiWifi className="mr-1" />
            <span className="text-sm">WiFi</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">KSH {space.price.toLocaleString()}</span>
            <span className="text-gray-600">/{space.priceUnit || 'hour'}</span>
          </div>
          <button
            onClick={() => onBookClick(space)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;