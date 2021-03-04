import styled from "styled-components";

export const FullPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: ${(props) => props.theme.loginPageGradient};
`;

export const UserRouterPageContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 1200px;
    height: 100%;
    min-height: 720px;
    padding: 0 max(50px, 4%);
    padding-top: 105px;
`;
