import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import mainBannerLeftImage from "../../resource/img/main-banner-left.png";
import mainBannerRightImage from "../../resource/img/main-banner-right.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const MainBannerContainer = styled.div`
    position: relative;
    display: flex;
    min-height: 200px;
    justify-content: center;
    align-items: center;
`;

const MainBannerColor = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-color: ${(props) => props.theme.mainBlue};
`;

const MainBannerLeftImage = styled.img`
    position: absolute;
    top: 10px;
    left: 20px;
`;

const MainBannerRightImage = styled.img`
    position: absolute;
    top: 10px;
    right: 20px;
`;

const AboutUs = styled.div`
    position: absolute;
    right: 15px;
    bottom: 10px;
    color: #ffffff;
    font-size: 20px;
    font-family: "SamlipHopang";
    z-index: 100;
`;

const MainBannerCopyContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    opacity: 1;
    z-index: 100;
`;

const MainBannerCopyHead = styled.div`
    font-size: 24px;
    font-family: "SamlipHopang";
`;

const MainBannerCopySubHead = styled(MainBannerCopyHead)`
    padding-top: 12px;
    padding-bottom: 24px;
    font-size: 15px;
`;

const MainBannerCopyEagloo = styled(MainBannerCopyHead)`
    padding-bottom: 10px;
    font-size: 35px;
    letter-spacing: 1.5px;
`;

export default function MainBanner() {
    return (
        <MainBannerContainer>
            <MainBannerLeftImage
                src={mainBannerLeftImage}
                alt="main banner left"
            />
            <MainBannerRightImage
                src={mainBannerRightImage}
                alt="main banner right"
            />
            <MainBannerCopyContainer>
                <MainBannerCopyHead>
                    집에서도 함께 공부하는 것처럼!
                </MainBannerCopyHead>
                <MainBannerCopySubHead>
                    연세대학교 온라인 스터디공간
                </MainBannerCopySubHead>
                <MainBannerCopyEagloo>EAGLOO</MainBannerCopyEagloo>
            </MainBannerCopyContainer>
            <AboutUs>
                <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to="/about"
                >
                    About us&nbsp;
                    <FontAwesomeIcon icon={faAngleRight} />
                    <FontAwesomeIcon icon={faAngleRight} />
                </Link>
            </AboutUs>
            <MainBannerColor />
        </MainBannerContainer>
    );
}
