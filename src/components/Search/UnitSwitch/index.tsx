import { useDispatch } from "react-redux";
import { Space, Segmented } from "antd";

import { unitTransform } from "@/store";
import "./UnitSwitch.css";

const SPEED_OPTIONS = ["m/s", "km/h"];
const TEMP_OPTIONS = ["°C", "°F"];

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
            onChange={(value) =>
              dispatch(
                unitTransform({
                  unit: SPEED_OPTIONS[0],
                  value: value !== SPEED_OPTIONS[0],
                })
              )
            }
          />
        </span>
        <span>
          <span>Temperature:</span>
          <Segmented
            options={TEMP_OPTIONS}
            onChange={(value) =>
              dispatch(
                unitTransform({
                  unit: TEMP_OPTIONS[0],
                  value: value !== TEMP_OPTIONS[0],
                })
              )
            }
          />
        </span>
      </div>
    </section>
  );
}
