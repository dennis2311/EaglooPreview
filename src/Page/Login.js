import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../Util/server";
import styled from "styled-components";
import { FullPageContainer } from "../Component/StyledComponent/div";
import { StylelessButton } from "../Component/StyledComponent/button";
import {
    toastLoginSuccessMessage,
    toastErrorMessage,
} from "../Util/ToastMessages";
import CircularProgress from "@material-ui/core/CircularProgress";
import loginIcon from "../resource/img/login-icon.png";

var hash = require("object-hash");

const LoginPage = styled(FullPageContainer)``;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 337.5px;
`;

const EaglooIcon = styled.img`
    padding-bottom: 30px;
`;

const EaglooLabel = styled.h1`
    color: #ffffff;
    font-size: 66px;
    font-family: "SamlipHopang";
    letter-spacing: 3px;
    padding-bottom: 8px;
`;

const EaglooSubLabel = styled.h2`
    color: #ffffff;
    font-size: 21px;
    font-family: "JejuGothic";
    padding-bottom: 40px;
`;

const EmailBoxContainer = styled.div`
    position: relative;
    width: 100%;
`;

const YonseiMailPlaceholder = styled.h4`
    position: absolute;
    top: 15px;
    right: 12px;
    color: ${(props) => props.theme.mailPlaceholder};
    font-size: 18px;
    font-family: "JejuGothic";
`;

const EmailBox = styled.input`
    width: 100%;
    height: 46px;
    font-size: 18px;
    /* font-family: "JejuGothic"; */
    padding: 0 12px;
    margin-bottom: 15px;
    border: none;
    border-radius: 8px;
    :focus {
        outline: none;
    }
    ::placeholder {
        color: ${(props) => props.theme.placeholder};
    }
`;

const PasswordBox = styled(EmailBox)``;

const ToSignInButton = styled(StylelessButton)`
    width: 100%;
    height: 46px;
    color: #ffffff;
    font-size: 22px;
    font-family: "JejuGothic";
    border-radius: 8px;
    background-color: ${(props) => props.theme.buttonBlue};
    margin-bottom: 38px;
`;

const SigningInButton = styled(ToSignInButton)`
    :hover {
        cursor: auto;
    }
`;

const UtilButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 92%;
    margin-bottom: 30px;
`;

const UtilButton = styled.div`
    color: ${(props) => props.theme.mainDarkBlue};
    font-size: 16px;
    font-family: "JejuGothic";
`;

function SignInButton({ signingIn, handleLogin }) {
    return (
        <>
            {!signingIn ? (
                <ToSignInButton
                    onClick={() => {
                        handleLogin();
                    }}
                >
                    sign in
                </ToSignInButton>
            ) : (
                <SigningInButton>
                    <CircularProgress color="inherit" size={30} thickness={5} />
                </SigningInButton>
            )}
        </>
    );
}

export default function Login({ setIsLoggedIn }) {
    const [signingIn, setSigningIn] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    async function handleLogin() {
        setSigningIn(true);
        const { data } = await axios.get(
            `${server}/api/user/${emailInput}/${hash(passwordInput)}`
        );
        if (data.success) {
            window.localStorage.setItem("email", emailInput);
            window.localStorage.setItem("isLoggedIn", true);
            setIsLoggedIn(true);
            toastLoginSuccessMessage(emailInput);
        } else {
            setSigningIn(false);
            toastErrorMessage(data.message);
        }
    }

    return (
        <LoginPage>
            <LoginContainer>
                <EaglooIcon src={loginIcon} alt="login icon" />
                <EaglooLabel>EAGLOO</EaglooLabel>
                <EaglooSubLabel>연세대학교 온라인 스터디공간</EaglooSubLabel>
                <EmailBoxContainer className="idboxcontainer">
                    <EmailBox
                        type="text"
                        value={emailInput}
                        placeholder="id"
                        onChange={(e) => setEmailInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleLogin();
                            }
                        }}
                    />
                    <YonseiMailPlaceholder>@yonsei.ac.kr</YonseiMailPlaceholder>
                </EmailBoxContainer>
                <PasswordBox
                    type="password"
                    value={passwordInput}
                    placeholder="password"
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleLogin();
                        }
                    }}
                />
                <SignInButton signingIn={signingIn} handleLogin={handleLogin} />

                <UtilButtonsContainer>
                    <UtilButton>
                        <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to="/signup"
                        >
                            회원가입
                        </Link>
                    </UtilButton>
                    <UtilButton>
                        {/* <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to="/"
                        >
                            아이디 찾기
                        </Link> */}
                        아이디 찾기
                    </UtilButton>
                    <UtilButton>
                        {/* <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to="/"
                        >
                            비밀번호 찾기
                        </Link> */}
                        비밀번호 찾기
                    </UtilButton>
                </UtilButtonsContainer>
            </LoginContainer>
        </LoginPage>
    );
}
