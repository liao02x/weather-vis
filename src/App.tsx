import { useState } from 'react'
import './App.css'

import { Layout } from 'antd';
import Search from "@components/Search";
import { getData } from "@utils/api";

const { Header, Footer, Content } = Layout;

getData().then(console.log)

function App() {

  return (
    <Layout className="app__root">
      <Header className="app__header">Header</Header>
      <Layout className="app__container">
        <Search />
        <Content className="app__content">Content</Content>
      </Layout>
      <Footer className="app__footer">Footer</Footer>
    </Layout>
  )
}

export default App
