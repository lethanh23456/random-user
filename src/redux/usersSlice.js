import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mapUserData, loadUsersFromStorage, saveUsersToStorage } from '../utils/utils';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://randomuser.me/api/?results=8');
    const data = await response.json();
    return data.results.map(mapUserData);
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: loadUsersFromStorage(), 
    status: 'idle', 
  },
  reducers: {
    addUser: (state, action) => {
      state.list.unshift(action.payload);
      saveUsersToStorage(state.list);
    },
    updateUser: (state, action) => {
      const { id, data } = action.payload;
      const index = state.list.findIndex(user => user.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...data };
        saveUsersToStorage(state.list);
      }
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter(user => user.id !== action.payload);
      saveUsersToStorage(state.list);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.list.length === 0) {
            state.list = action.payload;
            saveUsersToStorage(state.list);
        }
      });
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;