import styled from 'styled-components';

export const EditWrapper = styled.div`
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    height: 50px;
    background-color: #e09999;
  }

  .content {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    min-height: calc(100vh - 50px);
    background-color: #e6d4d4;
    box-sizing: border-box;
    padding: 10px 20px;

    .left {
      width: 20%;
      height: 100%;
      background-color: #fff;
    }

    .center {
      flex: 1;
      display: flex;
      justify-content: center;

      .canvas-area {
        width: 60%;
        height: 90%;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
      }

      .canvas-wrapper {
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }

      .canvas {
        width: 100%;
        min-height: 100%;
      }
    }

    .right {
      width: 20%;
      height: 100%;
      background-color: #fff;
    }
  }
`;
