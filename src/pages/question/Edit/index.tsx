import { type FC } from 'react';
import { EditWrapper } from './style';

import { useLoadQuestionData } from '@/hooks/useLoadQuestionData';

import EditCanvas from './EditCanvas';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '@/store/componentsStore/componentsReducer';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import EditHeader from './EditHeader';
const Edit: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useLoadQuestionData();
  const cancelSelected = () => {
    dispatch(changeSelectedId(''));
  };

  return (
    <EditWrapper>
      <div className="header">
        <EditHeader />
      </div>
      <div className="content">
        <div className="left">
          <LeftPanel />
        </div>
        <div className="center" onClick={() => cancelSelected()}>
          <div className="canvas-area">
            <div className="canvas-wrapper">
              <EditCanvas loading={loading} />
            </div>
          </div>
        </div>
        <div className="right">
          <RightPanel />
        </div>
      </div>
    </EditWrapper>
  );
};

export default Edit;
