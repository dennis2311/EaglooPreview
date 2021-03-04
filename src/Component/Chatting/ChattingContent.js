import React from "react";
import styled from "styled-components";

const MessageRow = styled.div`
    width: auto;
    max-width: 70%;
    height: auto;
    padding: 8px;
    border-radius: 10px;
    font-size: 17px;
    font-family: "JejuGothic";
`;

const MyMessage = styled(MessageRow)`
    flex-direction: right;
`;

const OthersMessage = styled(MessageRow)``;

export default function ChattingContent({ message }) {
    const email = window.localStorage.getItem("email");
    const noon = parseInt(message.hour) < 12 ? "오전" : "오후";
    const hour =
        parseInt(message.hour) < 10 ? `0${message.hour}` : `${message.hour}`;
    const minute =
        parseInt(message.hour) < 10
            ? `0${message.minute}`
            : `${message.minute}`;

    return (
        <MessageRow>{`${message.email} : ${message.content} (${noon} ${hour}:${minute})`}</MessageRow>
    );
}
