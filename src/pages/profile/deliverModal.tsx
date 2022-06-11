import React, { useState, useEffect } from 'react';
import { Modal, Form, Upload, Spin } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

interface IProps {
  visible: boolean;
  onClose: (v: boolean) => void;
}

function DeliverModal(props: IProps) {
  const [form] = Form.useForm();
  const [spin, setSpin] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const { visible, onClose } = props;

  useEffect(() => {
    if (!visible) {
      setSpin(false);
      setLoading(false);
    }
  }, [visible]);

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

  const onFinish = () => {
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
      onClose(false);
    }, 3000);
  };

  return (
    <Modal visible={visible} onCancel={() => onClose(false)} onOk={onFinish}>
      <Spin spinning={spin}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="upload"
            label="Attach"
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
        </Form>
      </Spin>
    </Modal>
  );
}

export default DeliverModal;
