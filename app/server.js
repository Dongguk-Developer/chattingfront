import {io} from "socket.io-client"
const socket = io("",{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
    secure: true,
    withCredentials: true,
  });
  export default socket;