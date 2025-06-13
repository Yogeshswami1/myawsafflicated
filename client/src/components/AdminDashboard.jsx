import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import AdminPanel from './AdminPanel'; // Existing AdminPanel component
import styles from './AdminDashboard.module.css';

const { Sider, Content } = Layout;

const AdminDashboard = () => {
  const [selectedKey, setSelectedKey] = useState('shop-products');

  const menuItems = [
    {
      key: 'shop',
      icon: <ShopOutlined />,
      label: 'Shop',
      children: [
        {
          key: 'shop-products',
          label: 'Manage Products',
        },
      ],
    },
    // Add more sections in the future (e.g., Analytics, Users)
  ];

  const handleMenuSelect = ({ key }) => {
    setSelectedKey(key);
  };

  return (
    <Layout className={styles.layout}>
      <Sider width={250} className={styles.sider}>
        <div className={styles.logo}>
          <h2>Admin Dashboard</h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}
          items={menuItems}
          className={styles.menu}
        />
      </Sider>
      <Layout>
        <Content className={styles.content}>
          {selectedKey === 'shop-products' && <AdminPanel />}
          {/* Add more sections in the future */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;