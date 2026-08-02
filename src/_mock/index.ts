import Mock from 'mockjs';

Mock.mock('/api/register', 'post', {
  code: 200,
  msg: '注册成功',
});
