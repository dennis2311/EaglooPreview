import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../Util/server";
import styled from "styled-components";
import { FullPageContainer } from "../Component/StyledComponent/div";
import { StylelessButton } from "../Component/StyledComponent/button";
import { toast } from "react-toastify";
import { toastErrorMessage } from "../Util/ToastMessages";
import CircularProgress from "@material-ui/core/CircularProgress";
import loginIcon from "../resource/img/login-icon.png";

var hash = require("object-hash");

const SignUpPage = styled(FullPageContainer)``;

const SignUpContainer = styled.div`
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
    padding-bottom: 50px;
`;

const GuideMessageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 17px;
    font-family: "JejuGothic";
    padding-bottom: 40px;
`;

const EmailBoxContainer = styled.div`
    position: relative;
    width: 100%;
`;

const SecretWordBoxContainer = styled(EmailBoxContainer)`
    display: ${(props) => !props.secretSended && "none"};
`;

const PasswordBoxContainer = styled(EmailBoxContainer)`
    display: ${(props) =>
        (!props.secretSended || !props.secretAuthenticated) && "none"};
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
    font-family: "JejuGothic";
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

const SecretWordBox = styled(EmailBox)``;

const PasswordBox = styled(EmailBox)`
    font: caption;
`;

const UtilButton = styled(StylelessButton)`
    width: 100%;
    height: 46px;
    color: #ffffff;
    font-size: 16px;
    font-family: "JejuGothic";
    border-radius: 8px;
    background-color: ${(props) => props.theme.buttonBlue};
    overflow: hidden;
`;

const LoadingButton = styled(UtilButton)`
    :hover {
        cursor: auto;
    }
`;

const BackButton = styled.div`
    color: ${(props) => props.theme.mainDarkBlue};
    font-size: 18px;
    font-family: "JejuGothic";
    margin-top: 38px;
`;

function GuideMessage({ secretSended, secretAuthenticated }) {
    if (!secretSended) {
        return (
            <GuideMessageContainer>
                연세메일 주소 입력 후 버튼을 눌러주세요
            </GuideMessageContainer>
        );
    } else {
        if (!secretAuthenticated) {
            return (
                <GuideMessageContainer>
                    메일로 도착한 인증 단어를 입력해주세요
                </GuideMessageContainer>
            );
        } else {
            return (
                <GuideMessageContainer>
                    8자 이상의 안전한 비밀번호를 설정해 주세요
                </GuideMessageContainer>
            );
        }
    }
}

function ShowProgressButton({ buttonContent, buttonActive, buttonFunction }) {
    return (
        <>
            {!buttonActive ? (
                <UtilButton
                    onClick={() => {
                        buttonFunction();
                    }}
                >
                    {buttonContent}
                </UtilButton>
            ) : (
                <LoadingButton>
                    <CircularProgress color="inherit" size={30} thickness={5} />
                </LoadingButton>
            )}
        </>
    );
}

export default function SignUp({ history }) {
    const [emailInput, setEmailInput] = useState("");
    const [secretInput, setSecretInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordConfirmInput, setPasswordConfirmInput] = useState("");

    const [secretSended, setSecretSended] = useState(false);
    const [secretAuthenticated, setSecretAuthenticated] = useState(false);

    const [secretSending, setSecretSending] = useState(false);
    const [secretAuthenticating, setSecretAuthenticating] = useState(false);
    const [signingUp, setSigningUp] = useState(false);

    const serverErrorMessage = "서버 통신 중 오류가 발생하였습니다";

    // 회원가입1단계
    async function sendSecret() {
        if (emailInput !== "") {
            setSecretSending(true);
            try {
                const { data } = await axios.post(`${server}/api/user`, {
                    email: emailInput,
                });
                if (data.success) {
                    setSecretSended(true);
                    setSecretAuthenticated(false);
                    toast.info(
                        <div>
                            <span role="img" aria-label="smile-face">
                                😃
                            </span>
                            &nbsp; {emailInput}@yonsei.ac.kr 로
                            <br />
                            &emsp; 인증 메일이 전송되었습니다
                        </div>
                    );
                } else {
                    toastErrorMessage(data.message);
                }
            } catch (err) {
                console.log(err);
                toastErrorMessage(serverErrorMessage);
            }
            setSecretSending(false);
        }
    }

    // 회원가입2단계
    async function confirmSecret() {
        if (secretInput !== "") {
            setSecretAuthenticating(true);
            try {
                const { data } = await axios.put(`${server}/api/user/secret`, {
                    email: emailInput,
                    givenSecret: secretInput,
                });
                if (data.success) {
                    setSecretAuthenticated(true);
                    toast.success(
                        <div>
                            <span role="img" aria-label="smile-face">
                                😆
                            </span>
                            &nbsp; 메일 인증이 완료되었습니다!
                            <br />
                            &emsp;비밀번호를 설정해주세요
                        </div>
                    );
                } else {
                    toastErrorMessage(data.message);
                }
            } catch (err) {
                console.log(err);
                toastErrorMessage(serverErrorMessage);
            }
            setSecretAuthenticating(false);
        }
    }

    // 회원가입3단계
    async function setPassword() {
        setSigningUp(true);
        if (passwordInput.length < 8) {
            toastErrorMessage("8자리 이상의 비밀번호를 설정해주세요");
        } else if (passwordInput !== passwordConfirmInput) {
            toastErrorMessage("비밀번호가 일치하지 않아요");
        } else {
            try {
                const { data } = await axios.put(
                    `${server}/api/user/password`,
                    {
                        email: emailInput,
                        givenPassword: hash(passwordInput),
                    }
                );
                if (data.success) {
                    toast.success(`😎 계정 생성이 완료되었습니다!`);
                    history.push("/");
                } else {
                    toastErrorMessage(data.message);
                    setSigningUp(false);
                }
            } catch (err) {
                console.log(err);
                toastErrorMessage(serverErrorMessage);
                setSigningUp(false);
            }
        }
    }

    return (
        <SignUpPage>
            <SignUpContainer>
                <EaglooIcon src={loginIcon} alt="login icon" />
                <EaglooLabel>EAGLOO</EaglooLabel>
                <GuideMessage
                    secretSended={secretSended}
                    secretAuthenticated={secretAuthenticated}
                />
                <EmailBoxContainer className="idboxcontainer">
                    <EmailBox
                        type="text"
                        value={emailInput}
                        disabled={secretSended}
                        placeholder="연세 메일 주소"
                        onChange={(e) => setEmailInput(e.target.value)}
                    />
                    {!secretSended && (
                        <ShowProgressButton
                            buttonContent="인증 메일 보내기"
                            buttonActive={secretSending}
                            buttonFunction={sendSecret}
                        />
                    )}
                    <YonseiMailPlaceholder>@yonsei.ac.kr</YonseiMailPlaceholder>
                </EmailBoxContainer>
                <SecretWordBoxContainer secretSended={secretSended}>
                    <SecretWordBox
                        type="text"
                        value={secretInput}
                        disabled={secretAuthenticated}
                        placeholder="인증 단어 입력"
                        onChange={(e) => setSecretInput(e.target.value)}
                    />
                    {secretSended && !secretAuthenticated && (
                        <ShowProgressButton
                            buttonContent="메일 인증"
                            buttonActive={secretAuthenticating}
                            buttonFunction={confirmSecret}
                        />
                    )}
                </SecretWordBoxContainer>
                <PasswordBoxContainer
                    secretSended={secretSended}
                    secretAuthenticated={secretAuthenticated}
                >
                    <PasswordBox
                        type="password"
                        value={passwordInput}
                        placeholder="비밀번호"
                        onChange={(e) => {
                            setPasswordInput(e.target.value);
                        }}
                    />
                    <PasswordBox
                        type="password"
                        value={passwordConfirmInput}
                        placeholder="비밀번호 확인"
                        onChange={(e) => {
                            setPasswordConfirmInput(e.target.value);
                        }}
                    />
                    <ShowProgressButton
                        buttonContent="회원가입"
                        signingUp={signingUp}
                        buttonFunction={setPassword}
                    />
                </PasswordBoxContainer>
                <BackButton>
                    <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/"
                    >
                        홈으로 돌아가기
                    </Link>
                </BackButton>
            </SignUpContainer>
        </SignUpPage>
    );
}
