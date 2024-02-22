import { Layout } from 'antd';
import AppHeader from './components/layout/AppHeader/AppHeader';
import AppSider from './components/layout/AppSider/AppSider';
import AppContent from './components/layout/AppContent/AppContent';

function App() {
  return (
    <>
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    </>
  );
}

export default App;
