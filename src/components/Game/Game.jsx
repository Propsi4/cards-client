import React from "react";
import Chat from "../Chat/Chat";
import Cards from "../Cards/CardsGame";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import socket from "../../socket/socket";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
const Game = () => {
  useDispatch()({ type: "SET_OLD_ROOM_ID", payload: useParams().roomID });
  const navigator = useNavigate();

  useEffect(() => {
    socket.on("disconnect", () => {
      navigator("/");
    });
  }, []);
  const [chatVisible, setChatVisible] = useState(true);
  return (
    <div className="content">
      <CustomButton className="chat-toggle" spanStyles={{padding : '4px'}} style={{minWidth: "min-content"}} onClick={() => setChatVisible(!chatVisible)}>{chatVisible ? "Hide" : "Show"} Chat</CustomButton>
      <Cards/>
      <Chat chatVisible={chatVisible}/>
    </div>
  );
};

export default Game;
