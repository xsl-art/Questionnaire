import { useState, type FC } from 'react';
import { EditHeaderWrapper } from './style';
import {
  BlockOutlined,
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeInvisibleFilled,
  EyeInvisibleOutlined,
  EyeOutlined,
  LeftCircleOutlined,
  LoadingOutlined,
  LockOutlined,
  RedoOutlined,
  SendOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Button, Input, message, Space, Tooltip, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteSelectedComponent,
  hideSelectedComponent,
  lockSelectedComponent,
  copySelectedComponent,
  pasteSelectedComponent,
  moveComponent,
} from '@/store/componentsStore/componentsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useComponentInfo } from '@/hooks/useComponentInfo';
import { usePageInfo } from '@/hooks/usePageInfo';
import { updateTitle } from '@/store/pageInfoStore/pageInfoReducer';
import { togglePreviewMode } from '@/store/previewStore/previewReducer';
import type { StateType } from '@/store';
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';
import { updateQuestionService } from '@/api';
import { ActionCreators as UndoCreators } from 'redux-undo';

const { Title } = Typography;

const PublishButton: FC = () => {
  const navigate = useNavigate();
  //save componentList pageInfo id
  const { componentList = [] } = useComponentInfo();
  const pageInfo = usePageInfo();
  const { id } = useParams();

  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList, isPublish: true });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功');
        navigate(`/question/statistics/${id}`);
      },
      onError: () => {
        message.error('发布失败');
      },
    }
  );

  return (
    <Button icon={<SendOutlined />} disabled={loading} onClick={() => publish()}>
      发布
    </Button>
  );
};
const SaveButton: FC = () => {
  //save componentList pageInfo id
  const { componentList = [] } = useComponentInfo();
  const pageInfo = usePageInfo();
  const { id } = useParams();

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    { manual: true }
  );

  //快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault();
    if (loading) return;
    save();
  });

  //自动保存
  useDebounceEffect(
    () => {
      save();
    },
    [componentList, pageInfo],
    { wait: 10000 }
  );

  return (
    <Button
      icon={loading ? <LoadingOutlined /> : <CheckOutlined />}
      onClick={() => save()}
      disabled={loading}
    >
      保存
    </Button>
  );
};
const TitleElement: FC = () => {
  const { title } = usePageInfo();
  const [editState, setEditState] = useState(false);
  const dispatch = useDispatch();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim();
    if (!newTitle) return;
    dispatch(updateTitle(newTitle));
  };
  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleTitleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      />
    );
  }

  return (
    <Space>
      <Title style={{ fontSize: 22 }}>{title}</Title>
      <Button type="text" icon={<EditOutlined />} onClick={() => setEditState(true)}></Button>
    </Space>
  );
};

const EditHeader: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedId, selectedComponent, copiedComponent, componentList = [] } = useComponentInfo();
  const { isLocked } = selectedComponent || {};
  const isPreviewMode = useSelector((state: StateType) => state.preview.isPreviewMode);

  const length = componentList.length;
  const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId);
  const isFirst = selectedIndex <= 0;
  const isLast = selectedIndex + 1 >= length;

  const handleDelete = () => {
    dispatch(deleteSelectedComponent());
  };

  const handleHide = () => {
    dispatch(hideSelectedComponent({ fe_id: selectedId, isHidden: true }));
  };

  const handleLock = () => {
    dispatch(lockSelectedComponent({ fe_id: selectedId }));
  };

  const handleCopy = () => {
    dispatch(copySelectedComponent());
  };

  const handlePaste = () => {
    dispatch(pasteSelectedComponent());
  };

  const handleMoveUp = () => {
    if (isFirst) return;
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
  };

  const handleMOveDown = () => {
    if (isLast) return;
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
  };

  const handleUndo = () => {
    dispatch(UndoCreators.undo());
  };

  const handleRedo = () => {
    dispatch(UndoCreators.redo());
  };

  const handleTogglePreview = () => {
    dispatch(togglePreviewMode());
  };

  return (
    <EditHeaderWrapper>
      <div className="left">
        <Button
          className="return-btn"
          type="link"
          size="small"
          icon={<LeftCircleOutlined />}
          onClick={() => navigate(-1)}
        >
          返回
        </Button>
        <TitleElement />
      </div>
      <div className="center">
        <Space>
          <Tooltip title="删除">
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete()}
            ></Button>
          </Tooltip>

          <Tooltip title="隐藏">
            <Button
              shape="circle"
              icon={<EyeInvisibleFilled />}
              onClick={() => handleHide()}
            ></Button>
          </Tooltip>

          <Tooltip title={isLocked ? '解锁' : '锁定'}>
            <Button
              shape="circle"
              type={isLocked ? 'primary' : 'default'}
              icon={<LockOutlined />}
              onClick={() => handleLock()}
            ></Button>
          </Tooltip>

          <Tooltip title="复制">
            <Button shape="circle" icon={<CopyOutlined />} onClick={() => handleCopy()}></Button>
          </Tooltip>

          <Tooltip title="粘贴">
            <Button
              shape="circle"
              disabled={copiedComponent == null}
              icon={<BlockOutlined />}
              onClick={() => handlePaste()}
            ></Button>
          </Tooltip>

          <Tooltip title="上移">
            <Button
              shape="circle"
              disabled={isFirst}
              icon={<UpOutlined />}
              onClick={() => handleMoveUp()}
            ></Button>
          </Tooltip>
          <Tooltip title="下移">
            <Button
              shape="circle"
              disabled={isLast}
              icon={<DownOutlined />}
              onClick={() => handleMOveDown()}
            ></Button>
          </Tooltip>
          <Tooltip title={isPreviewMode ? '退出预览' : '条件预览'}>
            <Button
              shape="circle"
              type={isPreviewMode ? 'primary' : 'default'}
              icon={isPreviewMode ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              onClick={() => handleTogglePreview()}
            ></Button>
          </Tooltip>
          <Tooltip title="撤销">
            <Button shape="circle" icon={<UndoOutlined />} onClick={() => handleUndo()}></Button>
          </Tooltip>
          <Tooltip title="恢复">
            <Button shape="circle" icon={<RedoOutlined />} onClick={() => handleRedo()}></Button>
          </Tooltip>
        </Space>
      </div>
      <div className="right">
        <Space>
          <SaveButton />
          <PublishButton />
        </Space>
      </div>
    </EditHeaderWrapper>
  );
};

export default EditHeader;
