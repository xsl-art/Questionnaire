import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { QuestionLayoutWrapper } from './style';
const QuestionLayout: FC = () => {
  return (
    <QuestionLayoutWrapper>
      <div className="header"></div>
      <div className="main">
        <Outlet />
      </div>
      <div className="footer"></div>
    </QuestionLayoutWrapper>
  );
};

export default QuestionLayout;
