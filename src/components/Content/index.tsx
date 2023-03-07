import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col, Spin, FloatButton } from "antd";
import { useRequest } from "ahooks";
import { ShareAltOutlined } from "@ant-design/icons";
import { getData } from "@/utils/api";
import noti from "@/utils/noti";
import Dashboard from "./Dashboard";

import "./Content.css";

const load = (query, timestamp) => {
  const now = Date.now();
  return getData(query).then((data) => {
    return {
      ...data,
      queryChanged: now - timestamp < 1000,
    };
  });
};

export default function Content() {
  const { text, query } = useSelector((state: any) => state);

  const { data, loading, run, cancel } = useRequest(load, {
    pollingInterval: 60 * 1000,
    manual: true,
    onError: (e) => {
      noti.error(e.message);
    },
  });

  useEffect(() => {
    if (query) {
      run(query, Date.now());
    }
  }, [query]);

  const handleShare = async () => {
    const url =
      window.location.origin + `?s=${btoa(JSON.stringify({ text, query }))}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "W-vis",
          text: "Check out this weather data",
          url,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(url);
      noti.success("Link copied to clipboard");
    }
  };

  if (!data) return <PlaceHolder loading={loading} />;

  return (
    <Spin spinning={loading}>
      <div className="p-2">
        <span>{text}</span>
      </div>
      <Dashboard data={data} />
      <FloatButton icon={<ShareAltOutlined />} onClick={handleShare} />
    </Spin>
  );
}

const PlaceHolder = ({ loading }) => {
  return (
    <div className="content__placeholder">
      <span>Search and visualize weather data</span> <Spin spinning={loading} />
    </div>
  );
};
