import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { canJOIN, createRoom, getRooms, play } from "./scripts";
import CustomButton from "../CustomButton/CustomButton";
import { useSelector } from "react-redux";
import socket from "../../socket/socket";
import { useEffect } from "react";
import CustomInput from "../CustomInput/CustomInput";
import { useDispatch } from "react-redux";
import { validateUsername } from "../../utils/utils";
import useDebounce from "../../hooks/useDebounce";
// import Input from "../Input/Input";
//import socket from '../../socket/socket'
const Lobby = () => {
  const [username, setUsername] = useDebounce("", 500);
  const [roomID, setRoomID] = useDebounce("", 500);
  const oldRoomID = useSelector((state) => state.oldRoomID)
  const [rooms, setRooms] = useState([]);
  const [validLength, setValidLength] = useState(false);
  const [validRegex, setValidRegex] = useState(false);
  const [joinable, setJoinable] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    validateUsername(username).then((data) => {
      setValidLength(data.length);
      setValidRegex(data.regex);
    });
  }, [username]);
  useEffect(() => {
    canJOIN(username,roomID).then((data) => setJoinable(data))
    // if(canJOIN(username,roomID).then((data) => data) === false){
    //   setJoinable(false);
    // }
    // else{
    //   setJoinable(true);
    // }
    // console.log("joinable",joinable)
    // let div = e.target.parentElement;
    // let label = div.querySelector("label");
    // if (!canJOIN(username,e.target.value)) {
    //   label.style.color = "red";
    // } else {
    //   label.style.color = "green";
    // }
  }, [username, roomID]);

  useEffect(() => {
    if(oldRoomID){
    socket.emit("left_room", oldRoomID, socket.id);
    dispatch({type:"SET_USERS",payload:[]})
    dispatch({type:"SET_PLAYING_LIST",payload:[]})
    dispatch({type:"SET_ADMIN",payload:false})
    dispatch({type:"SET_OLD_ROOM_ID",payload:""})
    dispatch({type:"SET_USERNAME",payload:""})
    dispatch({type:"SET_TURN",payload:0})
    dispatch({type:"SET_OWNER",payload:""})
    }

    // disconnect from prev room
    getRooms().then((data) => {
      setRooms(data);
    });
    setInterval(() => {
      getRooms().then((data) => {
        setRooms(data);
      });
    },5000);
  }, []);
  const tryCreateRoom = async () => {
    const roomID = await createRoom(username);
    if(roomID){
      navigate(`/play/${roomID}`);
    }
  };
  const tryPlay = async (e,altroom = "") => {
    if(altroom !== ""){

      if(await play(username, altroom)){
      navigate(`/play/${altroom}`);
      }
      return;
    }
    if(await play(username, roomID)){
      navigate(`/play/${roomID}`);
      return
    }
      e.preventDefault();
      // remove classes
      let element = e.target;
      let span = element
      if(element.nodeName === "SPAN"){
        element = element.parentElement;
      }else{
        span = element;
      }
      let old_text = span.textContent;
      span.textContent = "Invalid " + element.id;
      element.classList.add("invalid-shake");
      // get span from button

      setTimeout(() => {
        span.textContent = old_text;
        element.classList.remove("invalid-shake");
      }
      , 600);
  };
  return (
    <div className="lobby">
      <div className="right">
      <div className="user-input">
      <div className="input-username">
      <CustomInput
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      ><span style={{color: validLength && validRegex ? "#3ac9bd" : "#eb4034", transition : "all 0.2s"}}>Username</span></CustomInput>
      <div className="validation">
        <ul>
       <li><div className={`validation-result ${validLength ? "valid" : null}`}>Must be between 3 and 10 characters</div></li>
        <li><div className={`validation-result ${validRegex ? "valid" : null}`}>Must only contain letters, numbers, and underscores</div></li>
        </ul>
      </div>
      </div>
      <div className="input-roomID">
      <CustomInput 
        onChange={(e) => setRoomID(e.target.value)}
        type="number"
        placeholder="Room ID"
      ><span style={{color: joinable ? "#3ac9bd" : "#eb4034", transition: "all 0.2s"}}>Room ID</span></CustomInput>
      </div>
      <div className="lobby-buttons">
      <CustomButton id="Room ID" onClick={(e) => tryPlay(e)}>Join</CustomButton>
      <CustomButton onClick={() => tryCreateRoom()}>Create</CustomButton>
      </div>
      </div>
      </div>
      {rooms.length ? <div className="left">
        <h1>Rooms</h1>
        <div className="rooms">
          {rooms.sort((a, b) => b.users - a.users).slice(0, 5)
          .map((room) => (
            <div className="room" key={room.roomID}>
              <div className="roomID">RoomID: <span className="info">{room.roomID}</span></div>
              <div className="players">Online: 
              <span className="info">{room.users}</span>
              </div>
              <CustomButton id="RoomID" onClick={(e) => {tryPlay(e,room.roomID)}}>Join</CustomButton>
              </div>))}
        </div>
      </div> : null}
    </div>
            
  );
};

export default Lobby;
