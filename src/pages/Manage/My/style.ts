import styled from 'styled-components';

export const MyWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .loading {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
`;
