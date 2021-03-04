import React from "react";
import styled from "styled-components";
import CalendarSampleImg from "../../resource/img/calendar-sample.jpg";

const CalendarBodyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-color: #e6f1ff;
    font-size: 22px;
    font-family: "JejuGothic";
    padding-bottom: 150px;
`;

const CalendarSample = styled.img`
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 15px;
    width: 100%;
    height: auto;
    opacity: 0.4;
`;

export default function CalendarBody() {
    return (
        <CalendarBodyContainer>
            서비스 업데이트 예정입니다
            <CalendarSample
                src={CalendarSampleImg}
                alt="calendar sample image"
            />
        </CalendarBodyContainer>
    );
}
