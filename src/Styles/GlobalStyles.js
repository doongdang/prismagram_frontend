import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset}
    * {
        box-sizing:border-box
    }
    body{
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.blackcolor};
    }
    a{
        color:${(props) => props.theme.darkBlueColor};
        text-decoration: none;
    }
`;
