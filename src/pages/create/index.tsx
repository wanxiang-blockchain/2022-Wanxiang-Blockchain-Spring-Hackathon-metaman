import React, { useState } from 'react';
import { Form, Input, Button, Upload, InputNumber } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import { useHistory } from 'umi';
import './index.less';

function Create() {
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const onFinish = () => history.push('/task');

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const normFile = (e: any) => {
    if (e.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (e.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(e.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="create-container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <h1>Post Your Avatar Creation Request</h1>
        <br />
        <Form.Item label="Name" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Photo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Publish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Create;
