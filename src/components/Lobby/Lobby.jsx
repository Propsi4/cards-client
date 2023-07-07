import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom, play } from "./scripts";
// import Input from "../Input/Input";
//import socket from '../../socket/socket'
const Lobby = () => {
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
  const navigate = useNavigate();
  const tryCreateRoom = async () => {
    const roomID = await createRoom(username);
    if(roomID){
      navigate(`/play/${roomID}`);
    }
  };
  const tryPlay = async () => {
    if(await play(username, roomID)){
      navigate(`/play/${roomID}`);
    }
  };
  return (
    <div className="lobby">
      <h1>Lobby</h1>
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <input
        onChange={(e) => setRoomID(e.target.value)}
        type="text"
        placeholder="Room ID"
      />
      <button onClick={() => tryPlay()}>Join</button>
      <button onClick={() => tryCreateRoom()}>Create new room</button>
    </div>
  );
};

export default Lobby;
