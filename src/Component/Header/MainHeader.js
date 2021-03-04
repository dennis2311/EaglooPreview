import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import headerIcon from "../../resource/img/header-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { servicePreparingMessage } from "../../Util/ToastMessages";

const MainHeaderContainer = styled.div`
    display: flex;
    width: 100%;
    min-width: 1200px;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 88px;
    background-color: ${(props) => props.theme.mainBlue};
    box-shadow: 0 5px 10px -3px black;
`;

const MainHeaderComponentsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    right: 40px;
    bottom: 27px;
    color: ${(props) => props.theme.headerGray};
`;

const MainHeaderComponent = styled.div`
    flex-direction: right;
    padding: 0 15px;
    font-size: 18px;
    font-family: "JejuGothic";
`;

const WhiteVerticalLine = styled.div`
    width: 1px;
    height: 24px;
    border-right: 2px solid ${(props) => props.theme.headerGray};
`;

export default function MainHeaer({ setIsLoggedIn }) {
    function handleLogout() {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }

    const email = window.localStorage.getItem("email");

    return (
        <MainHeaderContainer>
            <Link to="/">
                <img src={headerIcon} alt="eagloo icon" />
            </Link>
            <MainHeaderComponentsContainer>
                <MainHeaderComponent>{`${email} 님`}</MainHeaderComponent>
                <FontAwesomeIcon icon={faUser} />
                <MainHeaderComponent>
                    <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/"
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        로그아웃
                    </Link>
                </MainHeaderComponent>
                <WhiteVerticalLine />
                <MainHeaderComponent>
                    <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to="/"
                        onClick={() => {
                            servicePreparingMessage();
                        }}
                    >
                        MY
                    </Link>
                </MainHeaderComponent>
            </MainHeaderComponentsContainer>
        </MainHeaderContainer>
    );
}
