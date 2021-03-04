import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../Style/Theme";
import { BrowserRouter } from "react-router-dom";
import UserRouter from "./UserRouter";
import CommonRouter from "./CommonRouter";
import GlobalStyles from "../Style/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.backgroundWhite};
`;

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (window.localStorage.getItem("isLoggedIn")) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <BrowserRouter>
            <ThemeProvider theme={Theme}>
                <AppContainer>
                    {isLoggedIn ? (
                        <UserRouter setIsLoggedIn={setIsLoggedIn} />
                    ) : (
                        <CommonRouter setIsLoggedIn={setIsLoggedIn} />
                    )}
                </AppContainer>
                <GlobalStyles />
                <ToastContainer
                    position="bottom-left"
                    closeOnClick
                    newestOnTop={true}
                    pauseOnFocusLoss={false}
                />
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
