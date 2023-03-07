import axios from "axios";
import axiosRetry from "axios-retry";
import day from "dayjs";
import { M_URL, M_API_KEY, PARAM_FIELD_MAP } from "./config";

const client = axios.create({
  baseURL: M_URL,
  timeout: 5000,
  headers: { Authorization: `Basic ${M_API_KEY}` },
});

axiosRetry(client, { retries: 3 });

export const processData = (raw, isHourly) => {
  const data = raw.data;
  const timestamps = data[0].coordinates[0].dates.map((d) => {
    const date = day(d.date);
    return isHourly
      ? date.format("YYYY-MM-DD HH:mm")
      : date.format("YYYY-MM-DD");
  });
  const fields = data.map((d) => PARAM_FIELD_MAP[d.parameter]);
  const location = {
    lat: data[0].coordinates[0].lat,
    lng: data[0].coordinates[0].lon,
  };
  return {
    timestamps,
    location,
    fields,
    lastUpdated: Date.now(),
    data: timestamps.map((timestamp, i) => {
      const item = { timestamp };
      data.forEach((d) => {
        const field = PARAM_FIELD_MAP[d.parameter];
        const value = d.coordinates[0].dates[i].value;
        item[field] = value;
      });
      return item;
    }),
  };
};

export const getData = (query) => {
  const isHourly = query.includes(":PT1H");
  return client
    .get(`${query}/json`)
    .then(({ data }) => processData(data, isHourly));
};
