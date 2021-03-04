import React from "react";
import styled from "styled-components";
import { UserRouterPageContainer } from "../Component/StyledComponent/div";

const AboutContainer = styled(UserRouterPageContainer)``;

export default function About() {
    return (
        <AboutContainer>{`In association with YCC & 연희동 장사꾼`}</AboutContainer>
    );
}
