import httpInstance, { type ResDataType } from '../service/index';

type SearchOption = {
  keyword?: string;
  isStar: boolean;
  isDeleted?: boolean;
  page: number;
  pageSize: number;
};

type UserInfo = {
  username: string;
  nickname?: string;
  password: string;
};
//获取单个问卷
export const getQuestionService = async (id: string): Promise<ResDataType> => {
  const url = `/api/question/${id}`;
  const data = (await httpInstance.get(url)) as ResDataType;
  return data;
};

//新建问卷
export const createQuestionService = async (): Promise<ResDataType> => {
  const url = '/api/question';
  const data = (await httpInstance.post(url)) as ResDataType;
  return data;
};

//获取问卷列表
export const getQuestionListService = async (
  option: Partial<SearchOption> = {}
): Promise<ResDataType> => {
  const url = '/api/question';
  const data = (await httpInstance.get(url, { params: option })) as ResDataType;
  return data;
};

//更新单个问卷
export const updateQuestionService = async (
  id: number,
  option: { [key: string]: any }
): Promise<ResDataType> => {
  const url = `/api/question/${id}`;
  const data = (await httpInstance.patch(url, option)) as ResDataType;
  return data;
};

//复制问卷
export const copyQuestionService = async (id: number): Promise<ResDataType> => {
  const url = `/api/question/duplicate/${id}`;
  const data = (await httpInstance.post(url)) as ResDataType;
  return data;
};

//彻底删除问卷
export const deleteQuestionService = async (ids: number[]): Promise<ResDataType> => {
  const url = '/api/question';
  const data = (await httpInstance.delete(url, { data: { ids } })) as ResDataType;
  return data;
};

//获取用户信息
export const getUserInfoService = async (): Promise<ResDataType> => {
  const url = '/api/user/info';
  const data = (await httpInstance.get(url)) as ResDataType;
  return data;
};

//注册
export const registerService = async (user: UserInfo): Promise<ResDataType> => {
  const url = '/api/user/register';
  const body = { ...user };
  const data = (await httpInstance.post(url, body)) as ResDataType;
  return data;
};

//登录
export const loginService = async (user: UserInfo): Promise<ResDataType> => {
  const url = '/api/user/login';
  const body = { username: user.username, password: user.password };
  const data = (await httpInstance.post(url, body)) as ResDataType;
  return data;
};
