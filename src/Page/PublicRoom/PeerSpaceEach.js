import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const PeerSpaceContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85%;
    height: 180px;
    min-height: 180px;
    margin-bottom: 20px;
    border-radius: 12px;
    border: 2px solid ${(props) => props.theme.mainDarkBlue};
`;

const PeerOffline = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100%;
    font-family: "SamlipHopang";
`;

const PeerLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const PeerLoadingMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: "SamlipHopang";
    margin-top: 20px;
`;

const PeerCam = styled.video`
    width: 60%;
    height: auto;
    border-radius: 12px;
`;

function PeerUnready({ peerOnline }) {
    return (
        <>
            {!peerOnline ? (
                <PeerOffline>다른 참여자를 기다리고 있습니다</PeerOffline>
            ) : (
                <PeerLoading>
                    <CircularProgress />
                    <PeerLoadingMessage>
                        다른 참여자의 영상을 받아오는 중입니다
                    </PeerLoadingMessage>
                </PeerLoading>
            )}
        </>
    );
}

function PeerReady({ peerStream }) {
    const camRef = useRef(null);
    useEffect(() => {
        if (!camRef.current) return;
        camRef.current.srcObject = peerStream ? peerStream : null;
    }, [peerStream]);

    return <PeerCam ref={camRef} autoPlay playsInline />;
}

export default function PeerSpaceEach({ peerOnline, peerLoading, peerStream }) {
    return (
        <PeerSpaceContainer>
            {!peerOnline || peerLoading ? (
                <PeerUnready peerOnline={peerOnline} />
            ) : (
                <PeerReady peerStream={peerStream} />
            )}
        </PeerSpaceContainer>
    );
}
