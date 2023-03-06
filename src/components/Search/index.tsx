import { Divider } from 'antd';
import SearchForm from './SearchForm';
import UnitSwitch from './UnitSwitch';

export default function Search() {
  return (
    <section className="app__sider">
      <SearchForm />
      <Divider />
      <UnitSwitch />
    </section>
  )
}