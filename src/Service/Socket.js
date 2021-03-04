import io from "socket.io-client";
import { createContext } from "react";

export const socket = io.connect(process.env.REACT_APP_SERVER);
export const SocketContext = createContext();
