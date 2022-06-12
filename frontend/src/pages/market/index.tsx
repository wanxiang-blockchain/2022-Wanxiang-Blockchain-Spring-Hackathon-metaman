import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'umi';

function Market() {
  const history = useHistory();
  return (
    <div style={{ padding: 40 }}>
      <h1>Market</h1>
      <Result
        status="404"
        title="404"
        subTitle="The market is under construction."
        extra={
          <Button type="primary" onClick={() => history.goBack()}>
            Back
          </Button>
        }
      />
    </div>
  );
}

export default Market;
