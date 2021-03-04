import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { StylelessButton } from "../../Component/StyledComponent/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretLeft,
    faCaretRight,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";

const UserSpaceContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
`;

const LocationNoticer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;
    font-family: "SamlipHopang";
    border-radius: 12px;
    padding: 0 40px;
    margin-bottom: 15px;
    background-color: ${(props) => props.theme.headerGray};
`;

const LocationHeader = styled.div`
    font-size: 20px;
`;

const LocationContent = styled.div`
    display: flex;
    justify-content: ${(props) =>
        props.roomEntered ? "center" : "space-between"};
    align-items: center;
    min-width: 200px;
    font-size: 32px;
`;

const UserCamContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    min-height: 360px;
    padding: 15px;
    margin-bottom: 20px;
    border: 2px solid ${(props) => props.theme.headerGray};
    border-radius: 15px;
`;

const CamRequestContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${(props) => props.theme.buttonBlue};
`;

const CamRequestMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: "JejuGothic";
    margin-top: 40px;
`;

const UserCam = styled.video`
    width: 100%;
    height: auto;
    border-radius: 15px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: ${(props) =>
        !props.camAccepted ? "center" : "space-between"};
    align-items: center;
    width: 100%;
    padding: 0 20px;
    margin-bottom: 40px;
`;

const UserSpaceButton = styled(StylelessButton)`
    height: 50px;
    color: #ffffff;
    font-size: 16px;
    font-family: "JejuGothic";
    border-radius: 8px;
`;

const GetUserCamBtn = styled(UserSpaceButton)`
    width: 80%;
    background-color: ${(props) => props.theme.mainDarkBlue};
`;

const EnterRoomBtn = styled(UserSpaceButton)`
    width: 45%;
    background-color: ${(props) =>
        !props.roomEntered ? props.theme.mainBlue : "#c4c4c4"};
    :hover {
        cursor: ${(props) => props.roomEntered && "auto"};
    }
`;

const QuitRoomBtn = styled(UserSpaceButton)`
    width: 45%;
    background-color: ${(props) => (props.roomEntered ? "#f27872" : "#c4c4c4")};
    :hover {
        cursor: ${(props) => !props.roomEntered && "auto"};
    }
`;

const GuideMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    min-height: 120px;
    font-family: "SamlipHopang";
    line-height: 1.6;
    border-radius: 10px;
`;

const RoomSwitcher = styled.div`
    color: ${(props) => props.theme.mainDarkBlue};
`;

const SwitchToLeft = styled(RoomSwitcher)`
    display: ${(props) => props.roomEntered && "none"};
    color: ${(props) => props.roomNo <= 1 && "gray"};
    pointer-events: ${(props) => props.roomNo <= 1 && "none"};
`;

const SwitchToRight = styled(RoomSwitcher)`
    display: ${(props) => props.roomEntered && "none"};
    color: ${(props) => props.roomNo >= 6 && "gray"};
    pointer-events: ${(props) => props.roomNo >= 6 && "none"};
`;

function LocationSwitcher({ roomNo, roomEntered }) {
    return (
        <LocationContent roomEntered={roomEntered}>
            {roomEntered ? (
                `${roomNo}번 독서실`
            ) : (
                <>
                    <SwitchToLeft roomNo={roomNo} roomEntered={roomEntered}>
                        <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to={`/public/${roomNo - 1}`}
                        >
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </Link>
                    </SwitchToLeft>
                    {`${roomNo}번 대기실`}
                    <SwitchToRight roomNo={roomNo} roomEntered={roomEntered}>
                        <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to={`/public/${roomNo + 1}`}
                        >
                            <FontAwesomeIcon icon={faCaretRight} />
                        </Link>
                    </SwitchToRight>
                </>
            )}
        </LocationContent>
    );
}

function Guide({ roomNo, camAccepted, roomEntered }) {
    return (
        <>
            {!camAccepted && (
                <GuideMessage>
                    '내 화면 받아오기' 버튼을 눌러 카메라 권한을 허용해 주세요
                </GuideMessage>
            )}
            {camAccepted && !roomEntered && (
                <GuideMessage>
                    준비가 완료되었습니다!
                    <br />
                    '방 입장하기' 버튼을 눌러 독서실에 들어갈 수 있습니다.
                </GuideMessage>
            )}
            {roomEntered && (
                <GuideMessage>
                    {`${roomNo}번 독서실에 입장하였습니다`}
                    <br />
                    새로고침 버튼 사용을 자제해주세요 (새로고침 시 퇴실
                    처리됩니다)
                </GuideMessage>
            )}
        </>
    );
}

export default function UserSpace({
    roomNo,
    roomEntered,
    getUserCam,
    userCamRef,
    camAccepted,
    enterRoom,
    quitRoom,
}) {
    return (
        <UserSpaceContainer>
            <LocationNoticer>
                <LocationHeader>현재 위치 :</LocationHeader>
                <LocationSwitcher roomNo={roomNo} roomEntered={roomEntered} />
            </LocationNoticer>
            <UserCamContainer camAccepted={camAccepted}>
                {!camAccepted ? (
                    <CamRequestContainer>
                        <FontAwesomeIcon icon={faVideo} size="3x" />
                        <CamRequestMessage>
                            입장하기 위해 먼저 카메라 이용 권한을 허용해 주세요
                        </CamRequestMessage>
                    </CamRequestContainer>
                ) : (
                    <UserCam ref={userCamRef} autoPlay playsInline />
                )}
            </UserCamContainer>
            <ButtonsContainer camAccepted={camAccepted}>
                {!camAccepted ? (
                    <GetUserCamBtn
                        onClick={() => {
                            getUserCam();
                        }}
                    >
                        내 화면 받아오기
                    </GetUserCamBtn>
                ) : (
                    <>
                        <EnterRoomBtn
                            onClick={() => {
                                enterRoom();
                            }}
                            roomEntered={roomEntered}
                            disabled={roomEntered}
                        >
                            방 입장하기
                        </EnterRoomBtn>
                        <QuitRoomBtn
                            onClick={() => {
                                quitRoom();
                            }}
                            roomEntered={roomEntered}
                            disabled={!roomEntered}
                        >
                            방 나가기
                        </QuitRoomBtn>
                    </>
                )}
            </ButtonsContainer>
            <Guide
                roomNo={roomNo}
                camAccepted={camAccepted}
                roomEntered={roomEntered}
            />
        </UserSpaceContainer>
    );
}
