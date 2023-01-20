import React from "react";
import HeadMenu from "../Components/layout/HeadMenu";
import styled from "styled-components";

const AppBackgroundStyle = styled.div`
  /* 앱의 Background */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #eeeeee;
  overflow: hidden;
`;

const AppBodyStyle = styled.div`
  /* 앱의 Body */
  width: 375px;
  min-height: 667px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const AppLayout = ({ children }) => {
  return (
    <AppBackgroundStyle>
      <AppBodyStyle>
        <HeadMenu></HeadMenu>
        {children}
      </AppBodyStyle>
    </AppBackgroundStyle>
  );
};

export default AppLayout;
