import styled from '@emotion/styled';

export const RangeContainer = styled.div`
  display: flex;
  align-items: center;

  &.disabled {
    .thumb,
    .track {
      background-color: gray;
      cursor: not-allowed;
    }

    input {
      background-color: #b0b0b0;
      cursor: not-allowed;
    }
  }
`;

export const Scale = styled.div`
  position: relative;
  width: 300px;
  height: 2px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export const Track = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #c0c0c0;
  border-radius: 4px;
  z-index: 1;
`;

export const Thumb = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #000;
  border-radius: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  transition: background-color 0.2s;
  z-index: 3;

  &:hover {
    background-color: #555;
  }
`;

export const InitialThumb = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #888;
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input`
  width: 60px;
  padding: 5px;
  text-align: center;
  background-color: #3a3a3a;
  color: white;
  border: 1px solid #555;
  border-radius: 4px;
  transition:
    background-color 0.2s,
    border-color 0.2s;

  &:focus {
    background-color: #fff;
    color: black;
    border-color: #888;
  }

  &.disabled {
    background-color: gray;
    color: white;
  }
`;

export const ResetButton = styled.button`
  position: absolute;
  right: 0px;
  top: -50%;
  transform: translateY(-50%);
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: none;

  ${InputContainer}:hover & {
    display: block;
  }

  &:hover {
    background-color: #d32f2f;
  }
`;
