import { Space, Segmented } from 'antd';

export default function UnitSwitch() {
  return (
    <Space>
      <Segmented options={['m/s', 'km/h']} />
      <Segmented options={['°C', '°F']} />
    </Space>
  )
}
