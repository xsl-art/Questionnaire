import styled from 'styled-components';

export const ListWrapper = styled.div`
  background-color: #e7dfdf;
  padding: 10px;
  .top {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .main {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    overflow: hidden;
  }

  .footer {
    display: flex;
    width: 100%;
    height: 20px;
    line-height: 50px;
    justify-content: center;
    align-items: center;
  }
`;
