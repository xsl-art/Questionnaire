import { type FC } from 'react';
import { HomeWrapper } from './style';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const Home: FC = () => {
  const navigate = useNavigate();
  return (
    <HomeWrapper>
      <div className="content">
        <h2 className="title">问卷调查 | 在线投票</h2>
        <p className="desc">已累计创建问卷1000份，发布问卷100份，收到答卷10000份</p>
        <Button className="use" type="primary" size="large" onClick={() => navigate('/manage/my')}>
          开始使用
        </Button>
      </div>
    </HomeWrapper>
  );
};

export default Home;
