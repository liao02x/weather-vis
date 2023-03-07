import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Spin } from 'antd';
import { useRequest } from 'ahooks';
import { Line } from '@ant-design/plots';
import { getData } from "@/utils/api";
import Dashboard from './Dashboard';

import "./Content.css"

const load = (query, timestamp) => {
  const now = Date.now()
  console.log(now, timestamp)
  return getData(query).then(data => {
    return {
      ...data,
      queryChanged: now - timestamp < 1000,
    }
  })
}

export default function Content() {
  const [fields, setFields] = useState<any>([]);
  const { text, query } = useSelector((state: any) => state);

  const { data, loading, run, cancel } = useRequest(load, {
    pollingInterval: 60 * 1000,
    manual: true,
  });

  useEffect(() => {
    if (query) {
      run(query, Date.now());
    }
  }, [query])

  const config = {
    data,
    xField: 'timestamp',
  };

  if (!data) return <PlaceHolder />

  console.log(data)

  return (
    <Spin spinning={loading}>
      <div className="p-2">
        <span>{text}</span>
      </div>
      <Dashboard data={data} />
    </Spin>
  )
}

const PlaceHolder = () => {
  return (
    <div className="content__placeholder">
      <span>Search and visualize weather data</span>
    </div>
  )
}