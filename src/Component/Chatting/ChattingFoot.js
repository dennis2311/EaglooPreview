import React, { useState, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "../../Service/Socket";

const ChattingFootContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;
`;

const ChattingInput = styled.input`
    width: 85%;
    height: 24px;
    padding: 0 10px;
    font-size: 17px;
    font-family: "JejuGothic";
    border: none;
    :focus {
        outline: none;
    }
`;

export default function ChattingFoot({ messages, setMessages }) {
    const socket = useContext(SocketContext);
    const email = window.localStorage.getItem("email");
    const [chattingInput, setChattingInput] = useState("");

    function sendMessage() {
        const time = new Date();
        const hour = time.getHours();
        const minute = time.getMinutes();
        const newMessage = {
            email,
            content: chattingInput,
            hour,
            minute,
        };
        socket.emit("message send", newMessage);
        setChattingInput("");
        setMessages([...messages, newMessage]);
    }

    return (
        <ChattingFootContainer>
            <ChattingInput
                value={chattingInput}
                onChange={(e) => {
                    setChattingInput(e.target.value);
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter" && chattingInput !== "") {
                        sendMessage();
                    }
                }}
            />
        </ChattingFootContainer>
    );
}
