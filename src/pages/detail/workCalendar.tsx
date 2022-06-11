import React from 'react';
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Moment } from 'moment';

const getListData = (value: Moment) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: '做客《今日元宇宙》' },
        { type: 'success', content: '主持《MetaMeta》' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: '参与游戏宣传' },
        { type: 'success', content: '生活直播' },
        { type: 'error', content: '主持《MetaMeta》' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: '今日直播' },
        { type: 'success', content: '《元宇宙PK》' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

function WorkCalendar() {
  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };
  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
}

export default WorkCalendar;
