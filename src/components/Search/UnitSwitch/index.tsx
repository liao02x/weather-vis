import { useDispatch } from "react-redux";
import { Space, Segmented, Form } from "antd";

import { switchTempTransform, switchSpeedTransform } from "@store";
import "./UnitSwitch.css";

const SPEED_OPTIONS = ["m/s", "km/h"];
const TEMP_OPTIONS = ["°C", "°F"];

const { Item } = Form;

export default function UnitSwitch() {
  const dispatch = useDispatch();
  return (
    <section className="unit_switch">
      <div className="unit_switch__title">
        <span>Unit transform</span>
      </div>
      <div className="unit_switch__body">
        <span>
          <span>Speed:</span>
          <Segmented
            options={SPEED_OPTIONS}
            onChange={(value) => dispatch(switchSpeedTransform(value !== SPEED_OPTIONS[0]))}
          />
        </span>
        <span>
          <span>Temperature:</span>
          <Segmented
            options={TEMP_OPTIONS}
            onChange={(value) => dispatch(switchTempTransform(value !== TEMP_OPTIONS[0]))}
          />
        </span>
      </div>
    </section>
  );
}
