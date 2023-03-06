import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Card, Row, Col, Spin } from 'antd';
import { Line } from '@ant-design/plots';
import { getData } from "@utils/api";

import "./Content.css"


export default function Content() {
  const [data, setData] = useState<any>([]);
  const [fields, setFields] = useState<any>([]);
  const { text, query } = useSelector((state: any) => state);
  useEffect(() => {
    getData().then(data => {
      console.log(data)
      setData(data.data)
      setFields(data.fields)
    });
  }, [])

  const config = {
    data,
    // padding: 'auto',
    xField: 'timestamp',
  };

  if (!data?.length) return <PlaceHolder />

  return (
    <Spin>
      <div className="p-2">
        <span>{text}</span>
      </div>
      <Row gutter={{ lg: 0, xl: 8, xxl: 16 }}>
        {fields.map(field => {
          return (
            <Col lg={24} xl={12} xxl={8} >
              <Card>
                <Line {...config} yField={field} />
              </Card>
            </Col>
          )
        })}
      </Row>
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