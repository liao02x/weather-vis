import { useEffect, useState } from 'react';
import { Layout, Grid } from 'antd';

import Card from './Card';

import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

const { useBreakpoint } = Grid;

export const renderDashboardItem = ({ grid, children }) => (
  <div className="dashboard_item__wrapper" key={grid.i} data-grid={grid}>
    <div className="dashboard_item">
      {children}
    </div>
  </div>
);

export default function Dashboard({ data: res }) {
  const [data, setData] = useState<any>([]);
  const [fields, setFields] = useState<any>([]);
  const [layout, setLayout] = useState<any>([]);
  const [row, setRow] = useState(3);

  const { xs, xl, xxl } = useBreakpoint();

  useEffect(() => {
    setFields(res.fields)
    setData(res.data)
    setLayout(generateLayout(res.fields, row))
  }, [res.queryChanged])

  useEffect(() => {
    if (typeof xxl === 'boolean') {
      setRow(xxl ? 3 : xl ? 2 : 1)
    }
  }, [xxl, xl])

  useEffect(() => {
    setLayout(generateLayout(res.fields, row))
  }, [row])

  console.log(useBreakpoint())

  const generateLayout = (fields, row) => {
    const w = 4, h = 6;
    const layout = fields.map((field, i) => ({
      i: `${row}-${i}`,
      x: i % row * w,
      y: Math.floor(i / row) * h,
      w,
      h,
    }));
    return layout;
  }

  const handleOnLayoutChange = (layout) => {
    setLayout(layout);
  };

  return (
    <Layout.Content className="app__content">
      <ReactGridLayout
        className="dashboard__layout"
        margin={[16, 12]}
        // draggableHandle=".rgl-draggable"
        containerPadding={[16, 16]}
        cols={row * 4}
        rowHeight={50}
        onLayoutChange={handleOnLayoutChange}
        isDraggable={!xs}
        isResizable={false}
        measureBeforeMount
      >
        {layout.map((grid, i) => {
          const field = fields[i];
          return renderDashboardItem({
            grid,
            children: <Card data={data} field={field} />
          })
        })}
      </ReactGridLayout>
    </Layout.Content>
  )
}