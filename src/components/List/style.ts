import styled from 'styled-components';

export const ListWrapper = styled.div`
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
    position: relative;
    width: 100%;
    height: calc(100vh - 100px);
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    overflow: hidden;
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
