import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const CalendarHeadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;
`;

const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 40px;
    font-family: "JejuGothic";
`;

const YearMonth = styled.div`
    color: ${(props) => props.theme.mainLightBlue};
    font-size: 16.5px;
    padding-bottom: 8px;
`;

const Day = styled.div`
    font-size: 25px;
`;

const Arrow = styled.div`
    color: ${(props) => props.theme.mainBlue};
`;

export default function CalendarHead() {
    const dayName = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
    ];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = dayName[today.getDay()];

    return (
        <CalendarHeadContainer>
            <Arrow>
                <FontAwesomeIcon icon={faCaretLeft} size="3x" />
            </Arrow>
            <DateContainer>
                <YearMonth>{`${year}년 ${month}월`}</YearMonth>
                <Day>{`${date}일 ${day}`}</Day>
            </DateContainer>
            <Arrow>
                <FontAwesomeIcon icon={faCaretRight} size="3x" />
            </Arrow>
        </CalendarHeadContainer>
    );
}
