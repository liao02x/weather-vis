import { Layout, Space } from 'antd';

export default function Header() {
  return (
    <Layout.Header className="app__header">
      <div className="d-f a-b g-2">
        <h1>w-vis</h1>{" "}
        <span>search and visualize weather data</span>
      </div>
    </Layout.Header>
  )
}