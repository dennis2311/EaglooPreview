import React, { useEffect } from "react";
import styled from "styled-components";

const NoticeHeaderRow = styled.div`
    display: flex;
    height: 32px;
    justify-content: center;
    align-items: center;
    border: 2px solid darkmagenta;
`;

export default function NoticeHeader() {
    useEffect(() => {
        console.log("공지를 읽어오는 중입니다.");
    }, []);

    return <NoticeHeaderRow>{`📢 공지가 있으면 이곳에 표시`}</NoticeHeaderRow>;
}
