import { getUsername, setToken } from "../../utils/utils";
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
    if (!username) {
        alert("Please enter a username")
        return
    }
    if(username.length < 3 || username.length > 10){
        alert("Username must be between 3 and 10 characters")
        return
    }
    if (!roomID) {
        alert("Please enter a room ID")
        return
    }
    if (await getUsername(localStorage.getItem("token")) !== username) {
        setToken(username);
    }
    

    if (await canJOIN(username,roomID)) {
        return true
    } else {
        alert("Can't join the room")
        return false
    };
};

export const createRoom = async (username) => {
    if (!username) {
        alert("Please enter a username")
        return false
    }
    if(username.length < 3 || username.length > 10){
        alert("Username must be between 3 and 10 characters")
        return
    }
    if (await getUsername(localStorage.getItem("token")) !== username) {
        await setToken(username);
    }
    const roomID = await fetch("/api/create_room", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
    }).then((res) => res.json()).then((res) => res.roomID);
    console.log(roomID)
    if(!roomID) return false
    return roomID;
}