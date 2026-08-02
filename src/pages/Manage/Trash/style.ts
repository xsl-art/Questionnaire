import styled from 'styled-components';

export const TrashWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #e6d9d9;
  padding: 10px;
  .top {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .main {
    width: 100%;
    height: calc(100vh - 150px);
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;

    .loading {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }

    .btns {
      margin-bottom: 20px;
    }
  }

  .footer {
    display: flex;
    width: 100%;
    height: 50px;
    line-height: 50px;
    justify-content: center;
    align-items: center;
  }
`;
