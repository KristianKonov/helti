import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  .search-database h3 {
    color: ${({ theme }) => theme.darkbluetowhite};
  }
  .logo-wrapper {
    box-shadow: ${({ theme }) => theme.logoshadow};
    transition: all 0.50s linear;
  }
  .logo-wrapper .logo {
    content: ${({ theme }) => theme.changeLogo};
    transition: all 0.50s linear;
  }
  .landing-title {
    // background: ${({ theme }) => theme.textbg1} !important;
    // background: ${({ theme }) => theme.textbg2} !important;
    // background: ${({ theme }) => theme.textbg3} !important;
    // background: ${({ theme }) => theme.textbg4} !important;
    // background: ${({ theme }) => theme.textbg5} !important;
    // filter: ${({ theme }) => theme.textgradbg} !important;
    // transition: all 1s ease;
    // -webkit-background-clip: text !important;
    // -webkit-text-fill-color: transparent !important;
  }
  .landing-page {
    background: ${({ theme }) => theme.mozbg};
    background: ${({ theme }) => theme.webkitbg};
    background: ${({ theme }) => theme.olinearbg};
    background: ${({ theme }) => theme.mslinearbg};
    background: ${({ theme }) => theme.lineargrad};
    filter: ${({ theme }) => theme.filterbg};
    transition: all 1s ease;
  }
  footer {
    background-color: ${({ theme }) => theme.footerBg};
    transition: all 1s ease;
  }
  footer a {
    color: ${({ theme }) => theme.footerColor};
    transition: all 1s ease;
  }
  footer img {
    filter: ${({ theme }) => theme.footerLogo};
    transition: all 1s ease;
  }
  `