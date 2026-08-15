import styled from 'styled-components';

export const EditHeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;

    .return-btn {
      margin-right: 10px;
    }
  }

  .center {
    width: 600px;
    margin-left: 40px;
  }
`;
