import socket from "../../socket/socket";

export const sendMessage = (roomID,token,message) => {
    // Emit the new message to the server
    const new_message = {
      text: message,
      sentTime: `${new Date().toLocaleTimeString()}`,
      sender: token,
    };
    socket.emit("new_message", roomID, new_message);
  };