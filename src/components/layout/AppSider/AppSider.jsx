import { Layout, Card, Statistic, List, Typography, Tag, Spin } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchAssets, fakeFetchCrypto } from '../../../api';
import { percentDifferrence } from '../../../utils';
const siderStyle = {
  padding: '1rem',
};

const AppSider = () => {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();
      setAssets(
        assets.map(asset => {
          const coin = result.find(c => c.id === asset.id);
          return {
            grow: asset.price < coin.price,
            growPersent: percentDifferrence(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        })
      );
      setCrypto(crypto);
      setLoading(false);
    }
    preload();
  }, [crypto]);
  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <Layout.Sider
      width='25%'
      style={siderStyle}
    >
      {assets.map(asset => (
        <Card
          key={asset.id}
          style={{ marginBottom: '1rem' }}
        >
          <Statistic
            title={asset.id}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix='$'
          />
          <List
            size='small'
            bordered
            dataSource={[
              {
                title: 'Total Profit',
                value: asset.totalProfit,
                withTag: true,
              },
              {
                title: 'Asset Amount',
                value: asset.amount,
                isPlain: true,
              },
            ]}
            renderItem={item => (
              <List.Item>
                <span>{item.title}</span>
                {item.isPlain && <span>{item.value}</span>}
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
};

export default AppSider;
