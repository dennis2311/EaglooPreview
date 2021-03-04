import React from "react";
import ScheduleEach from "./ScheduleEach";
import styled from "styled-components";
import SchedulerError from "./SchedulerError";
import CircularProgress from "@material-ui/core/CircularProgress";

const SchedulerBodyContainer = styled.div`
    position: relative;
    display: flex;
    height: ${(props) => (props.schedulerOpen ? "540px" : "36px")};
    flex-direction: column;
    transition: all 0.5s ${(props) => props.theme.animationCubic};
    overflow: hidden;
`;

const SchedulerScrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 40px;
    overflow: auto;
`;

const Loading = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-bottom: 40px;
`;

const LoadingMessage = styled.h3`
    color: #ffffff;
    font-family: "JejuGothic";
    margin-top: 12px;
`;

const EmptyMessage = styled(Loading)`
    text-align: center;
    font-size: 16px;
    font-family: "JejuGothic";
    line-height: 2;
    margin-bottom: 12px;
`;

export default function SchedulerBody({
    loading,
    schedulerOpen,
    schedules,
    setSchedules,
    schedulerError,
}) {
    return (
        <SchedulerBodyContainer schedulerOpen={schedulerOpen}>
            <SchedulerScrollContainer>
                {schedules.map((scheduleEach) => (
                    <ScheduleEach
                        key={scheduleEach.id}
                        scheduleEach={scheduleEach}
                        schedules={schedules}
                        setSchedules={setSchedules}
                    />
                ))}
            </SchedulerScrollContainer>
            {loading && (
                <Loading>
                    <CircularProgress />
                    <LoadingMessage>
                        스케쥴 목록을 읽어오는 중입니다
                    </LoadingMessage>
                </Loading>
            )}
            {schedules.length === 0 && !schedulerError && (
                <EmptyMessage>
                    아직 일정이 등록되지 않았습니다.
                    <br />
                    새로운 일정을 추가해보세요!
                </EmptyMessage>
            )}
            {/* {schedulerError && <SchedulerError />} */}
        </SchedulerBodyContainer>
    );
}
