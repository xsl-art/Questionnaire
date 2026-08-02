import styled from 'styled-components';

export const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .desc {
      padding-bottom: 20px;
      color: #fff;
      font-size: 16px;
    }

    .use {
      width: 100px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 20px;
      border: 1px solid #000;
      background-color: #000;
    }
  }
`;
