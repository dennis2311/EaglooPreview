import React, { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { server } from "../../Util/server";
import { toastErrorMessage } from "../../Util/ToastMessages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const serverErrorMessage = "서버 통신 중 오류가 발생하였습니다";

const RemoveIcon = styled.div`
    opacity: 0;
    width: max-content;
    height: max-content;
    color: #79a4d8;
    cursor: pointer;
    :hover {
        color: #3e7bb7;
    }
    transition: opacity 0.2s linear;
`;

const ScheduleEachRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 10px 30px;
    &:hover {
        ${RemoveIcon} {
            opacity: 1;
        }
    }
`;

const LeftRow = styled.div`
    display: flex;
    align-items: center;
`;

const RightRow = styled.div`
    display: flex;
    align-items: center;
`;

const CheckBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin-right: 12px;
    border: 2.5px solid #ffffff;
    border-radius: 25%;
    color: #ffffff;
    cursor: pointer;
`;

const ScheduleContent = styled.div`
    font-family: "JejuGothic";
    ${(props) =>
        props.scheduleDone &&
        css`
            color: #79a4d8;
        `}
`;

const ImportanceCircleContainer = styled.div`
    display: flex;
    width: 63px;
`;

const ImportanceCircle = styled.div`
    width: 10px;
    height: 10px;
    margin: 0 3px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

function ScheduleImportance({ importance }) {
    if (importance === 1) {
        return (
            <ImportanceCircleContainer>
                <ImportanceCircle color="#71af78" />
                <ImportanceCircle color="#c0daff" />
                <ImportanceCircle color="#c0daff" />
            </ImportanceCircleContainer>
        );
    } else if (importance === 2) {
        return (
            <ImportanceCircleContainer>
                <ImportanceCircle color="#f9d953" />
                <ImportanceCircle color="#f9d953" />
                <ImportanceCircle color="#c0daff" />
            </ImportanceCircleContainer>
        );
    } else {
        return (
            <ImportanceCircleContainer>
                <ImportanceCircle color="#f27872" />
                <ImportanceCircle color="#f27872" />
                <ImportanceCircle color="#f27872" />
            </ImportanceCircleContainer>
        );
    }
}

export default function ScheduleEach({
    scheduleEach,
    schedules,
    setSchedules,
}) {
    const [scheduleDone, setScheduleDone] = useState(scheduleEach.done);

    function toggleScheduleDone() {
        setScheduleDone(!scheduleDone);
    }

    // TODO
    // 예쁘지 않음
    function changeSchedule() {
        try {
            if (scheduleDone) {
                axios.put(`${server}/api/schedule`, {
                    scheduleId: scheduleEach.id,
                    content: scheduleEach.content,
                });
            } else {
                axios.put(`${server}/api/schedule`, {
                    scheduleId: scheduleEach.id,
                    content: scheduleEach.content,
                    done: true,
                });
            }
        } catch (error) {
            toastErrorMessage(serverErrorMessage);
        }
    }

    function deleteSchedule() {
        setSchedules(
            schedules.filter(
                (originalSchedule) => originalSchedule.id !== scheduleEach.id
            )
        );

        try {
            axios.delete(`${server}/api/schedule/${scheduleEach.id}`);
        } catch (error) {
            toastErrorMessage(serverErrorMessage);
        }
    }

    return (
        <ScheduleEachRow>
            <LeftRow>
                <CheckBox
                    onClick={() => {
                        toggleScheduleDone();
                        changeSchedule();
                    }}
                >
                    {scheduleDone && <FontAwesomeIcon icon={faCheck} />}
                </CheckBox>
                <ScheduleContent scheduleDone={scheduleDone}>
                    {scheduleEach.content}
                </ScheduleContent>
            </LeftRow>
            <RightRow>
                <ScheduleImportance importance={scheduleEach.importance} />
                <RemoveIcon>
                    <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => {
                            deleteSchedule();
                        }}
                    />
                </RemoveIcon>
            </RightRow>
        </ScheduleEachRow>
    );
}
