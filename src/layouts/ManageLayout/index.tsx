import { type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ManageLayoutWrapper } from './style';
import { Button, message, Space } from 'antd';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import { createQuestionService } from '@/api';
import { useRequest } from 'ahooks';
const ManageLayout: FC = () => {
  const navigate = useNavigate();
  /*   const [loading, setLoading] = useState(false);
  const handleCreate = async () => {
    setLoading(true);
    const data = await createQuestionService();
    const { id } = data;
    console.log('新建问卷id', id);
    if (id) {
      navigate(`/question/edit/${id}`);
      message.success('新建问卷成功');
    }
    setLoading(false);
  }; */
  const { loading, run: handleCreate } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: res => {
      navigate(`/question/edit/${res.id}`);
      message.success('新建问卷成功');
    },
  });
  return (
    <ManageLayoutWrapper>
      <div className="left">
        <Space orientation="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => handleCreate()}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Button
            type="default"
            size="large"
            icon={<BarsOutlined />}
            onClick={() => navigate('/manage/my')}
          >
            我的问卷
          </Button>
          <Button
            type="default"
            size="large"
            icon={<StarOutlined />}
            onClick={() => navigate('/manage/star')}
          >
            收藏问卷
          </Button>
          <Button
            type="default"
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => navigate('/manage/trash')}
          >
            删除问卷
          </Button>
        </Space>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </ManageLayoutWrapper>
  );
};

export default ManageLayout;
