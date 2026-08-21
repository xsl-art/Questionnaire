import styled from 'styled-components';

export const EditCanvasWrapper = styled.div`
  min-height: 100%;
  overflow: hidden;
  background-color: #fff;

  .component-wrapper {
    margin: 12px;
    padding: 12px;
    border-radius: 3px;
    border: 1px solid #e5e5e5;

    &:hover {
      border-color: #000;
    }
  }

  .component {
    pointer-events: none;
  }

  .selected {
    border-color: #1890ff !important;
  }

  .locked {
    opacity: 0.5;
    cussor: not-allowed;
  }

  .preview-hidden {
    opacity: 0.45;
    background-color: #f5f5f5;
    border-style: dashed;
  }

  &.preview-mode .component {
    pointer-events: auto;
  }
`;
