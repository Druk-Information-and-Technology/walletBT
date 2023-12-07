import { createSlice } from "@reduxjs/toolkit";

const walletBTSlice = createSlice({
  name: "walletBT",
  initialState: {
    currentAccountAddress: null,
    currentAccountKey: null,
    accounts: null,
  },

  reducers: {
    setCurrentAccountAddress: (state, action) => {
      state.currentAccountAddress = action.payload;
    },

    setCurrentAccountKey: (state, action) => {
      state.currentAccountKey = action.payload;
    },

    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
  },
});

export const { setCurrentAccountAddress, setCurrentAccountKey, setAccounts } =
  walletBTSlice.actions;
export default walletBTSlice.reducer;
