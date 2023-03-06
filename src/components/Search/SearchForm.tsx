import { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Segmented,
  DatePicker,
  Select,
} from "antd";
import day from "dayjs";
import LocationSearch from "./LocationSearch";
import CoordsDisplay from "./CoordsDisplay";
import { PARAMS_DAILY_ARRAY, PARAMS_HOURLY_ARRAY } from "@utils/config";
import noti from "@utils/noti";

const { RangePicker } = DatePicker;
const { Item } = Form;

const GROUP_OPTIONS = [
  { label: "Daily", value: "daily" },
  { label: "Hourly", value: "hourly" },
];

const paramToOption = ({ name, queryParam }) => ({
  label: name,
  value: queryParam,
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

  const isDaily = group !== "hourly";
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
    console.log(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Item label="Location">
        <Item noStyle name="location">
          <LocationSearch />
        </Item>
        <div className="d-f j-b a-c g-4">
          <CoordsDisplay lat={location?.lat} lng={location?.lng} />
          {GEO_SUPPORTED && (
            <Button type="link" className="p-1" onClick={getGeolocation}>
              use my location
            </Button>
          )}
        </div>
      </Item>
      <Item name="group" initialValue={GROUP_OPTIONS[0].value}>
        <Segmented options={GROUP_OPTIONS} />
      </Item>
      <Item
        name="time"
        label="Time range"
        initialValue={[day().subtract(7, "day"), day()]}
      >
        <RangePicker style={{ width: "100%" }} showTime={!isDaily} />
      </Item>
      <Item name="fields" label="Data fields" initialValue={defaultFields}>
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
