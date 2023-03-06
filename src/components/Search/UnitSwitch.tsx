import { useDispatch } from "react-redux";
import { Space, Segmented } from "antd";

import { switchTempTransform, switchSpeedTransform } from "@store";

const SPEED_OPTIONS = ["m/s", "km/h"];
const TEMP_OPTIONS = ["°C", "°F"];

export default function UnitSwitch() {
  const dispatch = useDispatch();
  return (
    <Space>
      <Segmented
        options={SPEED_OPTIONS}
        onChange={(value) => dispatch(switchSpeedTransform(value !== SPEED_OPTIONS[0]))}
      />
      <Segmented
        options={TEMP_OPTIONS}
        onChange={(value) => dispatch(switchTempTransform(value !== TEMP_OPTIONS[0]))}
      />
    </Space>
  );
}
