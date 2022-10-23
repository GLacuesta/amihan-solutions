import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    creds: {},
    error: '',
  },
  reducers: {
    authenticate: (state, action) => {
      return {
        creds: action.payload,
        error: '',
      };
    },
    onError: (state, action) => {
      return {
        creds: {},
        error: action.payload
      };
    }
  }
});

export const { authenticate, onError } = authSlice.actions;

export default authSlice.reducer;