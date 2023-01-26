import React from "react";
import styled from "styled-components";
import backword from "../../Icons/backword.png";

const HeadMenuStyle = styled.h1`
  color: #395ad9;
  text-align: center;
  vertical-align: middle;
  font-size: 24px;
  font-family: Noto Sans KR;
  line-height: auto;
  border-style: hidden;
  outline: none;
  position: relative;
  font-weight: lighter;
`;

const Backword = styled.img.attrs({ src: `${backword}` })`
  width: 16px;
  height: 16px;
  border-style: hidden;
  outline: none;
  object-fit: contain;
  position: absolute;
  left: 24px;
  top: 12px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    cursor: pointer;
  }
`;

const HeadMenu = ({ children }) => {
  const onClickBackwordBtn = () => {
    window.history.back();
  };

  return (
    <>
      <HeadMenuStyle>
        <Backword onClick={onClickBackwordBtn} />
        Firstap
      </HeadMenuStyle>
    </>
  );
};

export default HeadMenu;
