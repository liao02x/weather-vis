import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "antd";
import Search from "@/components/Search";
import Header from "@/components/Header";
import Content from "@/components/Content";
import { _setQuery } from "@/store";
import qs from "qs";

import "./App.css";

const { Footer } = Layout;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const q = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    if (q.s) {
      try {
        const { text, query } = JSON.parse(atob(q.s));
        if (typeof text === "string" && typeof query === "string") {
          dispatch(_setQuery({ text, query }));
        }
      } catch (e) {}
    }
  }, []);
  return (
    <Layout className="app__root">
      <Header />
      <Layout className="app__container">
        <Search />
        <Layout.Content className="app__content">
          <Content />
        </Layout.Content>
      </Layout>
      <Footer className="app__footer">
        <span>by @liao02x</span>
      </Footer>
    </Layout>
  );
}

export default App;
