import styled from "styled-components";
import { loading } from "../../Style/keyframes/loading";

import React, { useEffect } from "react";

const LoadingStyle = styled.div`
  margin: 0 auto;
  background-color: white;
  animation: ${loading} 1s linear infinite;
  width: 1rem;
  height: 1rem;
  transition: 0.2s;

  &::after {
    content: "🚗";
    display: block;
    width: 1rem;
    height: 1rem;
  }

  &::after {
    animation: ${loading} 2s linear infinite;
  }
`;

const Loading = () => {
  return <LoadingStyle></LoadingStyle>;
};

export default Loading;
