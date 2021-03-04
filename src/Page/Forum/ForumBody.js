import React, { useState } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import MainthreadEach from "./MainthreadEach";

const ForumBodyRow = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 600px;
    flex-direction: column;
`;

const ContentHead = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;
    background-color: #dddddd;
`;

const NewThreadContent = styled.textarea.attrs({
    placeholder: "내용을 입력하세요",
})`
    border-radius: 5px;
    padding: 20px;
    font-size: 20px;
    width: 600px;
    height: 400px;
    resize: none;
    :focus {
        outline: none;
    }
`;

const ForumLoading = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: gray;
`;

const LoadingMessage = styled.h1`
    margin-top: 15px;
    color: #ffffff;
`;

export default function ForumBody({ loading, totalThreads, currentThreads }) {
    const [addThread, setAddThread] = useState(false);
    const [newThreadSubject, setNewThreadSubject] = useState("");
    // const [newThreadContent, setNewThreadContent] = useState("");

    return (
        <ForumBodyRow>
            {addThread ? (
                <div>
                    <input
                        type="text"
                        placeholder="제목"
                        value={newThreadSubject}
                        onChange={(e) => {
                            setNewThreadSubject(e.target.value);
                        }}
                    />
                    <NewThreadContent />

                    <button
                        onClick={() => {
                            setAddThread(false);
                        }}
                    >
                        취소
                    </button>
                    <button>등록</button>
                </div>
            ) : (
                <>
                    <ContentHead>
                        <div>{`총 ${totalThreads}개의 게시물`}</div>
                        <div>
                            <button
                                onClick={() => {
                                    setAddThread(true);
                                }}
                            >
                                글쓰기
                            </button>
                        </div>
                    </ContentHead>
                    {currentThreads.map((mainthread) => (
                        <MainthreadEach
                            key={mainthread.id}
                            mainthread={mainthread}
                        />
                    ))}
                </>
            )}

            {/* 포럼 콘텐츠 로딩중 */}
            {loading && (
                <ForumLoading>
                    <CircularProgress />
                    <LoadingMessage>
                        {`게시판 목록을 불러오는 중입니다`}
                    </LoadingMessage>
                </ForumLoading>
            )}
        </ForumBodyRow>
    );
}
