import { Layout } from 'antd';
import Search from "@components/Search";
import Header from '@components/Header';
import Content from '@components/Content';
import { getData } from "@utils/api";

import './App.css'

const { Footer } = Layout;

getData().then(console.log)

function App() {
  return (
    <Layout className="app__root">
      <Header/>
      <Layout className="app__container">
        <Search />
        <Content />
      </Layout>
      <Footer className="app__footer">
        <span>by @liao02x</span>
      </Footer>
    </Layout>
  )
}

export default App
