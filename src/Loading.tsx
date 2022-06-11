import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <LoadingOutlined />
    </div>
  );
}

export default Loading;
