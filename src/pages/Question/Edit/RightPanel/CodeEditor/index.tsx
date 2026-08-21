import Editor from '@monaco-editor/react';
import { useRef, type FC } from 'react';
import { Select } from 'antd';
import { CodeEditorWrapper } from './style';

interface Snippet {
  label: string;
  insertText: string;
  feId?: string;
  typeName?: string;
  title?: string;
}

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  language: 'css' | 'javascript';
  snippets?: Snippet[];
}

const CssHelpContent = () => (
  <div className="helpContent">
    <p>自定义 CSS 会应用到整个问卷页面。支持所有标准 CSS 语法。</p>
    <ul>
      <li>
        使用 <code>.component-wrapper</code> 选择组件容器
      </li>
      <li>
        使用 <code>[data-component-id=&quot;xxx&quot;]</code> 选择特定组件
      </li>
      <li>
        使用 <code>@media</code> 编写响应式样式
      </li>
    </ul>
    <pre>
      <code>{`.component-wrapper {
  border: 1px solid #eee;
  border-radius: 8px;
}`}</code>
    </pre>
  </div>
);

const JsHelpContent = () => (
  <div className="helpContent">
    <p>
      自定义 JS 会在页面加载时执行。可以使用快速插入自动获取<code>values[&#39;fe_id&#39;]</code>。
    </p>
    <ul>
      <li>
        <code>values[&#39;fe_id&#39;]</code> - 获取指定组件的值
      </li>
      <li>
        <code>values[&#39;fe_id&#39;] = &#39;xxx&#39;</code> - 设置组件值
      </li>
      <li>
        <code>validate((values) =&gt; {'{...}'})</code> - 自定义校验函数
      </li>
    </ul>
    <pre>
      <code>{`// 示例1：根据选项值联动显示内容
if (values['abc123'] === 'option1') {
  values['def456'] = '显示的内容';
}

// 示例2：自定义校验函数
validate((values) => {
  // 年龄范围校验
  const age = Number(values['年龄输入框fe_id']);
  if (age && (age < 18 || age > 70)) {
    return { fe_id: '年龄输入框fe_id', message: '年龄必须在 18-70 岁之间' };
  }
  return null;
});`}</code>
    </pre>
  </div>
);

const CodeEditor: FC<CodeEditorProps> = ({ value, onChange, language, snippets = [] }) => {
  const editorRef = useRef<any>(null);

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  const insertSnippet = (text: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = editor.getSelection();
    editor.executeEdits('snippet', [{ range: selection, text, forceMoveMarkers: true }]);
    editor.focus();
    onChange?.(editor.getValue());
  };

  const selectOptions = snippets.map(s => ({
    label: s.label,
    value: s.label,
  }));

  return (
    <CodeEditorWrapper>
      {language === 'javascript' && snippets.length > 0 && (
        <div className="toolbar">
          <span className="toolbarLabel">快速插入：</span>
          <Select
            className="snippetSelect"
            placeholder={`选择组件 (${snippets.length})`}
            options={selectOptions}
            showSearch
            allowClear
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onSelect={label => {
              const item = snippets.find(s => s.label === label);
              if (item) insertSnippet(item.insertText);
            }}
          />
        </div>
      )}
      <div className="editorContainer">
        <Editor
          height="380px"
          value={value || ''}
          onChange={val => onChange?.(val || '')}
          language={language}
          theme="vs-dark"
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            fontSize: 13,
            tabSize: 2,
            automaticLayout: true,
          }}
        />
      </div>
      <div className="helpPanel">
        <div className="helpTitle">使用说明</div>
        {language === 'css' ? <CssHelpContent /> : <JsHelpContent />}
      </div>
    </CodeEditorWrapper>
  );
};

export default CodeEditor;
