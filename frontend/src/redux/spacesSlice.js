// Spaces Slice - Manages workspace/space listings
import { createSlice } from '@reduxjs/toolkit';

// Mock spaces data
const initialSpaces = [
  {
    id: 1,
    name: 'Downtown Office Suite',
    description: 'Professional office suite in the heart of downtown with modern amenities and stunning city views. Perfect for small teams and startups.',
    type: 'office',
    category: 'Office Space',
    price: 15000,
    priceUnit: 'day',
    capacity: 10,
    location: '123 Main St, Nairobi - CBD',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    amenities: ['WiFi', 'Parking', 'Meeting Room', 'Kitchen', 'Air Conditioning'],
    rating: 4.8,
    reviews: 24,
    available: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Creative Studio Loft',
    description: 'Spacious and bright loft space perfect for creative professionals, photo shoots, and artistic endeavors. Natural light throughout.',
    type: 'studio',
    category: 'Creative Studio',
    price: 7500,
    priceUnit: 'hour',
    capacity: 15,
    location: '456 Art Ave, Nairobi - Kilimani',
    image: 'https://images.unsplash.com/photo-1505373877841-8d43a716668d?w=800&q=80',
    amenities: ['WiFi', 'Equipment Rental', 'Props', 'Lighting', 'Green Screen'],
    rating: 4.9,
    reviews: 18,
    available: true,
    featured: true,
  },
  {
    id: 3,
    name: 'Conference Center',
    description: 'State-of-the-art conference facility with AV equipment, breakout rooms, and professional catering options.',
    type: 'conference',
    category: 'Conference Room',
    price: 50000,
    priceUnit: 'day',
    capacity: 100,
    location: '789 Business Blvd, Nairobi - Westlands',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
    amenities: ['WiFi', 'AV Equipment', 'Catering', 'Parking', 'Security'],
    rating: 4.7,
    reviews: 42,
    available: true,
    featured: false,
  },
  {
    id: 4,
    name: 'Co-Working Desk',
    description: 'Flexible co-working space with dedicated desk, high-speed internet, and access to all community amenities.',
    type: 'coworking',
    category: 'Co-Working Space',
    price: 29900,
    priceUnit: 'month',
    capacity: 1,
    location: '321 Startup Lane, Nairobi - Runda',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    amenities: ['WiFi', 'Desk', 'Locker', 'Coffee', 'Meeting Room Access'],
    rating: 4.6,
    reviews: 67,
    available: true,
    featured: true,
  },
  {
    id: 5,
    name: 'Wellness Studio',
    description: 'Peaceful yoga and wellness studio with mirrored walls, hardwood floors, and serene atmosphere.',
    type: 'studio',
    category: 'Wellness Center',
    price: 5000,
    priceUnit: 'hour',
    capacity: 20,
    location: '555 Peaceful Way, Nairobi - Karen',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    amenities: ['WiFi', 'Yoga Mats', 'Sound System', 'Lockers', 'Showers'],
    rating: 4.9,
    reviews: 31,
    available: true,
    featured: false,
  },
  {
    id: 6,
    name: 'Event Venue Hall',
    description: 'Elegant event venue perfect for weddings, parties, and corporate events. Fully customizable space.',
    type: 'event',
    category: 'Event Space',
    price: 200000,
    priceUnit: 'event',
    capacity: 200,
    location: '888 Celebration Blvd, Nairobi - CBD',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    amenities: ['WiFi', 'Catering Kitchen', 'Stage', 'Parking', 'Decoration Services'],
    rating: 4.8,
    reviews: 89,
    available: true,
    featured: true,
  },
  {
    id: 7,
    name: 'Private Meeting Room',
    description: 'Intimate meeting space for small teams. Perfect for interviews, quick meetings, and brainstorming sessions.',
    type: 'meeting',
    category: 'Meeting Room',
    price: 4500,
    priceUnit: 'hour',
    capacity: 6,
    location: '111 Corporate Plaza, Nairobi - Upper Hill',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    amenities: ['WiFi', 'Whiteboard', 'Video Conferencing', 'Coffee', 'Projector'],
    rating: 4.5,
    reviews: 156,
    available: true,
    featured: false,
  },
  {
    id: 8,
    name: 'Podcast Studio',
    description: 'Professional podcast recording studio with soundproofing, quality microphones, and mixing equipment.',
    type: 'studio',
    category: 'Recording Studio',
    price: 10000,
    priceUnit: 'hour',
    capacity: 4,
    location: '222 Audio Lane, Nairobi - Westlands',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
    amenities: ['WiFi', 'Microphones', 'Mixing Console', 'Soundproofing', 'Headphones'],
    rating: 4.9,
    reviews: 23,
    available: true,
    featured: false,
  },
  {
    id: 9,
    name: 'Training Classroom',
    description: 'Spacious classroom designed for training sessions with individual workstations and presentation equipment.',
    type: 'classroom',
    category: 'Training Space',
    price: 20000,
    priceUnit: 'day',
    capacity: 25,
    location: '333 Education Way, Nairobi - Kilimani',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    amenities: ['WiFi', 'Projector', 'Whiteboard', 'Individual Desks', 'Coffee Machine'],
    rating: 4.6,
    reviews: 34,
    available: true,
    featured: false,
  },
  {
    id: 10,
    name: 'Photography Studio',
    description: 'Professional photography studio with cyclorama wall, various backdrops, and professional lighting setup.',
    type: 'studio',
    category: 'Photography Studio',
    price: 12000,
    priceUnit: 'hour',
    capacity: 8,
    location: '444 Photo Drive, Nairobi - Parklands',
    image: 'https://images.unsplash.com/photo-1590642916589-592bca102bf9?w=800&q=80',
    amenities: ['WiFi', 'Lighting Kit', 'Backdrops', 'Cyclorama', 'Makeup Station'],
    rating: 4.8,
    reviews: 19,
    available: true,
    featured: false,
  },
  {
    id: 11,
    name: 'Virtual Office Package',
    description: 'Professional business address with mail handling and meeting room access.',
    type: 'virtual',
    category: 'Virtual Office',
    price: 9900,
    priceUnit: 'month',
    capacity: 1,
    location: '555 Business Center, Nairobi - CBD',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    amenities: ['Business Address', 'Mail Handling', 'Meeting Room Access', 'Call Answering'],
    rating: 4.4,
    reviews: 45,
    available: true,
    featured: false,
  },
  {
    id: 12,
    name: 'Pop-up Retail Space',
    description: 'Prime retail location perfect for pop-up shops, product launches, and seasonal sales.',
    type: 'retail',
    category: 'Retail Space',
    price: 25000,
    priceUnit: 'day',
    capacity: 10,
    location: '666 Shopping Plaza, Nairobi - CBD',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    amenities: ['WiFi', 'Display Units', 'POS System', 'Security', 'Parking'],
    rating: 4.7,
    reviews: 28,
    available: true,
    featured: true,
  },
];

const initialState = {
  spaces: initialSpaces,
  selectedSpace: null,
  filters: {
    type: '',
    category: '',
    priceMin: '',
    priceMax: '',
    location: '',
    capacity: '',
    searchQuery: '',
  },
  sortBy: 'featured',
  loading: false,
  error: null,
};

const spacesSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    // Add new space (Admin)
    addSpace: (state, action) => {
      const newSpace = {
        id: Math.max(...state.spaces.map(s => s.id)) + 1,
        ...action.payload,
        reviews: 0,
        rating: 0,
        available: true,
      };
      state.spaces.push(newSpace);
    },
    
    // Update existing space (Admin)
    updateSpace: (state, action) => {
      const index = state.spaces.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.spaces[index] = { ...state.spaces[index], ...action.payload };
      }
    },
    
    // Delete space (Admin)
    deleteSpace: (state, action) => {
      state.spaces = state.spaces.filter(s => s.id !== action.payload);
    },
    
    // Select a space for viewing
    selectSpace: (state, action) => {
      state.selectedSpace = state.spaces.find(s => s.id === action.payload) || null;
    },
    
    // Clear selected space
    clearSelectedSpace: (state) => {
      state.selectedSpace = null;
    },
    
    // Set filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    // Clear all filters
    clearFilters: (state) => {
      state.filters = {
        type: '',
        category: '',
        priceMin: '',
        priceMax: '',
        location: '',
        capacity: '',
        searchQuery: '',
      };
    },
    
    // Set sort option
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    
    // Toggle space availability
    toggleAvailability: (state, action) => {
      const space = state.spaces.find(s => s.id === action.payload);
      if (space) {
        space.available = !space.available;
      }
    },
  },
});

// Export actions
export const {
  addSpace,
  updateSpace,
  deleteSpace,
  selectSpace,
  clearSelectedSpace,
  setFilters,
  clearFilters,
  setSortBy,
  toggleAvailability,
} = spacesSlice.actions;

// Selectors
export const selectAllSpaces = (state) => state.spaces.spaces;
export const selectFeaturedSpaces = (state) => state.spaces.spaces.filter(s => s.featured);
export const selectSelectedSpace = (state) => state.spaces.selectedSpace;
export const selectFilters = (state) => state.spaces.filters;

// Filtered and sorted spaces selector
export const selectFilteredSpaces = (state) => {
  const { spaces, filters, sortBy } = state.spaces;
  
  let filtered = [...spaces];
  
  // Apply filters
  if (filters.type) {
    filtered = filtered.filter(s => s.type === filters.type);
  }
  if (filters.category) {
    filtered = filtered.filter(s => s.category === filters.category);
  }
  if (filters.priceMin) {
    filtered = filtered.filter(s => s.price >= Number(filters.priceMin));
  }
  if (filters.priceMax) {
    filtered = filtered.filter(s => s.price <= Number(filters.priceMax));
  }
  if (filters.location) {
    filtered = filtered.filter(s => 
      s.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  if (filters.capacity) {
    filtered = filtered.filter(s => s.capacity >= Number(filters.capacity));
  }
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query)
    );
  }
  
  // Apply sorting
  switch (sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'reviews':
      filtered.sort((a, b) => b.reviews - a.reviews);
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }
  
  return filtered;
};

// Get unique categories
export const selectCategories = (state) => {
  return [...new Set(state.spaces.spaces.map(s => s.category))];
};

export default spacesSlice.reducer;


