import { useEffect, useMemo, type FC } from 'react';
import { PageSettingWrapper } from './style';
import { usePageInfo } from '@/hooks/usePageInfo';
import { useComponentInfo } from '@/hooks/useComponentInfo';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { resetPageInfo } from '@/store/pageInfoStore/pageInfoReducer';
import CodeEditor from '../CodeEditor';

const { TextArea } = Input;

const PageSetting: FC = () => {
  const pageInfo = usePageInfo();
  const { componentList = [] } = useComponentInfo();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo, form]);

  // 为 JS 编辑器生成快速插入的 values['fe_id'] 片段
  const jsSnippets = useMemo(
    () =>
      componentList.map(comp => ({
        label: `${comp.title}（${comp.fe_id.slice(0, 8)}…）`,
        insertText: `values['${comp.fe_id}']`,
      })),
    [componentList]
  );

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
          <CodeEditor language="css" />
        </Form.Item>
        <Form.Item label="脚本代码" name="js">
          <CodeEditor language="javascript" snippets={jsSnippets} />
        </Form.Item>
      </Form>
    </PageSettingWrapper>
  );
};

export default PageSetting;
