import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Components/common/Button";

const MainPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnLinkStyle = styled(Link)`
  // 링크 스타일 제거
  text-decoration: none;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    color: #395ad9;
  }
`;

const MainPage = () => {
  return (
    <MainPageStyle>
      <h1>메인 페이지</h1>
      <p>페이지 소개...1</p>
      <p>페이지 소개...2</p>
      <p>페이지 소개...3</p>
      <br />
      <br />
      <br />
      <BtnLinkStyle to="/login">
        <Button>로그인 하여 서비스 이용하기</Button>
      </BtnLinkStyle>
    </MainPageStyle>
  );
};

export default MainPage;
