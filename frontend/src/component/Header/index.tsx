import React, { useState } from 'react';
import './index.less';
import logo from '@/assets/images/logo.png';
import { Input, Button, Drawer, Dropdown, Menu } from 'antd';
import { UserOutlined, WalletOutlined } from '@ant-design/icons';
import { init } from '../../utils/web3';
import { useHistory } from 'umi';
import { Link } from 'umi';
import Utils from '@/utils';

const metamask = require('@/assets/images/metamask.png');
const unipass = require('@/assets/images/unipass.png');

function Header(): JSX.Element {
  const [address, setAddress] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const history = useHistory();
  const handleConnect = () => {
    init((res: any) => {
      if (res) {
        setAddress(res);
        sessionStorage.setItem('address', res);
      }
    });
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a className="menu-item" onClick={handleConnect}>
              MetaMask <img className="icon" src={metamask} />
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a className="menu-item" onClick={handleConnect}>
              Unipass <img className="icon" src={unipass} />
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <div className="header-container">
      <nav className="nav-wrapper">
        <div className="title" onClick={() => history.push('/')}>
          <img src={logo} />
          METRIX
        </div>
        <Input.Search
          placeholder="search masterpiece"
          enterButton
          className="search-bar"
        />
        <Button type="link" onClick={() => history.push('/market')}>
          Market
        </Button>
        <Button type="link" onClick={() => history.push('/task')}>
          Task
        </Button>
        <Button type="link" onClick={() => history.push('/create')}>
          Bounty
        </Button>
        {address ? (
          <Button
            onClick={() => setVisible(true)}
            shape="circle"
            icon={<UserOutlined />}
            size="large"
          />
        ) : (
          <Dropdown overlay={menu}>
            <Button type="primary">Connect</Button>
          </Dropdown>
          // <Button
          //   className="connect-btn"
          //   type="primary"
          //   onClick={handleConnect}
          // >
          //   Connect
          // </Button>
        )}
      </nav>
      <Drawer onClose={() => setVisible(false)} visible={visible}>
        <div className="drawer-container">
          <div style={{ marginBottom: 10 }}>
            <div className="wallet">
              <WalletOutlined className="wallet-icon" />
            </div>
            <span style={{ fontWeight: 'bold', fontSize: 16 }}>
              {Utils.formatAddress(address || '')}
            </span>
          </div>
          <Button
            type="primary"
            onClick={() => {
              history.push('/profile');
              setVisible(false);
            }}
          >
            Profile
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default Header;
