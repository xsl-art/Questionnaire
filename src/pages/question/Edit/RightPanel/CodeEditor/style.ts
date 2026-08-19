import styled from 'styled-components';
export const CodeEditorWrapper = styled.div`
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .toolbarLabel {
    flex-shrink: 0;
    font-size: 12px;
    color: #666;
  }

  .select {
    flex: 1;
    min-width: 0;
    padding: 4px 8px;
    font-size: 13px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;

    &:hover,
    &:focus {
      border-color: #40a9ff;
    }
  }
`;
