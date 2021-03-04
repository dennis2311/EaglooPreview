// DEPRECATED : 로그아웃시 헤더 보이지 않음

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const UserHeaderContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export default function UserHeader({ setIsLoggedIn, setFeedbackOpen }) {
    function makeFeedback() {
        setFeedbackOpen(true);
    }

    function handleLogout() {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }

    return (
        <UserHeaderContainer>
            <div>
                <Link to={`/about`}>About</Link>
            </div>
            <div>
                <button
                    onClick={() => {
                        makeFeedback();
                    }}
                >
                    건의하기
                </button>
            </div>
            <div>
                <Link to={`/forum`}>포럼</Link>
            </div>
            <div>
                <Link to={`/`}>
                    <button
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        로그아웃
                    </button>
                </Link>
            </div>
        </UserHeaderContainer>
    );
}
