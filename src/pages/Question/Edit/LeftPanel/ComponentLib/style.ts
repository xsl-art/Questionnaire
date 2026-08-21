import styled from 'styled-components';

export const ComponentLibWrapper = styled.div`
  .wrapper {
    margin-bottom: 12px;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #d3c3c3;
    padding: 12px;
    border-radius: 3px;

    &:hover {
      transition: all 0.3s linear;
      border-color: #4cb3df;
    }
  }

  .component {
    pointer-events: none;
  }
`;
