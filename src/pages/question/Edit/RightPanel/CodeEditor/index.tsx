import { saveCustomCss } from '@/store/pageInfoStore/pageInfoReducer';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, type FC } from 'react';
import { useDispatch } from 'react-redux';
import { CodeEditorWrapper } from './style';

interface Snippet {
  label: string;
  insertText: string;
}

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  language: 'css' | 'javascript';
  snippets?: Snippet[];
}

const CodeEditor: FC<CodeEditorProps> = ({ value, onChange, language, snippets = [] }) => {
  const dispatch = useDispatch();
  const editorRef = useRef<any>(null);

  // 仅 CSS 编辑器需要同步到 redux；JS 编辑器通过 Form 的 onValuesChange 已经同步，
  // 这里再 dispatch saveCustomCss 会把 css 覆盖成 JS 内容。
  useEffect(() => {
    if (language === 'css') {
      dispatch(saveCustomCss(value || ''));
    }
  }, [value, language, dispatch]);

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

  return (
    <CodeEditorWrapper>
      {language === 'javascript' && snippets.length > 0 && (
        <div className="toolbar">
          <span className="toolbarLabel">快速插入：</span>
          <select
            className="select"
            value=""
            onChange={e => {
              const item = snippets.find(s => s.label === e.target.value);
              if (item) insertSnippet(item.insertText);
              // 重置为提示项，方便连续选择同一个 snippet
              e.target.value = '';
            }}
          >
            <option value="" disabled>
              选择组件
            </option>
            {snippets.map(s => (
              <option key={s.label} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <Editor
        height="220px"
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
    </CodeEditorWrapper>
  );
};

export default CodeEditor;
