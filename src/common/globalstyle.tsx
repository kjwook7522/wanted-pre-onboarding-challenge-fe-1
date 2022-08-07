import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.5;
    background-color: #44c3f8;
    color: #fff;
  }

  a {
    box-sizing: border-box;
    text-decoration: inherit;
    color: inherit;

    :hover {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyle;
