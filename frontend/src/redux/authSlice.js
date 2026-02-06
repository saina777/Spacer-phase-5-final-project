// Auth Slice - Manages authentication state (login, logout, user roles)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock users for simulation
const mockUsers = [
  { id: 1, email: 'client@demo.com', password: 'client123', name: 'John Client', role: 'client', avatar: null },
  { id: 2, email: 'admin@demo.com', password: 'admin123', name: 'Admin User', role: 'admin', avatar: null },
];

const initialState = {
  user: JSON.parse(localStorage.getItem('spacer_user')) || null,
  isAuthenticated: !!localStorage.getItem('spacer_user'),
  role: localStorage.getItem('spacer_role') || null,
  loading: false,
  error: null,
  users: mockUsers, // Store all mock users
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { getState, rejectWithValue }) => {
    const { users } = getState().auth;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return rejectWithValue('Invalid email or password');
    }
    // Return safe user (no password)
    const safeUser = { ...user, password: undefined };
    return safeUser;
  }
);

// Async thunk for register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password, role = 'client' }, { getState, rejectWithValue }) => {
    const { users } = getState().auth;
    if (users.find(u => u.email === email)) {
      return rejectWithValue('Email already registered');
    }
    const id = Math.max(...users.map(u => u.id), 0) + 1;
    const newUser = { id, name, email, password, role, avatar: null };
    return newUser;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout action
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
      state.error = null;
      localStorage.removeItem('spacer_user');
      localStorage.removeItem('spacer_role');
    },
    
    // Update user profile
    updateProfile: (state, action) => {
      const { name, avatar } = action.payload;
      if (state.user) {
        state.user = { ...state.user, name, avatar };
        localStorage.setItem('spacer_user', JSON.stringify(state.user));
      }
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.role = action.payload.role;
        state.error = null;
        // Persist
        localStorage.setItem('spacer_user', JSON.stringify(state.user));
        localStorage.setItem('spacer_role', state.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Add new user to users list (store password internally)
        state.users.push(action.payload);
        state.user = { ...action.payload, password: undefined };
        state.isAuthenticated = true;
        state.role = action.payload.role;
        state.error = null;
        // Persist
        localStorage.setItem('spacer_user', JSON.stringify(state.user));
        localStorage.setItem('spacer_role', state.role);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

// Export actions
export const { logout, updateProfile, clearError } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectRole = (state) => state.auth.role;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;

