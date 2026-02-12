import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAPI } from '../services/api';

const initialState = { users: [], selectedUser: null, loading: false, error: null };

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchAPI('/users', { method: 'GET' });
    return data.users || data;
  } catch (err) { return rejectWithValue(err.message); }
});

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await fetchAPI('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return data; // assuming backend returns the created user object
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create user');
    }
  }
);

export const updateUserAPI = createAsyncThunk('users/updateUser', async ({ id, ...updates }, { rejectWithValue }) => {
  try {
    const data = await fetchAPI(`/users/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
    return data;
  } catch (err) { return rejectWithValue(err.message); }
});

export const updateUserRoleAPI = createAsyncThunk('users/updateUserRole', async ({ id, role }, { rejectWithValue }) => {
  try {
    const data = await fetchAPI(`/users/${id}/role`, { method: 'PUT', body: JSON.stringify({ role }) });
    return data;
  } catch (err) { return rejectWithValue(err.message); }
});

export const deleteUserAPI = createAsyncThunk('users/deleteUser', async (id, { rejectWithValue }) => {
  try {
    await fetchAPI(`/users/${id}`, { method: 'DELETE' });
    return id;
  } catch (err) { return rejectWithValue(err.message); }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action) => { state.selectedUser = state.users.find(u => u.id === action.payload) || null; },
    clearSelectedUser: (state) => { state.selectedUser = null; },
    updateUserStats: (state, action) => {
      const { userId, bookingsAdded, amount } = action.payload;
      const user = state.users.find(u => u.id === userId);
      if (user) {
        user.totalBookings = (user.totalBookings || 0) + bookingsAdded;
        user.totalSpent = (user.totalSpent || 0) + amount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchUsers.fulfilled, (s, a) => { s.loading = false; s.users = a.payload; })
      .addCase(fetchUsers.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserAPI.pending, (s) => { s.loading = true; })
      .addCase(updateUserAPI.fulfilled, (s, a) => {
        s.loading = false;
        const i = s.users.findIndex(u => u.id === a.payload.id);
        if (i !== -1) s.users[i] = a.payload;
      })
      .addCase(updateUserAPI.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(updateUserRoleAPI.pending, (s) => { s.loading = true; })
      .addCase(updateUserRoleAPI.fulfilled, (s, a) => {
        s.loading = false;
        const i = s.users.findIndex(u => u.id === a.payload.id);
        if (i !== -1) s.users[i] = a.payload;
      })
      .addCase(updateUserRoleAPI.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(deleteUserAPI.pending, (s) => { s.loading = true; })
      .addCase(deleteUserAPI.fulfilled, (s, a) => { s.loading = false; s.users = s.users.filter(u => u.id !== a.payload); })
      .addCase(deleteUserAPI.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  },
});

export const { selectUser, clearSelectedUser, updateUserStats } = usersSlice.actions;

// Clean action names for components (aliases for the API thunks)
export const addUser = createUser;
export const updateUser = updateUserAPI;
export const deleteUser = deleteUserAPI;
export const updateUserRole = updateUserRoleAPI;

export const selectAllUsers = (state) => state.users.users;
export const selectSelectedUser = (state) => state.users.selectedUser;
export const selectUserById = (id) => (state) => state.users.users.find(u => u.id === id);
export const selectUsersByRole = (role) => (state) => state.users.users.filter(u => u.role === role);
export const selectClientCount = (state) => state.users.users.filter(u => u.role === 'client').length;
export const selectAdminCount = (state) => state.users.users.filter(u => u.role === 'admin').length;
export const selectTotalRevenue = (state) => state.users.users.reduce((sum, u) => sum + (u.totalSpent || 0), 0);

export default usersSlice.reducer;