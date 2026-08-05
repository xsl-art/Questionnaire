import { useEffect, type FC } from 'react';
import { PageSettingWrapper } from './style';
import { usePageInfo } from '@/hooks/usePageInfo';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { resetPageInfo } from '@/store/pageInfoStore/pageInfoReducer';

const { TextArea } = Input;
const PageSetting: FC = () => {
  const pageInfo = usePageInfo();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo, form]);

  const handleValueChange = () => {
    dispatch(resetPageInfo(form.getFieldsValue()));
  };
  return (
    <PageSettingWrapper>
      <Form
        form={form}
        layout="vertical"
        initialValues={pageInfo}
        onValuesChange={handleValueChange}
      >
        <Form.Item
          label="页面标题"
          name="title"
          rules={[{ required: true, message: '请输入页面标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="页面描述" name="desc">
          <TextArea />
        </Form.Item>
        <Form.Item label="样式代码" name="css">
          <TextArea />
        </Form.Item>
        <Form.Item label="脚本代码" name="js">
          <TextArea />
        </Form.Item>
      </Form>
    </PageSettingWrapper>
  );
};

export default PageSetting;
