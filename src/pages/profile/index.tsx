import React, { useState } from 'react';
import Utils from '@/utils';
import { Tabs, Card, List, Avatar } from 'antd';
import { useHistory } from 'umi';
import DeliverModal from './deliverModal';
import './index.less';

const { TabPane } = Tabs;
const { Meta } = Card;
const Avatar1 = require('@/assets/images/avatar1.jpeg');
const Avatar3 = require('@/assets/images/avatar3.jpeg');
const Avatar5 = require('@/assets/images/avatar5.jpeg');

const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

function Profile() {
  const [visible, setVisible] = useState<boolean>(false);
  const history = useHistory();

  const address =
    Utils.formatAddress(sessionStorage.getItem('address') || '') || '0xJesscia';

  const renderTab1 = () => (
    <div className="tab1-wrapper">
      {[Avatar1, Avatar5, Avatar3].map((i, index) => (
        <Card
          onClick={() => history.push('/detail')}
          className="assets-item"
          hoverable
          key={index}
          style={{ width: 150 }}
          cover={<img src={i} />}
        >
          <Meta title="Alohomora" description="Impedimento" />
        </Card>
      ))}
    </div>
  );

  const renderTab2 = () => (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key="list-loadmore-edit">edit</a>,
            <a key="list-loadmore-more">cancel</a>,
          ]}
        >
          <>
            <List.Item.Meta
              title={<a>my request</a>}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. "
            />
            <div>2022/06/10 18:00</div>
          </>
        </List.Item>
      )}
    />
  );

  const handleClickDeliver = () => setVisible(true);

  const renderTab3 = () => (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={list.slice(2)}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key="list-loadmore-edit" onClick={handleClickDeliver}>
              deliver
            </a>,
            <a key="list-loadmore-more">cancel</a>,
          ]}
        >
          <>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a>looking for a brilliant avatar</a>}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            />
            <div>2022/06/10 18:00</div>
          </>
        </List.Item>
      )}
    />
  );

  return (
    <div className="profile-container">
      <div className="header-wrapper">
        <img src={Avatar1} />
        <div className="name">{address}</div>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Assets" key="1">
          <h2>My NFTs</h2>
          {renderTab1()}
        </TabPane>
        <TabPane tab="Requests" key="2">
          <h2>Requests for making avatar</h2>
          {renderTab2()}
        </TabPane>
        <TabPane tab="Tasks" key="3">
          <h2>My Tasks</h2>
          {renderTab3()}
        </TabPane>
      </Tabs>
      <DeliverModal visible={visible} onClose={setVisible} />
    </div>
  );
}

export default Profile;
