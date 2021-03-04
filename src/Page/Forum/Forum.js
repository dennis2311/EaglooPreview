import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../Util/server";
import styled from "styled-components";
import { UserRouterPageContainer } from "../../Component/StyledComponent/div";
import ForumHead from "./ForumHead";
import ForumBody from "./ForumBody";
import ForumFoot from "./ForumFoot";
import { toastErrorMessage } from "../../Util/ToastMessages";

const ForumContainer = styled(UserRouterPageContainer)``;

// TODO
// useEffect 클린업 설정할 것
export default function Forum() {
    const [loading, setLoading] = useState(true);
    const [college, setCollege] = useState("all");
    const [totalThreads, setTotalThreads] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentThreads, setCurrentThreads] = useState([]);

    // 전체 스레드 수 반환
    useEffect(() => {
        async function getTotalThreads() {
            try {
                const { data } = await axios.get(
                    `${server}/api/thread/${college}/total`
                );
                if (data.success) {
                    setTotalThreads(data.totalThreads);
                } else {
                    toastErrorMessage(data.message);
                }
            } catch (error) {
                setTotalThreads(-1);
            }
        }
        getTotalThreads();
    }, [college]);

    // 표시할 스레드 반환
    useEffect(() => {
        async function getCurrentThreads() {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `${server}/api/thread/${college}/page/${currentPage}`
                );
                if (data.success) {
                    console.dir(data.threads);
                    setCurrentThreads(data.threads);
                } else {
                    toastErrorMessage(data.message);
                }
            } catch (err) {
                toastErrorMessage("서버 통신 중 오류가 발생했습니다");
            }
            setLoading(false);
        }
        getCurrentThreads();
    }, [college, currentPage]);

    return (
        <ForumContainer>
            <ForumHead college={college} setCollege={setCollege} />
            <ForumBody
                loading={loading}
                totalThreads={totalThreads}
                currentThreads={currentThreads}
            />
            <ForumFoot
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </ForumContainer>
    );
}
