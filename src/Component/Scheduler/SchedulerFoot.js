import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { server } from "../../Util/server";
import { toastErrorMessage } from "../../Util/ToastMessages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@material-ui/core/CircularProgress";

const SchedulerFootRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    padding: 15px 25px;
    font-family: "JejuGothic";
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: ${(props) => props.theme.mainDarkBlue};
`;

const LeftFoot = styled.div`
    min-width: 100%-230px;
    display: flex;
    align-items: center;
`;

const RightFoot = styled.div`
    min-width: 180px;
    display: flex;
    align-items: center;
`;

const NewScheduleDiv = styled.div`
    justify-content: center;
    min-width: 45px;
    color: #ffffff;
    font-size: 14px;
    margin-right: 5px;
`;

const ScheduleCreateInput = styled.input`
    color: #ffffff;
    background-color: inherit;
    font-size: 16px;
    padding: 3px 10px;
    margin-right: 12px;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.mainLightBlue};
    font-family: "JejuGothic";
    :focus {
        outline: none;
    }
`;

const UploadingCircleContainer = styled.div`
    color: #ffffff;
`;

const ImportanceDiv = styled(NewScheduleDiv)`
    min-width: 39px;
`;

const ImportanceCircleContainer = styled.div`
    display: flex;
    width: 48px;
`;

const ImportanceCircle = styled.div`
    width: 10px;
    height: 10px;
    margin: 0 3px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const SchedulerFootButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 26px;
    background-color: #ffffff;
    margin-left: 5px;
    :hover {
        cursor: pointer;
    }
`;

function Importance({ newScheduleImportance }) {
    if (newScheduleImportance === 1) {
        return (
            <ImportanceCircleContainer>
                <ImportanceCircle color="#71af78" />
                <ImportanceCircle color="#c0daff" />
                <ImportanceCircle color="#c0daff" />
            </ImportanceCircleContainer>
        );
    } else if (newScheduleImportance === 2) {
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

export default function SchedulerFoot({ email, schedules, setSchedules }) {
    const [uploading, setUploading] = useState(false);
    const [newScheduleInput, setNewScheduleInput] = useState("");
    const [newScheduleImportance, setNewScheduleImportance] = useState(1);

    function minusImportance() {
        if (newScheduleImportance >= 2) {
            setNewScheduleImportance(newScheduleImportance - 1);
        }
    }

    function addImportance() {
        if (newScheduleImportance <= 2) {
            setNewScheduleImportance(newScheduleImportance + 1);
        }
    }

    async function createSchedule() {
        setUploading(true);
        const { data } = await axios.post(`${server}/api/schedule`, {
            email,
            content: newScheduleInput,
            importance: newScheduleImportance,
        });
        if (data.success) {
            setSchedules([...schedules, data.schedule]);
            setNewScheduleInput("");
            setNewScheduleImportance(1);
        } else {
            toastErrorMessage(data.message);
        }
        setUploading(false);
    }

    return (
        <SchedulerFootRow>
            <LeftFoot>
                <NewScheduleDiv>새 일정</NewScheduleDiv>
                <ScheduleCreateInput
                    type="text"
                    value={newScheduleInput}
                    onChange={(e) => {
                        setNewScheduleInput(e.target.value);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && newScheduleInput !== "") {
                            createSchedule();
                        }
                    }}
                />
                {uploading && (
                    <UploadingCircleContainer>
                        <CircularProgress
                            color="inherit"
                            size={20}
                            thickness={5.4}
                        />
                    </UploadingCircleContainer>
                )}
            </LeftFoot>
            <RightFoot>
                <ImportanceDiv>중요도</ImportanceDiv>
                <Importance newScheduleImportance={newScheduleImportance} />
                <SchedulerFootButtonDiv>
                    <FontAwesomeIcon
                        icon={faMinusSquare}
                        size="2x"
                        color="#5fa0ff"
                        onClick={() => {
                            minusImportance();
                        }}
                    />
                </SchedulerFootButtonDiv>
                <SchedulerFootButtonDiv>
                    <FontAwesomeIcon
                        icon={faPlusSquare}
                        size="2x"
                        color="#5fa0ff"
                        onClick={() => {
                            addImportance();
                        }}
                    />
                </SchedulerFootButtonDiv>
            </RightFoot>
        </SchedulerFootRow>
    );
}
