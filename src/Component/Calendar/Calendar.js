import React from "react";
import styled from "styled-components";
import CalendarHead from "./CalendarHead";
import CalendarBody from "./CalendarBody";
import Scheduler from "../Scheduler/Scheduler";

const CalendarContainer = styled.div`
    position: relative;
    flex-direction: column;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export default function Calendar() {
    return (
        <CalendarContainer>
            <CalendarHead />
            <CalendarBody />
            <Scheduler />
        </CalendarContainer>
    );
}
