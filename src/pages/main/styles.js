import styled from 'styled-components';

export const Avatar = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  border: 5px solid #7159c1;
`;

export const ListContainer = styled.div`
  background: #fff;
  width: 320px;
  min-height: 300px;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin: 20px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const Item = styled.div`
  display: flex;
  align-content: center;
  border-bottom: 1px solid #eee;
  padding: 10px;
  img {
    border-radius: 50%;
    width: 48px;
    height: 48px;
  }
  .infos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    flex-grow: 1;
  }
  .name {
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
  .username {
    font-size: 14px;
    color: #999;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      cursor: pointer;
      border: none;
      height: 32px;
      width: 32px;
      &:hover {
        opacity: 0.7;
      }
      &:focus {
        outline: none;
      }
    }
  }
  .text-danger {
    color: #d45454;
  }
  .text-muted {
    color: #999;
  }
  .fas {
    font-size: 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  input {
    font-size: 22px;
    border: 1px solid #dfe4ea;
    padding: 5px 10px;
    border-radius: 3px;
  }
  button {
    margin-top: 10px;
    color: #fff;
    background: #84c47c;
    font-size: 22px;
    font-weight: bold;
    border-radius: 3px;
    border: 0;
    height: 40px;
  }
`;
