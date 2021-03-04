import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../Service/Socket";
import ChattingBody from "./ChattingBody";
import ChattingFoot from "./ChattingFoot";

const ChattingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 160px;
    right: 0;
    width: 540px;
    height: max(400px, 78vh);
    background-color: #e6f1ff;
    padding: 15px;
    border-radius: 20px;
    transform: translate(
        ${(props) => {
            return props.chattingOpen ? "0" : "540px";
        }}
    );
    transition: all 0.5s ${(props) => props.theme.animationCubic};
`;

export default function Chatting({ chattingOpen }) {
    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState([]);

    socket.on("new message", (message) => {
        setMessages([...messages, message]);
    });

    useEffect(() => {
        return function turnoff() {
            socket.off("new message");
        };
    }, [socket]);

    return (
        <ChattingContainer chattingOpen={chattingOpen}>
            <ChattingBody messages={messages} />
            <ChattingFoot messages={messages} setMessages={setMessages} />
        </ChattingContainer>
    );
}
