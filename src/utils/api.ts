import axios from "axios";
import axiosRetry from "axios-retry";
import { M_URL, M_API_KEY } from "./config";

const client = axios.create({
  baseURL: M_URL,
  timeout: 5000,
  headers: { Authorization: `Basic ${M_API_KEY}` },
});

axiosRetry(client, { retries: 3 });

const data = {
  version: "3.0",
  user: "scenebox_liao",
  dateGenerated: "2023-03-05T13:09:30Z",
  status: "OK",
  data: [
    {
      parameter: "wind_speed_10m:ms",
      coordinates: [
        {
          lat: 52.520551,
          lon: 13.461804,
          dates: [
            { date: "2023-03-05T00:00:00Z", value: 3.7 },
            { date: "2023-03-06T00:00:00Z", value: 1.6 },
            { date: "2023-03-07T00:00:00Z", value: 3.9 },
            { date: "2023-03-08T00:00:00Z", value: 3.3 },
          ],
        },
      ],
    },
    {
      parameter: "wind_dir_10m:d",
      coordinates: [
        {
          lat: 52.520551,
          lon: 13.461804,
          dates: [
            { date: "2023-03-05T00:00:00Z", value: 268.4 },
            { date: "2023-03-06T00:00:00Z", value: 206.5 },
            { date: "2023-03-07T00:00:00Z", value: 188.9 },
            { date: "2023-03-08T00:00:00Z", value: 257.1 },
          ],
        },
      ],
    },
    {
      parameter: "wind_gusts_10m_1h:ms",
      coordinates: [
        {
          lat: 52.520551,
          lon: 13.461804,
          dates: [
            { date: "2023-03-05T00:00:00Z", value: 8.5 },
            { date: "2023-03-06T00:00:00Z", value: 4.3 },
            { date: "2023-03-07T00:00:00Z", value: 9.8 },
            { date: "2023-03-08T00:00:00Z", value: 8.1 },
          ],
        },
      ],
    },
    {
      parameter: "wind_gusts_10m_24h:ms",
      coordinates: [
        {
          lat: 52.520551,
          lon: 13.461804,
          dates: [
            { date: "2023-03-05T00:00:00Z", value: 15.0 },
            { date: "2023-03-06T00:00:00Z", value: 13.4 },
            { date: "2023-03-07T00:00:00Z", value: 12.5 },
            { date: "2023-03-08T00:00:00Z", value: 17.5 },
          ],
        },
      ],
    },
    {
      parameter: "t_2m:C",
      coordinates: [
        {
          lat: 52.520551,
          lon: 13.461804,
          dates: [
            { date: "2023-03-05T00:00:00Z", value: 1.4 },
            { date: "2023-03-06T00:00:00Z", value: 0.2 },
            { date: "2023-03-07T00:00:00Z", value: -2.3 },
            { date: "2023-03-08T00:00:00Z", value: -0.1 },
          ],
        },
      ],
    },
    {
      parameter: "t_max_2m_24h:C",
      coordinates: [
        {
          lat: 52.520551,
          lon: 13.461804,
          dates: [
            { date: "2023-03-05T00:00:00Z", value: 6.6 },
            { date: "2023-03-06T00:00:00Z", value: 4.1 },
            { date: "2023-03-07T00:00:00Z", value: 4.9 },
            { date: "2023-03-08T00:00:00Z", value: 6.8 },
          ],
        },
      ],
    },
    {
      parameter: "t_min_2m_24h:C",
      coordinates: [
        {
          lat: 52.520551,
          lon: 13.461804,
          dates: [
            { date: "2023-03-05T00:00:00Z", value: -0.2 },
            { date: "2023-03-06T00:00:00Z", value: -1.2 },
            { date: "2023-03-07T00:00:00Z", value: -3.2 },
            { date: "2023-03-08T00:00:00Z", value: -3.3 },
          ],
        },
      ],
    },
    {
      parameter: "msl_pressure:hPa",
      coordinates: [
        {
          lat: 52.520551,
          lon: 13.461804,
          dates: [
            { date: "2023-03-05T00:00:00Z", value: 1015 },
            { date: "2023-03-06T00:00:00Z", value: 1006 },
            { date: "2023-03-07T00:00:00Z", value: 1002 },
            { date: "2023-03-08T00:00:00Z", value: 998 },
          ],
        },
      ],
    },
    {
      parameter: "precip_1h:mm",
      coordinates: [
        {
          lat: 52.520551,
          lon: 13.461804,
          dates: [
            { date: "2023-03-05T00:00:00Z", value: 0.0 },
            { date: "2023-03-06T00:00:00Z", value: 0.21 },
            { date: "2023-03-07T00:00:00Z", value: 0.0 },
            { date: "2023-03-08T00:00:00Z", value: 0.15 },
          ],
        },
      ],
    },
    {
      parameter: "precip_24h:mm",
      coordinates: [
        {
          lat: 52.520551,
          lon: 13.461804,
          dates: [
            { date: "2023-03-05T00:00:00Z", value: 0.07 },
            { date: "2023-03-06T00:00:00Z", value: 1.18 },
            { date: "2023-03-07T00:00:00Z", value: 1.43 },
            { date: "2023-03-08T00:00:00Z", value: 2.12 },
          ],
        },
      ],
    },
  ],
};

export const processData = (raw) => {
  const data = raw.data;
  const dates = data[0].coordinates[0].dates.map((d) => d.date);
  const params = data.map((d) => d.parameter);
  return {
    dates,
    params,
    data: data.map((d) => {
      const param = d.parameter;
      const values = d.coordinates[0].dates.map((d) => d.value);
      return {
        param,
        values,
      };
    }),
  };
};

export const getData = () => {
  return Promise.resolve(data).then(processData);
};

export const getData1 = (query) => {
  return client.get(`${query}/json`).then(({ data }) => processData(data));
};
