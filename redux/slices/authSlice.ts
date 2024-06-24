import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  pin: string | null;
  useBiometrics: boolean;
  user: { name: string, email: string, secondName?: string } | null;
}

const initialState: AuthState = {
  token: null,
  pin: null,
  useBiometrics: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setPin(state, action: PayloadAction<string>) {
      state.pin = action.payload;
    },
    setUseBiometrics(state, action: PayloadAction<boolean>) {
      state.useBiometrics = action.payload;
    },
    setUser(state, action: PayloadAction<{ name: string, email: string, secondName?: string }>) {
      state.user = action.payload;
    },
    logout(state) {
      state.token = null;
      state.pin = null;
      state.useBiometrics = false;
      state.user = null;
    },
  },
});

export const { setToken, setPin, setUseBiometrics, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
