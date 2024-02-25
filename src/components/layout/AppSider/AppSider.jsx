import { Layout, Card } from 'antd';

const siderStyle = {
  padding: '1rem',
};
const AppSider = () => {
  return (
    <Layout.Sider
      width='25%'
      style={siderStyle}
    >
      <Card></Card>
    </Layout.Sider>
  );
};

export default AppSider;
