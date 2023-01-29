import { keyframes } from "styled-components";

//Loading Animation
export const loading = keyframes`
  0% {
    transform: translateX(0)
  }
  25% {
    transform: translateX(1rem)
  }
  70% {
    transform: translateX(-1rem)
  }

  100% {
    transform: translateX(0)
  }
`;
