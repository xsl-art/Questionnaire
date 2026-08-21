import { useEffect, useMemo, useState, type FC } from 'react';
import { PageSettingWrapper } from './style';
import { usePageInfo } from '@/hooks/usePageInfo';
import { useComponentInfo } from '@/hooks/useComponentInfo';
import { Button, Drawer, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { resetPageInfo } from '@/store/pageInfoStore/pageInfoReducer';
import CodeEditor from '../CodeEditor';
import { getComponentConfigByType } from '@/components/QuestionComponents/type';

const { TextArea } = Input;

type EditorType = 'css' | 'js' | null;

const PageSetting: FC = () => {
  const pageInfo = usePageInfo();
  const { componentList = [] } = useComponentInfo();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // drawer
  const [open, setOpen] = useState(false);
  const [editorType, setEditorType] = useState<EditorType>(null);
  const [size, setSize] = useState(600);

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo, form]);

  // 为 JS 编辑器生成快速插入的 values['fe_id'] 片段
  const jsSnippets = useMemo(() => {
    // 只保留用户输入类型的组件（排除纯展示组件）
    const inputTypes = [
      'questionInput',
      'questionTextarea',
      'questionRadio',
      'questionCheckbox',
      'questionImageUpload',
    ];
    let inputIndex = 0;

    return componentList
      .filter(comp => inputTypes.includes(comp.type))
      .map(comp => {
        inputIndex++;
        const config = getComponentConfigByType(comp.type);
        const typeName = config?.title || comp.type;
        const title = comp.title || '未命名';
        // 截断标题，最多显示 15 个字符
        const shortTitle = title.length > 15 ? title.slice(0, 15) + '...' : title;

        return {
          label: `[第${inputIndex}题] ${typeName}：${shortTitle}`,
          insertText: `values['${comp.fe_id}']`,
          feId: comp.fe_id,
          typeName,
          title,
        };
      });
  }, [componentList]);

  const handleValueChange = () => {
    dispatch(resetPageInfo(form.getFieldsValue()));
  };

  const openEditor = (type: EditorType) => {
    setEditorType(type);
    setOpen(true);
  };

  const closeEditor = () => {
    setOpen(false);
    setEditorType(null);
  };

  const handleEditorChange = (value: string) => {
    if (editorType) {
      form.setFieldValue(editorType, value);
      // 触发 Form 的 onValuesChange
      handleValueChange();
    }
  };

  const getEditorValue = (): string => {
    if (editorType === 'css') return form.getFieldValue('css') || '';
    if (editorType === 'js') return form.getFieldValue('js') || '';
    return '';
  };

  const getDrawerTitle = () => {
    if (editorType === 'css') return '自定义样式 (CSS)';
    if (editorType === 'js') return '自定义脚本 (JS)';
    return '';
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
          <Button type="primary" onClick={() => openEditor('css')}>
            配置 CSS
          </Button>
        </Form.Item>
        <Form.Item label="脚本代码" name="js">
          <Button type="primary" onClick={() => openEditor('js')}>
            配置 JS
          </Button>
        </Form.Item>
      </Form>

      <Drawer
        title={getDrawerTitle()}
        placement="right"
        onClose={closeEditor}
        open={open}
        width={size}
        bodyStyle={{ padding: 0 }}
        resizable={{
          onResize: newSize => setSize(newSize),
        }}
        extra={
          <Button type="primary" onClick={closeEditor}>
            完成
          </Button>
        }
      >
        {editorType && (
          <CodeEditor
            language={editorType === 'css' ? 'css' : 'javascript'}
            value={getEditorValue()}
            onChange={handleEditorChange}
            snippets={editorType === 'js' ? jsSnippets : []}
          />
        )}
      </Drawer>
    </PageSettingWrapper>
  );
};

export default PageSetting;
