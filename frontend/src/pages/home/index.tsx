import React from 'react';
import { Avatar, Card, Carousel } from 'antd';
import { useHistory } from 'umi';
import './index.less';

const Avatar1 = require('@/assets/images/avatar1.jpeg');
const Avatar2 = require('@/assets/images/avatar2.jpeg');
const Avatar3 = require('@/assets/images/avatar3.jpeg');
const Avatar4 = require('@/assets/images/avatar4.jpeg');
const Avatar5 = require('@/assets/images/avatar5.jpeg');

const { Meta } = Card;

const avatarList = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5];

function Home() {
  const history = useHistory();
  const renderCard = (i: any, index: number) => (
    <Card
      key={index}
      hoverable
      className="card-item"
      style={{ width: 240 }}
      onClick={() => history.push('/detail')}
      cover={<img src={avatarList[index % avatarList?.length]} />}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={`Tanner Burnett ${index + 1}`}
        description="Lorem ipsum dolor sit amet."
      />
    </Card>
  );

  const renderCarousel = (i: any, index: number) => (
    <Card
      key={index}
      hoverable
      className="carousel-item"
      onClick={() => history.push('/detail')}
      cover={<img src={avatarList[index]} />}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Lorem ipsum dolor sit amet."
      />
    </Card>
  );

  return (
    <div className="home-container">
      <div className="recommend-wrapper">
        <div className="slogan">
          Create,
          <br /> Display <br />{' '}
          <span style={{ fontSize: 20, color: 'grey' }}>and</span> Social <br />{' '}
          Here
        </div>
        <div className="carousel-wrapper">
          <Carousel effect="fade" autoplay>
            {[...Array(5)].map(renderCarousel)}
          </Carousel>
        </div>
      </div>
      <h1>Featured Works</h1>
      <div className="card-wrapper">{[...Array(15)].map(renderCard)}</div>
    </div>
  );
}

export default Home;
