import { useState, type FC } from 'react';
import { useComponentInfo } from '@/hooks/useComponentInfo';
import { useDispatch } from 'react-redux';
import { Button, Input, message, Space } from 'antd';
import {
  changeComponentTitle,
  changeSelectedId,
  hideSelectedComponent,
  lockSelectedComponent,
  moveComponent,
} from '@/store/componentsStore/componentsReducer';
import { ComponentLayerWrapper } from './style';
import classNames from 'classnames';
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import SortableItem from '@/components/DragSortable/SortableItem';
import SortableContainer from '@/components/DragSortable/SortableContainer';

const ComponentLayer: FC = () => {
  const { componentList, selectedId } = useComponentInfo();
  const dispatch = useDispatch();

  //当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState<string>('');

  //点击选中组件
  const handleClickSelect = (fe_id: string) => {
    const currentComponent = componentList.find(item => item.fe_id === fe_id);
    if (currentComponent && currentComponent.isHidden) {
      message.error('隐藏组件不能选中');
      return;
    }
    if (fe_id !== selectedId) {
      //当前组件未选中
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId('');
      return;
    }

    //点击修改标题
    setChangingTitleId(fe_id);
  };

  //修改标题
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;
    dispatch(changeComponentTitle({ fe_id: selectedId, newTitle }));
  };

  //切换隐藏显示
  const changeVisible = (fe_id: string, isHidden: boolean) => {
    dispatch(hideSelectedComponent({ fe_id, isHidden }));
  };

  //切换锁定解锁
  const changeLocked = (fe_id: string) => {
    dispatch(lockSelectedComponent({ fe_id }));
  };

  //SortableContainer组件的items属性需要id
  const componentListWithId = componentList.map(item => ({ ...item, id: item.fe_id }));

  //拖拽牌序结束
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }));
  };

  return (
    <ComponentLayerWrapper>
      <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        {componentList.map(item => {
          const { fe_id, title, isHidden, isLocked } = item;

          return (
            <SortableItem key={fe_id} id={fe_id}>
              <div key={fe_id} className="wrapper">
                <div
                  className={classNames('title', fe_id === selectedId ? 'selected' : '')}
                  onClick={() => handleClickSelect(fe_id)}
                >
                  {fe_id === changingTitleId && (
                    <Input
                      value={title}
                      onChange={e => changeTitle(e)}
                      onPressEnter={() => setChangingTitleId('')}
                      autoFocus={true}
                      onBlur={() => setChangingTitleId('')}
                    />
                  )}
                  {fe_id !== changingTitleId && title}
                </div>
                <div className="handler">
                  <Space>
                    <Button
                      size="small"
                      className={isHidden ? '' : 'btn'}
                      type={isHidden ? 'primary' : 'text'}
                      icon={<EyeInvisibleOutlined />}
                      onClick={() => changeVisible(fe_id, !isHidden)}
                    ></Button>
                    <Button
                      size="small"
                      className={isHidden ? '' : 'btn'}
                      type={isLocked ? 'primary' : 'text'}
                      icon={<LockOutlined />}
                      onClick={() => changeLocked(fe_id)}
                    ></Button>
                  </Space>
                </div>
              </div>
            </SortableItem>
          );
        })}
      </SortableContainer>
    </ComponentLayerWrapper>
  );
};

export default ComponentLayer;
