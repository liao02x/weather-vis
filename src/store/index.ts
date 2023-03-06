import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  text: null,
  query: null,
  // data: null,
  tempTransform: false,
  speedTransform: false,
};

const buildText = (searchForm) => {};

const buildQuery = (searchForm) => {};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.text = buildText(action.payload);
      state.query = buildQuery(action.payload);
    },
    resetQuery: (state) => {
      state.text = null;
      state.query = null;
    },
    switchTempTransform: (state, action) => {
      state.tempTransform = action.payload;
    },
    switchSpeedTransform: (state, action) => {
      state.speedTransform = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setQuery,
  resetQuery,
  switchTempTransform,
  switchSpeedTransform,
} = stateSlice.actions;

export const reducer = stateSlice.reducer;

export const store = configureStore({
  reducer,
});
