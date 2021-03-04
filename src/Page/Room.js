import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import collegename from "../Util/CollegeNameConverter";

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

function Room(props) {
    const roomId = props.match.params.colname;
    const socketRef = useRef();
    const selfCam = useRef();
    // peer 객체 저장
    const peersRef = useRef({ 0: null, 1: null, 2: null, 3: null, 4: null });
    // stream 객체 저장
    const streamsRef = useRef({ 0: null, 1: null, 2: null, 3: null, 4: null });
    // stream 전달용 ref
    const peer1Cam = useRef();
    const peer2Cam = useRef();
    const peer3Cam = useRef();
    const peer4Cam = useRef();
    const peer5Cam = useRef();
    // 참여자 연결여부
    const [peer1Online, setPeer1Online] = useState(false);
    const [peer2Online, setPeer2Online] = useState(false);
    const [peer3Online, setPeer3Online] = useState(false);
    const [peer4Online, setPeer4Online] = useState(false);
    const [peer5Online, setPeer5Online] = useState(false);
    // peerid -> index
    const indexToPeerRef = useRef({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
    });
    // index -> peerid
    const peerToIndexRef = useRef({});
    // 공석 확인
    const vacancyRef = useRef([true, true, true, true, true]);

    useEffect(() => {
        // 방에 입장하면 소켓을 열고 입장 가능한 상태인지 확인
        socketRef.current = io.connect(`https://eaglooserver.herokuapp.com`);
        socketRef.current.emit("join", 1);
        socketRef.current.on("reject", (message) => {
            socketRef.current.disconnect();
            alert(message);
            props.history.push("/");
        });
        // 입장 가능한 경우 같은 방의 다른 참여자들 소켓 ID를 얻어옴
        socketRef.current.on("accept", (others) => {
            // 카메라 사용 권한 접근
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then((stream) => {
                    selfCam.current.srcObject = stream;
                    // 참여자들마다 peer 연결 준비
                    others.forEach((peerId, index) => {
                        createPeer(socketRef.current.id, peerId, stream, index);
                    });

                    // 신규 참여자가 들어온 경우
                    socketRef.current.on("cam requested", (payload) => {
                        const index = findVacancy();
                        addPeer(
                            payload.signal,
                            payload.callerId,
                            stream,
                            payload.index,
                            index
                        );
                        refreshStream();
                    });

                    // 기존 참여자들의 stream을 받아온 경우
                    socketRef.current.on("cam request accepted", (payload) => {
                        handleRequestAccepted(payload.index, payload.signal);
                        setOnline(payload.index);
                    });

                    socketRef.current.on("peer quit", (peerId) => {
                        destroyPeer(peerId);
                        refreshStream();
                    });
                })

                // 권한 거부시 로비로
                .catch(() => {
                    socketRef.current.disconnect();
                    props.history.push("/");
                    alert(
                        "원활한 서비스 이용을 위해 카메라 이용 권한을 수락해 주세요"
                    );
                });
        });
    }, []);

    function findVacancy() {
        if (vacancyRef.current[0]) {
            return 0;
        } else if (vacancyRef.current[1]) {
            return 1;
        } else if (vacancyRef.current[2]) {
            return 2;
        } else if (vacancyRef.current[3]) {
            return 3;
        }
        return 4;
    }

    function setOnline(index) {
        switch (index) {
            case 0:
                setPeer1Online(true);
                break;
            case 1:
                setPeer2Online(true);
                break;
            case 2:
                setPeer3Online(true);
                break;
            case 3:
                setPeer4Online(true);
                break;
            case 4:
                setPeer5Online(true);
                break;
            default:
        }
    }

    function assignStream(index, stream) {
        switch (index) {
            case 0:
                if (peer1Cam.current) {
                    peer1Cam.current.srcObject = stream;
                }
                break;
            case 1:
                if (peer2Cam.current) {
                    peer2Cam.current.srcObject = stream;
                }
                break;
            case 2:
                if (peer3Cam.current) {
                    peer3Cam.current.srcObject = stream;
                }
                break;
            case 3:
                if (peer4Cam.current) {
                    peer4Cam.current.srcObject = stream;
                }
                break;
            case 4:
                if (peer5Cam.current) {
                    peer5Cam.current.srcObject = stream;
                }
                break;
            default:
        }
    }

    function refreshStream() {
        if (streamsRef.current[0]) {
            peer1Cam.current.srcObject = streamsRef.current[0];
        }
        if (streamsRef.current[1]) {
            peer2Cam.current.srcObject = streamsRef.current[1];
        }
        if (streamsRef.current[2]) {
            peer3Cam.current.srcObject = streamsRef.current[2];
        }
        if (streamsRef.current[3]) {
            peer4Cam.current.srcObject = streamsRef.current[3];
        }
        if (streamsRef.current[4]) {
            peer5Cam.current.srcObject = streamsRef.current[4];
        }
    }

    function destroyPeer(peerId) {
        const index = peerToIndexRef.current[peerId];
        peersRef.current[index].destroy();
        streamsRef.current[index] = null;
        indexToPeerRef.current[index] = null;
        delete peerToIndexRef.current[peerId];
        vacancyRef.current[index] = true;
        switch (index) {
            case 0:
                setPeer1Online(false);
                break;
            case 1:
                setPeer2Online(false);
                break;
            case 2:
                setPeer3Online(false);
                break;
            case 3:
                setPeer4Online(false);
                break;
            case 4:
                setPeer5Online(false);
                break;
            default:
        }
    }

    function handleRequestAccepted(index, signal) {
        peersRef.current[index].signal(signal);
        assignStream(index);
    }

    function createPeer(callerId, peerId, stream, index) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socketRef.current.emit("request peer cam", {
                signal,
                callerId,
                peerId,
                index,
            });
        });

        peer.on("stream", (stream) => {
            streamsRef.current[index] = stream;
            assignStream(index, stream);
        });

        peersRef.current[index] = peer;
        indexToPeerRef.current[index] = peerId;
        peerToIndexRef.current[peerId] = index;
        vacancyRef.current[index] = false;
    }

    function addPeer(callerSignal, callerId, stream, index, peerIndex) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socketRef.current.emit("accept peer cam request", {
                signal,
                callerId,
                index,
            });
        });

        peer.on("stream", (stream) => {
            streamsRef.current[peerIndex] = stream;
            assignStream(peerIndex, stream);
        });

        peer.signal(callerSignal);

        setOnline(peerIndex);
        peersRef.current[peerIndex] = peer;
        indexToPeerRef.current[peerIndex] = callerId;
        peerToIndexRef.current[callerId] = peerIndex;
        vacancyRef.current[peerIndex] = false;
    }

    function handleQuit() {
        if (selfCam.current.srcObject) {
            const tracks = selfCam.current.srcObject.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
            selfCam.current.srcObject = null;
        }
        socketRef.current.disconnect();
    }

    return (
        <Container>
            {collegename(roomId)}에 오신 것을 환영합니다
            <Row>
                {!peer1Online ? (
                    "peer1 is offline"
                ) : (
                    <StyledVideo
                        key={indexToPeerRef.current[0]}
                        ref={peer1Cam}
                        autoPlay
                        playsInline
                    />
                )}
                {!peer2Online ? (
                    "peer2 is offline"
                ) : (
                    <StyledVideo
                        key={indexToPeerRef.current[1]}
                        ref={peer2Cam}
                        autoPlay
                        playsInline
                    />
                )}
                {!peer3Online ? (
                    "peer3 is offline"
                ) : (
                    <StyledVideo
                        key={indexToPeerRef.current[2]}
                        ref={peer3Cam}
                        autoPlay
                        playsInline
                    />
                )}
                {!peer4Online ? (
                    "peer4 is offline"
                ) : (
                    <StyledVideo
                        key={indexToPeerRef.current[3]}
                        ref={peer4Cam}
                        autoPlay
                        playsInline
                    />
                )}
                {!peer5Online ? (
                    "peer5 is offline"
                ) : (
                    <StyledVideo
                        key={indexToPeerRef.current[4]}
                        ref={peer5Cam}
                        autoPlay
                        playsInline
                    />
                )}
            </Row>
            <Row>
                <StyledVideo ref={selfCam} autoPlay playsInline />
                <Link to="/">
                    <button
                        onClick={() => {
                            handleQuit();
                        }}
                    >
                        Back to Home
                    </button>
                </Link>
            </Row>
        </Container>
    );
}

export default Room;
