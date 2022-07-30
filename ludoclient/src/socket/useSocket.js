import { useContext } from "react";
import SocketContext from "./socket.context";

const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

export default useSocket;