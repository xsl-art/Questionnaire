// d:\frontend develop\question\low-code\src\pages\Question\Edit\style.ts

import styled from 'styled-components';

export const EditWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .header {
    width: 100%;
    height: 50px;
    flex-shrink: 0;
    background-color: #e09999;
  }

  .content {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    background-color: #e6d4d4;
    box-sizing: border-box;
    padding: 10px 20px;
    overflow: hidden;

    .left {
      width: 20%;
      height: 100%;
      background-color: #fff;
      overflow-y: auto;
    }

    .center {
      flex: 1;
      display: flex;
      justify-content: center;
      height: 100%;
      overflow: hidden;

      .canvas-area {
        width: 60%;
        height: 100%;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        overflow: hidden;
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
      overflow-y: auto;
    }
  }
`;
