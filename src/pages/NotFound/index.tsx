import { type FC } from 'react';
import { NotFoundWrapper } from './style';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const NotFound: FC = () => {
  const navigate = useNavigate();
  return (
    <NotFoundWrapper>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    </NotFoundWrapper>
  );
};

export default NotFound;
