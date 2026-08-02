import styled from 'styled-components';

export const StarWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .empty {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  .loading {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
`;
