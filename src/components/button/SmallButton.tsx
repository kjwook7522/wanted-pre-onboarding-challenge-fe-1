import React from "react";
import styled, { css } from "styled-components";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "prime" | "sub" | "delete";
}

function SmallButton({ theme, children, ...props }: Props) {
  return (
    <$Button type="button" theme={theme} {...props}>
      {children}
    </$Button>
  );
}

const $Button = styled.button<Props>`
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 12px;
  background-color: #44c3f8;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  :hover,
  :active {
    background-color: #09aff6;
  }

  ${props =>
    props.theme === "prime" &&
    css`
      background-color: #44c3f8;
    `};

  ${props =>
    props.theme === "sub" &&
    css`
      background-color: #1F4690;

      :hover,
      :active {
        background-color: #163369;
      }
    `};

  ${props =>
    props.theme === "delete" &&
    css`
      background-color: #ff1e00;

      :hover,
      :active {
        background-color: #e61b00;
      }
    `};
`;

export default SmallButton;
