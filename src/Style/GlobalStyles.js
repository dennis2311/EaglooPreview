import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./fonts/fonts.css";

const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        box-sizing:border-box;
    }
    font-family:"JejuGothic";
    body{
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    }
`;

export default GlobalStyles;
