import React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
}

function BoxTemplate({ children }: Props) {
  return (
    <$WhiteBoxWrapper>
      <$WhiteBox>{children}</$WhiteBox>
    </$WhiteBoxWrapper>
  );
}

const $WhiteBoxWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const $WhiteBox = styled.div`
  padding: 3rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  color: #333;
`;

export default BoxTemplate;
