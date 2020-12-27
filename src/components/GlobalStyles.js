import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};
  }
  button{
    color: ${({ theme }) => theme.text};
  }

  .library{
    background-color: ${({ theme }) => theme.body};
  }
  `;
