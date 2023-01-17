import React from "react";
import styled from "styled-components";
import theme from "../../Style/theme";
import Flex from "./Flex";

const RadioWrapperStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const RadioStyle = styled.input`
  display: none;

  &:checked + label {
    background-color: ${theme.palette.TEAL};
    color: white;
  }
`;

const LabelStyle = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 1rem;
  &::after {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${theme.palette.TEAL};
    transform: scale(0);
    transition: 0.3s;
  }
  &:hover::after {
    transform: scale(1);
  }

  & input:checked + & {
    background-color: ${theme.palette.TEAL};
    color: white;
  }
`;

// number 수만큼 라디오 생성
// name 배열을 입력받아서 라디오 생성
// 라디오 중 하나만 선택되도록
// 선택된 결과 돌려주기

const Radio = ({ name, onChangeState, value }) => {
  const onChange = (e) => {
    onChangeState(e.target.value);
  };

  return (
    <RadioWrapperStyle>
      {name.map((item, index) => {
        return (
          <>
            <RadioStyle
              key={item + index}
              type="radio"
              id={item}
              name={item}
              value={item}
              onChange={onChange}
              checked={value === item}
            />
            <LabelStyle htmlFor={item} key={index}>
              {item}
            </LabelStyle>
          </>
        );
      })}
    </RadioWrapperStyle>
  );
};

export default Radio;
