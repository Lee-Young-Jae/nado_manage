import React from "react";
import styled, { css } from "styled-components";

const sizes = {
  large: {
    height: "3rem",
    fontSize: "1.25rem",
  },
  medium: {
    height: "2.25rem",
    fontSize: "1rem",
  },
  small: {
    height: "1.75rem",
    fontSize: "0.875rem",
  },
};

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const fullWidthStype = css`
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      justify-content: center;
    `}
`;

const StyledInput = styled.input`
  /* 공통 스타일 */
  width: 200px;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.palette.GRAY};
  padding: 0 10px;
  font-size: 1rem;
  margin: 10px 0;
  text-align: center;

  &:focus {
    outline: none;
  }

  /* 크기 */
  ${sizeStyles}

  /* fullWidth */
  ${fullWidthStype}
`;

const TextInput = ({ size, fullWidth, type, ...rest }) => {
  return (
    <StyledInput
      size={size}
      fullWidth={fullWidth}
      type={type}
      {...rest}
    ></StyledInput>
  );
};

TextInput.defaultProps = {
  size: "medium",
  fullWidth: false,
};

export default TextInput;
