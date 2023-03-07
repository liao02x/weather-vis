import { configureStore, createSlice } from "@reduxjs/toolkit";
import day from "dayjs";
import { QUERY_PARAM_DICT } from "@/utils/config";

const initialState: any = {
  text: null,
  query: null,
  // data: null,
  // group: null,
  unitTransform: {},
};

const buildText = (searchForm) => {
  const { location, time, fields, group } = searchForm;
  const params = fields.map((field) => QUERY_PARAM_DICT[field].name);
  const { address } = location;
  const timeFormat = group === "hourly" ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD";
  return `${group} data from ${day(time[0]).format(timeFormat)} to ${day(
    time[1]
  ).format(timeFormat)} for ${params.join(", ")} at ${address}`;
};

const buildQuery = (searchForm) => {
  const { location, time, fields, group } = searchForm;
  const params = fields.map((field) => QUERY_PARAM_DICT[field].field);
  const { lat, lng } = location;
  const timeStep = group === "hourly" ? "PT1H" : "P1D";
  return `${time[0]}--${time[1]}:${timeStep}/${params.join(",")}/${lat},${lng}`;
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.text = buildText(action.payload);
      state.query = buildQuery(action.payload);
      // state.group = action.payload.group;
    },
    _setQuery: (state, action) => {
      state.text = action.payload.text;
      state.query = action.payload.query;
    },
    resetQuery: (state) => {
      state.text = null;
      state.query = null;
      // state.group = null;
    },
    unitTransform: (state, action) => {
      state.unitTransform[action.payload.unit] = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuery, resetQuery, _setQuery, unitTransform } = stateSlice.actions;

export const reducer = stateSlice.reducer;

export const store = configureStore({
  reducer,
});
