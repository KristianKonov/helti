import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  .search-database h3 {
    // color: ${({ theme }) => theme.darkbluetowhite};
    background: ${({ theme }) => theme.lighttextgrad1} !important;
    background: ${({ theme }) => theme.lighttextgrad2} !important;
    background: ${({ theme }) => theme.lighttextgrad3} !important;
    background: ${({ theme }) => theme.lighttextgrad4} !important;
    background: ${({ theme }) => theme.lighttextgrad5} !important;
    filter: ${({ theme }) => theme.textgradbg} !important;
    transition: all 1s ease;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }
  .search-database p {
    color: ${({ theme }) => theme.grey};
  }
  .logo-wrapper {
    box-shadow: ${({ theme }) => theme.logoshadow};
    transition: all 0.50s linear;
  }
  .headerBg {
    background: ${({ theme }) => theme.mozbg};
    background: ${({ theme }) => theme.webkitbg};
    background: ${({ theme }) => theme.olinearbg};
    background: ${({ theme }) => theme.mslinearbg};
    background: ${({ theme }) => theme.lineargrad};
    filter: ${({ theme }) => theme.filterbg};
    transition: all 1s ease;
  }
  .user-dashboard-wrapper .user-dashboard-body button,
  .landing-textbox a button {
    background: ${({ theme }) => theme.dashboardBtnBg1};
    background: ${({ theme }) => theme.dashboardBtnBg2};
    background: ${({ theme }) => theme.dashboardBtnBg3};
    background: ${({ theme }) => theme.dashboardBtnBg4};
    background: ${({ theme }) => theme.dashboardBtnBg5};
    filter: ${({ theme }) => theme.dashboardBtnBg6};
    transition: all 1s ease;
  }

  .user-dashboard-wrapper {
    background: ${({ theme }) => theme.dashboardBg};
  }

  .user-dashboard-wrapper .user-dashboard-nav {
    background: ${({ theme }) => theme.dashboardNavBg};
  }

  .user-dashboard-wrapper .user-dashboard-nav a span {
    color: ${({ theme }) => theme.dashboardNavLinks};
  }

  .user-dashboard-wrapper .user-dashboard-nav div {
    color: ${({ theme }) => theme.dashboardNavLinks};
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
  .landing-page-logged {
    background: ${({ theme }) => theme.mozbg};
    background: ${({ theme }) => theme.webkitbg};
    background: ${({ theme }) => theme.olinearbg};
    background: ${({ theme }) => theme.mslinearbg};
    background: ${({ theme }) => theme.lineargrad};
    filter: ${({ theme }) => theme.filterbg};
    transition: all 1s ease;
  }
  footer {
    // background-color: ${({ theme }) => theme.footerBg};
    background: ${({ theme }) => theme.mozbg};
    background: ${({ theme }) => theme.webkitbg};
    background: ${({ theme }) => theme.olinearbg};
    background: ${({ theme }) => theme.mslinearbg};
    background: ${({ theme }) => theme.lineargrad};
    filter: ${({ theme }) => theme.filterbg};
    transition: all 1s ease;
  }
  
  `