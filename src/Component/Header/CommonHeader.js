// DEPRECATED : 로그아웃시 헤더 보이지 않음

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CommonHeaderContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export default function CommonHeader() {
    return (
        <CommonHeaderContainer>
            <div>
                <Link to={`/about`}>About</Link>
            </div>
            <div>
                <Link to={`/`}>로그인</Link>
            </div>
        </CommonHeaderContainer>
    );
}
