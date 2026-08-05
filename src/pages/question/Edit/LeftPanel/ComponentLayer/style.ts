import styled from 'styled-components';

export const ComponentLayerWrapper = styled.div`
  .wrapper {
    padding: 6px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    display: flex;

    .title {
      flex: auto;
      line-height: 2;
    }

    .selected {
      color: #1890ff;
    }

    .handler {
      width: 50px;
      margin-right: 8px;

      .btn {
        opacity: 0.2;

        &.ant-btn-primary {
          opacity: 1;
        }
      }
    }

    &:hover {
      .handler {
        .btn {
          opacity: 1;
        }
      }
    }
  }
`;
