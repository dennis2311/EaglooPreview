import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const YonseiLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 37.5px 0;
`;

const YonseiLinkHeader = styled.div`
    display: flex;
    align-items: center;
    font-size: 22.5px;
    font-family: "JejuGothic";
`;

const YonseiLinkBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16.5px 0;
    margin: 20px 0;
    border-top: 1.5px solid #dae2ef;
    border-bottom: 1.5px solid #dae2ef;
`;

const YonseiLinkRow = styled.a`
    display: flex;
    align-items: center;
    width: max-content;
    margin: 10px 0;
    outline: 0;
    color: #4c4c4c;
    font-size: 18.5px;
    font-family: "JejuGothic";
    text-decoration: none;
`;

export default function YonseiLink() {
    return (
        <YonseiLinkContainer>
            <YonseiLinkHeader>
                연세 바로가기&nbsp;&nbsp;
                <FontAwesomeIcon icon={faAngleRight} />
            </YonseiLinkHeader>
            <YonseiLinkBody>
                <YonseiLinkRow
                    href="https://www.yonsei.kr"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    연세대학교 홈페이지&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretRight} color="#4c4c4c" />
                </YonseiLinkRow>
                <YonseiLinkRow
                    href="https://portal.yonsei.ac.kr"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    연세포탈서비스&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretRight} color="#4c4c4c" />
                </YonseiLinkRow>
                <YonseiLinkRow
                    href="https://library.yonsei.ac.kr/"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    연세대학교 학술정보원&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretRight} color="#4c4c4c" />
                </YonseiLinkRow>
                <YonseiLinkRow
                    href="https://open.yonsei.ac.kr/"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Y-EdNet&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretRight} color="#4c4c4c" />
                </YonseiLinkRow>
            </YonseiLinkBody>
        </YonseiLinkContainer>
    );
}
