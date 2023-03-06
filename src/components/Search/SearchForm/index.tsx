import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Grid, Segmented, DatePicker, Select } from "antd";
import day from "dayjs";
import LocationSearch from "../LocationSearch";
import CoordsDisplay from "../CoordsDisplay";
import { PARAMS_DAILY_ARRAY, PARAMS_HOURLY_ARRAY } from "@/utils/config";
import noti from "@/utils/noti";
import { setQuery } from "@/store";

import "./SearchForm.css";

const { RangePicker } = DatePicker;
const { Item } = Form;
const { useBreakpoint } = Grid;

const GROUP_OPTIONS = [
  { label: "Daily", value: "daily" },
  { label: "Hourly", value: "hourly" },
];

const paramToOption = ({ name, value }) => ({
  label: name,
  value,
});

const FIELD_OPTIONS_DAILY = PARAMS_DAILY_ARRAY.map(paramToOption);
const FIELD_OPTIONS_HOURLY = PARAMS_HOURLY_ARRAY.map(paramToOption);

const GEO_SUPPORTED = !!navigator.geolocation;
const handleGeolocationError = (error) => {
  let message;
  switch (error.code) {
    case error.PERMISSION_DENIED:
      message = "Please allow request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      message = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      message = "Location request timed out.";
      break;
    case error.UNKNOWN_ERROR:
      message = "An error occurred for Geolocation.";
      break;
  }
  noti.error(message);
};

export default function SearchForm() {
  const [form] = Form.useForm();
  const group = Form.useWatch("group", form);
  const location = Form.useWatch("location", form);
  const { sm, lg } = useBreakpoint();
  const dispatch = useDispatch();

  const isDaily = group !== "hourly";
  const dateFormat = isDaily
    ? "YYYY-MM-DD"
    : (sm && !lg)
    ? "YY-MM-DD HH:mm"
    : "YYYY-MM-DD HH:mm:ss";
  const fieldOptions = isDaily ? FIELD_OPTIONS_DAILY : FIELD_OPTIONS_HOURLY;
  const defaultFields = fieldOptions.slice(0, 3).map(({ value }) => value);

  useEffect(() => {
    form.setFieldValue("fields", defaultFields);
  }, [isDaily]);

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      form.setFieldValue("location", {
        lat: coords.latitude,
        lng: coords.longitude,
        address: `${coords.latitude}, ${coords.longitude}`,
      });
    }, handleGeolocationError);
  };

  const handleSubmit = (values) => {
    const { location, fields, group, time } = values;
    // console.log(values);
    dispatch(
      setQuery({
        location,
        fields,
        group,
        time: [time[0].toISOString(), time[1].toISOString()],
      })
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Item>
        <Item
          noStyle
          name="location"
          rules={[{ required: true, message: "Please choose a location" }]}
        >
          <LocationSearch />
        </Item>
        <div className="location_bar">
          <CoordsDisplay lat={location?.lat} lng={location?.lng} />
          {GEO_SUPPORTED && (
            <Button type="link" className="p-1" onClick={getGeolocation}>
              use my location
            </Button>
          )}
        </div>
      </Item>
      <Item
        name="group"
        label="Time step"
        initialValue={GROUP_OPTIONS[0].value}
        required={false}
        rules={[{ required: true, message: "Please choose a time step" }]}
      >
        <Segmented options={GROUP_OPTIONS} />
      </Item>
      <Item
        name="time"
        label="Time range"
        required={false}
        initialValue={[day(), day().add(7, "day")]}
        rules={[{ required: true, message: "Please choose a time range" }]}
      >
        <RangePicker
          style={{ width: "100%" }}
          showTime={!isDaily}
          format={dateFormat}
        />
      </Item>
      <Item
        name="fields"
        label="Data fields"
        required={false}
        initialValue={defaultFields}
        rules={[
          {
            required: true,
            message: "Please choose a data field",
          },
        ]}
      >
        <Select mode="multiple" options={fieldOptions} />
      </Item>
      <Item>
        <Button block type="primary" htmlType="submit">
          Search
        </Button>
      </Item>
    </Form>
  );
}
