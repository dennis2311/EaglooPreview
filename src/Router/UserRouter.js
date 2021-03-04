import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { SocketContext, socket } from "../Service/Socket";
import Header from "../Component/Header/Header";
import Lobby from "../Page/Lobby/Lobby";
import About from "../Page/About";
import Forum from "../Page/Forum/Forum";
import PublicRoom from "../Page/PublicRoom/PublicRoom";
import WrongPath from "../Page/WrongPath";
import FeedbackDialog from "../Component/Dialog/FeedbackDialog";
import Chatting from "../Component/Chatting/Chatting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

const buttonShow = keyframes`
    from{
        transform: translateX(65px);
    }
    to{
        transform: translateX(0);
    }
`;

const UserRouterContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-top: 88px;
    overflow-x: hidden;
`;

const ChattingOpenButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 160px;
    right: 0;
    width: 65px;
    height: 65px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    color: #ffffff;
    background-color: ${(props) => props.theme.mainBlue};
    animation: ${buttonShow} 0.8s ${(props) => props.theme.animationCubic};
    :hover {
        cursor: pointer;
    }
`;

export default function UserRouter({ setIsLoggedIn }) {
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [chattingOpen, setChattingOpen] = useState(false);

    function toggleChatting() {
        setChattingOpen(!chattingOpen);
    }

    return (
        <UserRouterContainer>
            <SocketContext.Provider value={socket}>
                <Header
                    setIsLoggedIn={setIsLoggedIn}
                    setFeedbackOpen={setFeedbackOpen}
                />
                <Switch>
                    <Route exact path="/" render={() => <Lobby />} />
                    <Route path="/about" render={() => <About />} />
                    <Route path="/forum" render={() => <Forum />} />
                    <Route
                        path="/public/:roomNo"
                        render={(props) => <PublicRoom {...props} />}
                    />
                    <Route render={() => <WrongPath />} />
                </Switch>

                <FeedbackDialog
                    feedbackOpen={feedbackOpen}
                    setFeedbackOpen={setFeedbackOpen}
                />
                <Chatting chattingOpen={chattingOpen} />
                <ChattingOpenButton
                    onClick={() => {
                        toggleChatting();
                    }}
                >
                    <FontAwesomeIcon icon={faCommentDots} size="2x" />
                </ChattingOpenButton>
            </SocketContext.Provider>
        </UserRouterContainer>
    );
}
