// Import to create global valid styles
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'PlusJakarta-Bold';
    src: url('/fonts/webfonts/PlusJakartaSans-Bold.woff2') format('woff2'),
         url('/fonts/webfonts/PlusJakartaSans-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'PlusJakarta-Regular';
    src: url('/fonts/webfonts/PlusJakartaSans-Regular.woff2') format('woff2'),
         url('/fonts/webfonts/PlusJakartaSans-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
   @font-face {
    font-family: 'PlusJakarta-Light';
    src: url('/fonts/webfonts/PlusJakartaSans-Light.woff2') format('woff2'),
         url('/fonts/webfonts/PlusJakartaSans-Light.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    max-width: 100vw;
}
`;

export default GlobalStyle;
