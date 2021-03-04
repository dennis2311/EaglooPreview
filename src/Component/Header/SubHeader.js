import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { servicePreparingMessage } from "../../Util/ToastMessages";

const SubHeaderContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 90%;
    min-width: 1100px;
    height: 52px;
    padding: 0 350px;
    background-color: #0043a5;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    box-shadow: 0 5px 10px -3px black;
`;

const SubThreadButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    font-size: 17px;
    font-family: "JejuGothic";
    color: #ffffff;
`;

const SubThreadButton = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

export default function SubHeader({ setFeedbackOpen }) {
    return (
        <SubHeaderContainer>
            <SubThreadButtonContainer>
                <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to="/"
                >
                    HOME
                </Link>
            </SubThreadButtonContainer>

            <SubThreadButtonContainer>
                <SubThreadButton
                    onClick={() => {
                        setFeedbackOpen(true);
                    }}
                >
                    Feedback
                </SubThreadButton>
            </SubThreadButtonContainer>

            <SubThreadButtonContainer>
                <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to="/about"
                >
                    About Us
                </Link>
            </SubThreadButtonContainer>
            <SubThreadButtonContainer>
                <SubThreadButton
                    onClick={() => {
                        servicePreparingMessage();
                    }}
                >
                    FAQ
                </SubThreadButton>
            </SubThreadButtonContainer>
        </SubHeaderContainer>
    );
}
