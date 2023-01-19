import styled from "styled-components";
import React from "react";

const FlexStyle = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "flex-start"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  background-color: ${(props) => props.bgColor || "transparent"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.radius || "0"};
  box-shadow: ${(props) => props.shadow || "none"};
  overflow: ${(props) => props.overflow || "visible"};
  position: ${(props) => props.position || "static"};
  top: ${(props) => props.top || "auto"};
  left: ${(props) => props.left || "auto"};
  right: ${(props) => props.right || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
  z-index: ${(props) => props.zIndex || "auto"};
  cursor: ${(props) => props.cursor || "auto"};
  transition: ${(props) => props.transition || "0.5s"};
  opacity: ${(props) => props.opacity || "1"};
  transform: ${(props) => props.transform || "none"};
  transform-origin: ${(props) => props.transformOrigin || "center"};
  transform-style: ${(props) => props.transformStyle || "flat"};
  backface-visibility: ${(props) => props.backfaceVisibility || "visible"};
  perspective: ${(props) => props.perspective || "none"};
  perspective-origin: ${(props) => props.perspectiveOrigin || "center"};
  user-select: ${(props) => props.userSelect || "auto"};
  pointer-events: ${(props) => props.pointerEvents || "auto"};
  white-space: ${(props) => props.whiteSpace || "normal"};
  text-align: ${(props) => props.textAlign || "left"};
  text-decoration: ${(props) => props.textDecoration || "none"};
  text-transform: ${(props) => props.textTransform || "none"};
  text-overflow: ${(props) => props.textOverflow || "clip"};
  text-shadow: ${(props) => props.textShadow || "none"};
  font-size: ${(props) => props.fontSize || "1rem"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  font-style: ${(props) => props.fontStyle || "normal"};
  font-family: ${(props) => props.fontFamily || "Noto Sans KR"};
  line-height: ${(props) => props.lineHeight || "1.5"};
  color: ${(props) => props.color || "black"};
`;

const Flex = (props) => {
  return <FlexStyle {...props}>{props.children}</FlexStyle>;
};

export default Flex;
