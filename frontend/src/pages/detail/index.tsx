import React from 'react';
import { Descriptions, Tag, Timeline } from 'antd';
import Utils from '@/utils';
import WorkCalendar from './workCalendar';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'umi';
import './index.less';

const Avatar1 = require('@/assets/images/avatar1.jpeg');

function Detail() {
  const history = useHistory();
  const address = Utils.formatAddress(sessionStorage.getItem('address') || '');

  const handleClickTag = () => history.push('/market');

  return (
    <div className="detail-container">
      <div style={{ display: 'flex' }}>
        <div className="img-wrapper">
          <img className="img-work" src={Avatar1} />
          <Tag color="magenta" className="tag e-1" onClick={handleClickTag}>
            0xbax..
          </Tag>
          <Tag color="lime" className="tag e-2" onClick={handleClickTag}>
            0xf12b..
          </Tag>
          <Tag color="geekblue" className="tag e-3" onClick={handleClickTag}>
            0xlp1x..
          </Tag>
          <Tag color="orange" className="tag e-4" onClick={handleClickTag}>
            0xowke..
          </Tag>
        </div>
        <div className="description-wrapper">
          <Descriptions title="0xJessica" bordered>
            <Descriptions.Item label="Owner" span={2}>
              <a>{address || 'Satoshi'}</a>
            </Descriptions.Item>
            <Descriptions.Item label="Create Time">
              2022-06-10 18:00:00
            </Descriptions.Item>
            <Descriptions.Item label="Contract Address" span={2}>
              <a>0xD316*****96A5</a>
            </Descriptions.Item>
            <Descriptions.Item label="Token">
              <a>1025</a>
            </Descriptions.Item>
            <Descriptions.Item label="Creator" span={2}>
              <a>DID:metrix:P2O6*****XM23</a>
            </Descriptions.Item>
            <Descriptions.Item label="Designer">
              <a>DID:metrix:EW8A*****X72L</a>
            </Descriptions.Item>

            <Descriptions.Item label="Birth Certificate" span={3}>
              <a
                target="_blank"
                href="https://ipfs.io/ipfs/QmefmjSguNLuwXNiYtp7DNENYWbsSd4i5rKtxJbNEx7LFQ?filename=birth_cert.json"
              >
                https://ipfs.io/ipfs/QmefmjSguNLuwXNiYtp7DNENYWbsSd4i5rKtxJbNEx7LFQ?filename=birth_cert.json
              </a>
            </Descriptions.Item>
            <Descriptions.Item label="IPFS" span={3}>
              <a
                href="https://ipfs.io/ipfs/QmYadFKVgcVtuTGBA6KvuVcn4iP58ds5LkYGGiRWHwwmWm?filename=%E5%A4%B4%E5%83%8F.png"
                target="_blank"
              >
                https://ipfs.io/ipfs/QmYadFKVgcVtuTGBA6KvuVcn4iP58ds5LkYGGiRWHwwmWm?filename=%E5%A4%B4%E5%83%8F.png
              </a>
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
      <div className="work-wrapper">
        <h1>Attendance Record</h1>
        {/* <div className="calendar-wrapper">
          <WorkCalendar />
        </div> */}
        <Timeline mode="alternate">
          <Timeline.Item>2032-01-20：参加《元宇宙PK》</Timeline.Item>
          <Timeline.Item>2032-04-02：每日直播</Timeline.Item>
          <Timeline.Item>2032-05-01：参与游戏《超级冲击》宣传</Timeline.Item>
          <Timeline.Item color="red">
            2032-05-14：主持《今日元宇宙节目》
          </Timeline.Item>
          <Timeline.Item
            dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
          >
            2032-06-18：参与X2E讨论
          </Timeline.Item>
          <Timeline.Item
            dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
          >
            2032-10-21：土地拍卖直播
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
}

export default Detail;
