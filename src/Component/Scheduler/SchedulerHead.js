import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SchedulerHeadRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    color: ${(props) => props.theme.mainDarkBlue};
    :hover {
        cursor: pointer;
    }
`;

const SchedulerHeadText = styled.div`
    display: flex;
    justify-content: right;
    width: 42.5px;
    margin-right: 5px;
    font-size: 14px;
    font-family: "JejuGothic";
    letter-spacing: 1.2px;
`;

const SchedulerToggleIcon = styled.div`
    transform: rotate(
        ${(props) => {
            return props.schedulerOpen ? "0" : "-180deg";
        }}
    );
    transition: all 0.2s linear;
`;

export default function SchedulerHead({ schedulerOpen, setSchedulerOpen }) {
    function toggleSchedulerOpen() {
        setSchedulerOpen(!schedulerOpen);
    }

    return (
        <SchedulerHeadRow
            onClick={() => {
                toggleSchedulerOpen();
            }}
        >
            <SchedulerHeadText>
                {schedulerOpen ? `접기` : `펼치기`}
            </SchedulerHeadText>
            <SchedulerToggleIcon schedulerOpen={schedulerOpen}>
                <FontAwesomeIcon icon={faCaretDown} size="1x" />
            </SchedulerToggleIcon>
        </SchedulerHeadRow>
    );
}
