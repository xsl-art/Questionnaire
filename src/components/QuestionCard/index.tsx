import { useState, type FC } from 'react';
import { QuestionCardWrapper } from './style.ts';
import { Button, Space, Popconfirm, message } from 'antd';
import {
  EditOutlined,
  LineChartOutlined,
  HeartOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import type { ListProps } from '../List/index.tsx';
import { useRequest } from 'ahooks';
import { copyQuestionService, updateQuestionService } from '@/api/index.ts';
const QuestionCard: FC<ListProps> = (props: ListProps) => {
  const navigate = useNavigate();
  const { id, title, isPublished, isStared, answerCount, createAT } = props;

  const [isStarState, setIsStarState] = useState(isStared);
  const [isDeleted, setIsDeleted] = useState(false);

  //复制
  const { loading: copyLoading, run: handleCopy } = useRequest(
    async () => await copyQuestionService(id),
    {
      manual: true,
      onSuccess: (res: any) => {
        message.success('复制成功');
        //跳转编辑页
        navigate(`/question/edit/${res.id || res._id}`);
      },
    }
  );

  //删除问卷
  const { loading: deleteLoading, run: handleDelete } = useRequest(
    async () => await updateQuestionService(id, { isDeleted: true }),
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功');
        setIsDeleted(true);
      },
    }
  );

  //收藏
  const { loading: collectLoading, run: handleCollect } = useRequest(
    async () => {
      await updateQuestionService(id, { isStared: !isStarState });
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStarState(!isStarState);
        if (!isStarState) {
          message.success('收藏成功');
        } else {
          message.success('取消收藏成功');
        }
      },
    }
  );

  if (isDeleted) {
    return null;
  }

  return (
    <QuestionCardWrapper>
      <div className="card">
        <div className="card-header">
          <Link
            className="header-left"
            to={isPublished ? `/question/statistics/${id}` : `/question/edit/${id}`}
          >
            <Space>
              {isStarState && <HeartOutlined style={{ color: 'red' }} />}
              <span className="name">{title}</span>
              <span className="time">{createAT}</span>
            </Space>
          </Link>
          <div className="header-right">
            {isPublished ? (
              <div
                className="status"
                style={{ color: 'green', border: '1px solid green', backgroundColor: '#C8E6C9' }}
              >
                已发布
              </div>
            ) : (
              <div
                className="status"
                style={{ color: 'red', border: '1px solid red', backgroundColor: '#FFCDD2' }}
              >
                未发布
              </div>
            )}
            <span className="apply">答卷:{answerCount}</span>
            <span className="deadline">2025-06-010 06:39</span>
          </div>
        </div>
        <div className="card-content">
          <div className="content-left">
            <Space>
              <Button
                type="text"
                icon={<EditOutlined />}
                size="small"
                onClick={() => navigate(`/question/edit/${id}`)}
              >
                编辑问卷
              </Button>
              <Button
                type="text"
                icon={<LineChartOutlined />}
                size="small"
                onClick={() => navigate(`/question/statistics/${id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className="content-right">
            <Space>
              <Button
                type="text"
                icon={<HeartOutlined />}
                size="small"
                onClick={() => handleCollect()}
                disabled={collectLoading}
              >
                {isStarState ? '取消收藏' : '收藏'}
              </Button>
              <Popconfirm
                title="复制此问卷"
                description="确认复制吗？"
                okText="确认"
                cancelText="取消"
                onConfirm={() => handleCopy()}
                disabled={copyLoading}
              >
                <Button type="text" icon={<CopyOutlined />} size="small">
                  复制
                </Button>
              </Popconfirm>
              <Popconfirm
                title="删除此问卷"
                description="确认删除吗？"
                okText="确认"
                cancelText="取消"
                onConfirm={() => handleDelete()}
                disabled={deleteLoading}
              >
                <Button type="text" icon={<DeleteOutlined />} size="small">
                  删除
                </Button>
              </Popconfirm>
            </Space>
          </div>
        </div>
      </div>
    </QuestionCardWrapper>
  );
};
export default QuestionCard;
