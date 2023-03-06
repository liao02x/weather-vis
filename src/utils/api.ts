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

const data = {
  version: "3.0",
  user: "scenebox_liao",
  dateGenerated: "2023-03-06T12:07:18Z",
  status: "OK",
  data: [
    {
      parameter: "wind_speed_10m:ms",
      coordinates: [
        {
          lat: 49.239769,
          lon: -123.0087,
          dates: [
            { date: "2023-03-06T12:06:55Z", value: 1.7 },
            { date: "2023-03-07T12:06:55Z", value: 2.7 },
            { date: "2023-03-08T12:06:55Z", value: 1.5 },
            { date: "2023-03-09T12:06:55Z", value: 1.8 },
            { date: "2023-03-10T12:06:55Z", value: 4.3 },
            { date: "2023-03-11T12:06:55Z", value: 0.9 },
            { date: "2023-03-12T12:06:55Z", value: 3.4 },
          ],
        },
      ],
    },
    {
      parameter: "wind_dir_10m:d",
      coordinates: [
        {
          lat: 49.239769,
          lon: -123.0087,
          dates: [
            { date: "2023-03-06T12:06:55Z", value: 54.6 },
            { date: "2023-03-07T12:06:55Z", value: 47.3 },
            { date: "2023-03-08T12:06:55Z", value: 55.7 },
            { date: "2023-03-09T12:06:55Z", value: 43.2 },
            { date: "2023-03-10T12:06:55Z", value: 53.0 },
            { date: "2023-03-11T12:06:55Z", value: 143.8 },
            { date: "2023-03-12T12:06:55Z", value: 51.4 },
          ],
        },
      ],
    },
    {
      parameter: "wind_gusts_10m_24h:ms",
      coordinates: [
        {
          lat: 49.239769,
          lon: -123.0087,
          dates: [
            { date: "2023-03-06T12:06:55Z", value: 4.8 },
            { date: "2023-03-07T12:06:55Z", value: 8.7 },
            { date: "2023-03-08T12:06:55Z", value: 5.5 },
            { date: "2023-03-09T12:06:55Z", value: 4.4 },
            { date: "2023-03-10T12:06:55Z", value: 13.3 },
            { date: "2023-03-11T12:06:55Z", value: 14.0 },
            { date: "2023-03-12T12:06:55Z", value: 8.3 },
          ],
        },
      ],
    },
  ],
};

export const processData = (raw, isHourly) => {
  const data = raw.data;
  const timestamps = data[0].coordinates[0].dates.map((d) => {
    const date = day(d.date);
    return isHourly ? date.format("YYYY-MM-DD HH:mm") : date.format("YYYY-MM-DD");
  });
  const fields = data.map((d) => PARAM_FIELD_MAP[d.parameter]);
  return {
    timestamps,
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

export const getData = () => {
  return Promise.resolve(data).then(data => processData(data, false));
};

export const getData1 = (query) => {
  const isHourly = query.includes(":PT1H");
  return client.get(`${query}/json`).then(({ data }) => processData(data, isHourly));
};
