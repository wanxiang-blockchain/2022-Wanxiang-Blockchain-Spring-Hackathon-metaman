import React, { useState } from 'react';
import { List, Space, Avatar, Button } from 'antd';
import {
  MessageOutlined,
  StarOutlined,
  MoneyCollectOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import './index.less';

const getRandom = (num: number) => Math.floor(Math.random() * num);

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function Task() {
  const [data, setData] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      key: i,
      href: '',
      title: `Request an avatar`,
      avatar: 'https://joeschmoe.io/api/v1/random',
      description: '',
      checked: false,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.',
    })),
  );

  const handleClickOrder = (index: number) => {
    const _data = [...data];
    _data[index].checked = true;
    setData(_data);
  };

  return (
    <div className="task-container">
      <h1>Avatar Request List</h1>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            key={item.key}
            actions={[
              <IconText
                icon={StarOutlined}
                text={getRandom(100).toString()}
                key="list-vertical-star-o"
              />,
              <IconText
                icon={MoneyCollectOutlined}
                text={getRandom(100).toString()}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={getRandom(100).toString()}
                key="list-vertical-message"
              />,
            ]}
            extra={
              item?.checked ? (
                <CheckCircleOutlined style={{ color: 'green', fontSize: 18 }} />
              ) : (
                <Button type="primary" onClick={() => handleClickOrder(index)}>
                  Order
                </Button>
              )
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item?.href}>{item.title}</a>}
              description={item?.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
}

export default Task;
