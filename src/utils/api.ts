import axios from "axios";
import axiosRetry from "axios-retry";
import day from "dayjs";
import { M_URL, M_LOGIN_URL, M_API_KEY, PARAM_FIELD_MAP } from "./config";

const CORS_PROXY = "https://lucky-horse-36.deno.dev/"

const client = axios.create({
  baseURL: CORS_PROXY+M_URL,
  timeout: 5000,
  headers: {
    Authorization: `Basic ${M_API_KEY}`,
  },
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

const getToken = () => {
  return axios.get(CORS_PROXY+M_LOGIN_URL, {
    headers: {
      Authorization: `Basic ${M_API_KEY}`,
    },
  })
  .then(({data}) => data.access_token)
}

export const getData = async (query) => {
  const isHourly = query.includes(":PT1H");
  const token = await getToken();
  return client
    .get(`${query}/json?access_token=${token}`)
    .then(({ data }) => processData(data, isHourly));
};
