import React from "react";
import styled from "styled-components";
import ChattingContent from "./ChattingContent";

const ChattingBodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
    border: 2px solid #8dc6ff;
    border-radius: 20px;
`;

export default function ChattingBody({ messages }) {
    return (
        <ChattingBodyContainer>
            {messages.map((message, index) => (
                <ChattingContent
                    key={`${message.hour}:${message.minute}/${index}`}
                    message={message}
                />
            ))}
        </ChattingBodyContainer>
    );
}
