import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock bookings data (normalized to { date, startTime, endTime })
const initialBookings = [
  {
    id: 1,
    spaceId: 1,
    spaceName: 'Downtown Office Suite',
    userId: 1,
    userName: 'John Client',
    userEmail: 'client@demo.com',
    date: '2024-12-01',
    startTime: '09:00',
    endTime: '17:00',
    totalPrice: 750,
    status: 'confirmed',
    createdAt: '2024-11-20T10:30:00Z',
    notes: 'Need parking pass for 3 vehicles',
  },
  {
    id: 2,
    spaceId: 2,
    spaceName: 'Creative Studio Loft',
    userId: 1,
    userName: 'John Client',
    userEmail: 'client@demo.com',
      date: '2024-12-10',
    startTime: '10:00',
    endTime: '14:00',
    totalPrice: 300,
    status: 'pending',
    createdAt: '2024-11-22T14:20:00Z',
    notes: 'Will bring own lighting equipment',
  },
  {
    id: 3,
    spaceId: 3,
    spaceName: 'Conference Center',
    userId: 1,
    userName: 'John Client',
    userEmail: 'client@demo.com',
    date: '2024-11-15',
    startTime: '09:00',
    endTime: '17:00',
    totalPrice: 500,
    status: 'completed',
    createdAt: '2024-11-10T09:00:00Z',
    notes: 'Quarterly team meeting - catering confirmed',
  },
];

const initialState = {
  bookings: initialBookings,
  selectedBooking: null,
  loading: false,
  error: null,
};

// Async thunk to create a booking
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { getState, rejectWithValue }) => {
    // Basic validation
    if (!bookingData.spaceId || !bookingData.userId || !bookingData.date) {
      return rejectWithValue('Missing booking data');
    }
    const { bookings } = getState().bookings;
    const id = Math.max(...bookings.map(b => b.id), 0) + 1;
    const payload = {
      id,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    return payload;
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    // Update booking status (Admin)
    updateBookingStatus: (state, action) => {
      const { id, status } = action.payload;
      const booking = state.bookings.find(b => b.id === id);
      if (booking) {
        booking.status = status;
      }
    },
    
    // Update booking details
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = { ...state.bookings[index], ...action.payload };
      }
    },
    
    // Cancel booking
    cancelBooking: (state, action) => {
      const booking = state.bookings.find(b => b.id === action.payload);
      if (booking) {
        booking.status = 'cancelled';
      }
    },
    
    // Delete booking (Admin)
    deleteBooking: (state, action) => {


