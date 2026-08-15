import styled from 'styled-components';

export const MainLayoutWrapper = styled.div`
  .header {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 60px;
    background-color: #8be47d;
    padding: 0 24px;
    box-sizing: border-box;
  }

  .content {
    width: 100%;
    min-height: calc(100vh - 60px);
    background-color: #b0ec97;
  }
`;
