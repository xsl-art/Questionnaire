import { useMemo, useRef, type FC } from 'react';
import { StatisticsHeaderWrapper } from './style';
import {
  Button,
  Input,
  message,
  Popover,
  QRCode,
  Space,
  Tooltip,
  Typography,
  type InputRef,
} from 'antd';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { usePageInfo } from '@/hooks/usePageInfo';
import { useParams } from 'react-router-dom';

const { Title } = Typography;
const StatisticsHeader: FC = () => {
  const { title, isPublished } = usePageInfo();
  const { id } = useParams();
  const urlInputRef = useRef<InputRef>(null);

  function copy() {
    const elem = urlInputRef.current;
    if (elem == null) return;
    elem.select();
    document.execCommand('copy');
    message.success('复制成功');
  }

  const LinkAndQRCodeElement = useMemo(() => {
    if (!isPublished) return null;

    // 拼接 url
    const url = `http://localhost:3000/question/${id}`;

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }, [id, isPublished]);

  return (
    <StatisticsHeaderWrapper>
      <div className="left">
        <Button type="text" icon={<LeftOutlined />}>
          返回
        </Button>
        <Title style={{ fontSize: '22px' }}>{title}</Title>
      </div>
      <div className="center">{LinkAndQRCodeElement}</div>
      <div className="right">
        <Button type="primary">编辑问卷</Button>
      </div>
    </StatisticsHeaderWrapper>
  );
};

export default StatisticsHeader;
