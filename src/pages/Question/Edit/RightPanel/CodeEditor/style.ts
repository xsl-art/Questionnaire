import styled from 'styled-components';
export const CodeEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
  }

  .toolbarLabel {
    flex-shrink: 0;
    font-size: 12px;
    color: #666;
  }

  .snippetSelect {
    flex: 1;
    min-width: 0;
  }

  .editorContainer {
    height: 380px;
  }

  .helpPanel {
    padding: 12px 16px;
    border-top: 1px solid #f0f0f0;
    background-color: #fafafa;

    .helpTitle {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    .helpContent {
      font-size: 16px;
      color: #666;

      code {
        background-color: #f0f0f0;
        padding: 1px 4px;
        border-radius: 3px;
        font-family: 'Monaco', 'Menlo', monospace;
        color: #d63384;
      }

      pre {
        background-color: #f0f0f0;
        padding: 8px;
        border-radius: 4px;
        overflow-x: auto;
        margin: 4px 0;

        code {
          background-color: transparent;
          padding: 0;
          color: #333;
        }
      }

      ul {
        margin: 4px 0;
        padding-left: 16px;
      }

      li {
        margin: 2px 0;
      }
    }
  }
`;
