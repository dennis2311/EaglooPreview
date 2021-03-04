import React from "react";
import styled from "styled-components";

const ForumFootRow = styled.div`
    display: flex;
    float: left;
    padding: 15px;
`;

export default function ForumFoot() {
    return (
        <ForumFootRow>
            <div>페이지 선택 및 검색</div>
        </ForumFootRow>
    );
}
