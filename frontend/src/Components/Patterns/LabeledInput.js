import React from "react";
import styled, { css, keyframes } from "styled-components";
import TextInput from "../common/TextInput";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const animationStyle = css`
  ${({ animation }) => {
    return (
      animation &&
      css`
        animation: ${slideUp} 1s forwards ease-out;
      `
    );
  }}
`;

const WraaperStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  border-bottom: ${({ theme }) => theme.border.DEFAULT};
  width: 280px;
  margin: 10px auto;
`;

const LabeledInputStyle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  /** 애니메이션 */
  ${animationStyle}

  // fullwidth 설정
  ${({ fullWidth }) => {
    return (
      fullWidth &&
      css`
        width: 100%;
        display: inline-block;
      `
    );
  }}
`;

const LabelStyle = styled.label`
  ${({ noneLabel }) => {
    return (
      noneLabel &&
      css`
        display: none;
      `
    );
  }}
  cursor: pointer;
`;

const InputStyle = styled(TextInput)`
  &:invalid {
    color: #ff000080;
  }

  &:focus {
    outline: none;
  }
  padding: 0;
  margin: 0;
  border: none;
`;

const ChildrenStyle = styled.div`
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #999;
`;

const LabeledInput = ({
  labelText = "Label",
  inputName,
  inputType = "text",
  children,
  autoComplete,
  slideup,
  animation,
  noneLabel,
  fullWidth,
  ...rest
}) => {
  return (
    <WraaperStyle>
      <LabelStyle noneLabel={noneLabel} htmlFor={inputName}>
        {labelText}
      </LabelStyle>
      <LabeledInputStyle animation={animation} fullWidth={fullWidth}>
        <InputStyle
          id={inputName}
          type={inputType}
          autoComplete={autoComplete}
          autocomplete={autoComplete}
          fullWidth
          {...rest}
        ></InputStyle>
        <ChildrenStyle>{children}</ChildrenStyle>
      </LabeledInputStyle>
    </WraaperStyle>
  );
};

export default LabeledInput;
