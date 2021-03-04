import React from "react";
import styled from "styled-components";

const SubthreadEachRow = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    margin-left: 80px;
    padding: 20px;
    border: 1px solid black;
`;

export default function SubthreadEach({ subthread }) {
    return (
        <SubthreadEachRow>
            <div>{`작성자 : ${subthread.user.email}`}</div>
            <div>{`작성일 : ${subthread.createdAt}`}</div>
            <div>{`내용 : ${subthread.content}`}</div>
        </SubthreadEachRow>
    );
}
