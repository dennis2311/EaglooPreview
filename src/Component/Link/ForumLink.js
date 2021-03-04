import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { servicePreparingMessage } from "../../Util/ToastMessages";

const ForumLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 37.5px 0;
    :hover {
        cursor: pointer;
    }
`;

const ForumLinkHeader = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    font-size: 22.5px;
    font-family: "JejuGothic";
`;

const SeeMore = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    color: #757575;
    font-size: 14.5px;
`;

const ForumLinkBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16.5px 0;
    margin: 20px 0;
    border-top: 1.5px solid #dae2ef;
    border-bottom: 1.5px solid #dae2ef;
`;

const ForumLinkEachRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px 0;
`;

const ForumLinkEachRowCollege = styled.div`
    display: inline;
    min-width: 90px;
    font-size: 18.5px;
    font-family: "JejuGothic";
`;

const ForumLinkEachRowContent = styled.div`
    color: #898989;
    width: 100%-100px;
    height: 14.5px;
    font-size: 14.5px;
    font-family: "JejuGothic";
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export default function ForumLink() {
    return (
        <ForumLinkContainer
            onClick={() => {
                servicePreparingMessage();
            }}
        >
            <ForumLinkHeader>
                게시판&nbsp;&nbsp;
                <FontAwesomeIcon icon={faAngleRight} />
                <SeeMore>더보기&nbsp;&nbsp;</SeeMore>
            </ForumLinkHeader>
            <ForumLinkBody>
                <ForumLinkEachRow>
                    <ForumLinkEachRowCollege>문과대학</ForumLinkEachRowCollege>
                    <ForumLinkEachRowContent>
                        이번 교수님 강의 헬인듯... 진짜 어떡하냐 글루미들아 좀
                        살려줘 족보있어?
                    </ForumLinkEachRowContent>
                </ForumLinkEachRow>
                <ForumLinkEachRow>
                    <ForumLinkEachRowCollege>상경대학</ForumLinkEachRowCollege>
                    <ForumLinkEachRowContent>
                        셀트리온 주식 지금 사면 떡상한다 나 믿고 ㄱㄱ
                    </ForumLinkEachRowContent>
                </ForumLinkEachRow>
                <ForumLinkEachRow>
                    <ForumLinkEachRowCollege>국제대학</ForumLinkEachRowCollege>
                    <ForumLinkEachRowContent>
                        싸랑해요 욘애가중개
                    </ForumLinkEachRowContent>
                </ForumLinkEachRow>
                <ForumLinkEachRow>
                    <ForumLinkEachRowCollege>경영대학</ForumLinkEachRowCollege>
                    <ForumLinkEachRowContent>
                        회사 취직하면 경영 시켜줌?
                    </ForumLinkEachRowContent>
                </ForumLinkEachRow>
                <ForumLinkEachRow>
                    <ForumLinkEachRowCollege>치과대학</ForumLinkEachRowCollege>
                    <ForumLinkEachRowContent>
                        1년에 한번은 무료예요 스케일링 받으러 오세요 제 학점
                        살려줘요 ㅠㅠ
                    </ForumLinkEachRowContent>
                </ForumLinkEachRow>
            </ForumLinkBody>
        </ForumLinkContainer>
    );
}
