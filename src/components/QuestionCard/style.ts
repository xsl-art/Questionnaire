import styled from 'styled-components';

export const QuestionCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  background-color: #e1d8d8;

  .card {
    height: 100px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;

    .card-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;

      .header-left {
        font-size: 20px;
        color: rgb(35, 159, 216);
      }

      .header-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        font-size: 12px;

        .status {
          width: 42px;
          height: 20px;
          line-height: 20px;
          border-radius: 5px;
          text-align: center;
        }
      }
    }

    .card-content {
      width: 100%;
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;

      .icon {
        margin-right: 5px;
      }

      .content-left {
        display: flex;
        align-items: center;
        font-size: 16px;

        .edit {
          margin-right: 20px;
        }
      }

      .content-right {
        display: flex;
        align-items: center;

        .option {
          color: #ccc;
          display: flex;
          align-items: center;
          margin-right: 10px;
          font-size: 15px;
        }
      }
    }
  }
`;
