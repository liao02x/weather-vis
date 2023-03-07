import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Line, Bar, Pie } from "@ant-design/plots";
import { QUERY_PARAM_DICT, UNIT_SWITCH_MAP } from "@/utils/config";

const CardWrapper = ({ title, extra, children }) => {
  return (
    <>
      <div style={{ zIndex: 1 }}>
        <div
          style={{
            padding: 8,
            width: "100%",
            position: "absolute",
            userSelect: "none",
            cursor: "move",
          }}
        >
          <span>{title}</span>
          <div style={{ float: "right" }} onMouseDown={e => e.stopPropagation()}>
            {extra}
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "30px 5px 5px 5px",
        }}
      >
        {children}
      </div>
    </>
  );
};

const GRAPH_TYPE_MAP = {
  line: Line,
  bar: Bar,
  pie: Pie,
};

export default function Card({ field, data }) {
  const [type, setType] = useState("line");
  const { unitTransform } = useSelector((state: any) => state);
  const config = QUERY_PARAM_DICT[field];

  useEffect(() => {
    if (config?.chart) {
      setType(config.chart);
    }
  }, [config?.chart]);

  if (!config) return null;

  let dataSource, unit;
  if (
    config.unit &&
    unitTransform[config.unit] &&
    UNIT_SWITCH_MAP[config.unit]
  ) {
    unit = UNIT_SWITCH_MAP[config.unit].unit;
    dataSource = data.map((item) => {
      return {
        ...item,
        [field]: UNIT_SWITCH_MAP[config.unit].transform(item[field]),
      };
    });
  } else {
    unit = config.unit;
    dataSource = data;
  }

  const Graph = GRAPH_TYPE_MAP[type];

  const items = Object.keys(GRAPH_TYPE_MAP).map((key) => ({
    key,
    label: (
      <a onClick={(e) => {e.preventDefault();setType(key)}}>
        {key}
      </a>
    )
  }))

  return (
    <CardWrapper
      title={config.name}
      extra={
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {type}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      }
    >
      <Graph
        data={dataSource}
        animation={false}
        xField="timestamp"
        yField={field}
        yAxis={{
          label: {
            formatter: (text) => {
              return text + unit;
            },
            autoEllipsis: true,
          },
        }}
        // tooltip={{
        //   formatter: (datum) => {
        //     return {
        //       name: datum.label,
        //       value:
        //         formatFloat(datum.value) +
        //         (config.type === "duration" ? "s" : ""),
        //     };
        //   },
        // }}
      />
    </CardWrapper>
  );
}
