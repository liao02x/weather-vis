import { Layout } from 'antd';
import Search from "@components/Search";
import Content from '@components/Content';
import { getData } from "@utils/api";

import './App.css'

const { Header, Footer } = Layout;

getData().then(console.log)

function App() {
  return (
    <Layout className="app__root">
      <Header className="app__header">Header</Header>
      <Layout className="app__container">
        <Search />
        <Content />
      </Layout>
      <Footer className="app__footer">Footer</Footer>
    </Layout>
  )
}

export default App
