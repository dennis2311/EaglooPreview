import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { server } from "../../Util/server";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SubthreadEach from "./SubthreadEach";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { toastErrorMessage } from "../../Util/ToastMessages";

const ArcodionContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 10px;
    padding: 20px;
    border: 2px solid brown;
`;

const ArcodionHead = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const ArcodionSubject = styled.div``;

const ArcodionInfo = styled.div``;

const ArcodionContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function MainthreadEach({ mainthread }) {
    const [expanded, setExpanded] = useState(false);
    const [makeReply, setMakeReply] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    async function submitSubthread() {
        try {
            await axios.post(`${server}/api/thread/sub`, {
                email: window.localStorage.getItem("email"),
                mainthreadId: mainthread.id,
                content: replyContent,
            });
            setMakeReply(false);
            setReplyContent("");
        } catch (err) {
            toastErrorMessage("서버 통신 중 오류가 발생했습니다");
        }
    }

    return (
        <ArcodionContainer>
            <Accordion
                expanded={expanded === "content"}
                onChange={handleChange("content")}
            >
                <AccordionSummary>
                    <ArcodionHead>
                        <ArcodionSubject>{mainthread.subject}</ArcodionSubject>
                        <ArcodionInfo>
                            <div>{`작성자 : ${mainthread.user.email}`}</div>
                            <div>{`작성일 : ${mainthread.createdAt}`}</div>
                        </ArcodionInfo>
                    </ArcodionHead>
                </AccordionSummary>
                <AccordionDetails>
                    <ArcodionContent>
                        {mainthread.content}
                        {mainthread.subthreads.map((subthread) => (
                            <SubthreadEach
                                key={subthread.id}
                                subthread={subthread}
                            />
                        ))}

                        {/* TODO // 이 부분도 styled component로 깔끔하게 줄일 것 */}
                        {makeReply ? (
                            <div>
                                <TextareaAutosize
                                    rowsMin={5}
                                    rowsMax={12}
                                    placeholder="새로운 의견을 남겨주세요"
                                    value={replyContent}
                                    onChange={(e) => {
                                        setReplyContent(e.target.value);
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        setMakeReply(false);
                                    }}
                                >
                                    취소
                                </button>
                                <button
                                    onClick={() => {
                                        submitSubthread();
                                    }}
                                >
                                    등록
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    setMakeReply(true);
                                }}
                            >
                                답글 남기기
                            </button>
                        )}
                    </ArcodionContent>
                </AccordionDetails>
            </Accordion>
        </ArcodionContainer>
    );
}
