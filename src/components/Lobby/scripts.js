// this file contains all the functions that are used in the lobby component
import { setToken, validateUsername } from "../../utils/utils";

export  const canJOIN = async (username,roomID) => {
 const answer = await fetch("/api/can_join", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        username: username,
        token: localStorage.getItem("token"),
        roomID: roomID
    }),
}).then((res) => res.json()).then((res) => res.canJoin);
return answer;
}
export const play = async (username, roomID) => {

    if (!roomID || !username) {
        return
    }
    const validation_result = await validateUsername(username)
    if(!Object.keys(validation_result).every((key) => validation_result[key] === true)) return false
    await setToken(username);
    const answer = await canJOIN(username,roomID).then((res) => {return res})
    return answer;
};

export const createRoom = async (username) => {
    const validation_result = await validateUsername(username)
    if(!Object.keys(validation_result).every((key) => validation_result[key] === true)) return false
    await setToken(username);
    const roomID = await fetch("/api/create_room", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
    }).then((res) => res.json()).then((res) => res.roomID);
    if(!roomID) return false
    
    return roomID;
}

export const getRooms = async () => {
    const rooms = await fetch("/api/rooms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

    }).then((res) =>  res.json());
    return rooms;
}
