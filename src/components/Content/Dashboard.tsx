import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Card, Row, Col } from 'antd';
import { Line } from '@ant-design/plots';
import { getData } from "@/utils/api";


export default function Dashboard({ data }) {

  console.log(data)

  const [, setData] = useState<any>([]);
  const [fields, setFields] = useState<any>([]);
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

  return (
    <Layout.Content className="app__content">
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
    </Layout.Content>
  )
}