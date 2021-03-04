import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../Util/server";
import styled from "styled-components";
import SchedulerHead from "./SchedulerHead";
import SchedulerBody from "./SchedulerBody";
import SchedulerFoot from "./SchedulerFoot";
import { toastErrorMessage } from "../../Util/ToastMessages";

const SchedulerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: ${(props) => props.theme.mainLightBlue};
`;

// TODO
// useEffect 클린업 설정할 것
// (스케쥴러 로딩이 되기 전에 라우터로 움직이는 경우 메모리 누수 발생)
export default function Scheduler() {
    const [schedulerOpen, setSchedulerOpen] = useState(true);
    const [schedulerError, setSchedulerError] = useState(false);
    const [loading, setLoading] = useState(true);
    const email = window.localStorage.getItem("email");
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        async function getSchedules(email) {
            try {
                const { data } = await axios.get(
                    `${server}/api/schedule/${email}/`
                );
                if (loading) {
                    setSchedules(data.schedules);
                }
            } catch (err) {
                setSchedulerError(true);
                toastErrorMessage("스케쥴러를 받아오지 못했습니다");
            } finally {
                setLoading(false);
            }
        }
        getSchedules(email);

        return () => {
            setLoading(false);
        };
    }, []);

    return (
        <SchedulerContainer>
            <SchedulerHead
                schedulerOpen={schedulerOpen}
                setSchedulerOpen={setSchedulerOpen}
            />
            <SchedulerBody
                loading={loading}
                schedulerOpen={schedulerOpen}
                schedules={schedules}
                setSchedules={setSchedules}
                schedulerError={schedulerError}
            />
            <SchedulerFoot
                email={email}
                schedules={schedules}
                setSchedules={setSchedules}
            />
        </SchedulerContainer>
    );
}
