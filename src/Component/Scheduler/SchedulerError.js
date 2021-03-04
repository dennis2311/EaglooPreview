import React from "react";
import styled from "styled-components";
import axios from "axios";
import { server } from "../../Util/server";

const SchedulerErrorRow = styled.div`
    border: 2px solid red;
`;

export default function SchedulerError({
    email,
    setSchedules,
    setLoadSuccess,
}) {
    async function getSchedule() {
        try {
            const { data } = await axios.get(
                `${server}/api/schedule/${email}/`
            );
            setSchedules(data.schedules);
            setLoadSuccess(true);
        } catch (error) {}
    }

    return (
        <SchedulerErrorRow>
            <div>일정을 받아오지 못했습니다</div>
            <button
                onClick={() => {
                    getSchedule();
                }}
            >
                다시 시도하기
            </button>
        </SchedulerErrorRow>
    );
}
