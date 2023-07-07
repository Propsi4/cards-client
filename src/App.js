import React,{ useEffect } from 'react';
import Game from './components/Game/Game';
import {useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import HandleDisconnect from './components/HandleDisconnect/HandleDisconnect';
import socket from './socket/socket';
function App() {
  const dispatch = useDispatch()
  const {roomID} = useParams()
  const token = localStorage.getItem("token")
  // dispatch({type:"SET_ROOM_ID",payload:roomID})
  // dispatch({type:"SET_USERNAME",payload:getUsername(token)})
  useEffect(()=>{
    socket.emit("user_joined", roomID, token)
    setInterval(() => {
      socket.emit("alive", roomID,token)
    }, 5000);
    socket.on("game_info", ({username,playing_list,cards,owner,trump_suit,cards_on_table,users,neighbours}) => {
      if(username === owner) dispatch({type:"SET_ADMIN",payload:true})
      else dispatch({type:"SET_ADMIN",payload:false})
      dispatch({type:"SET_NEIGHBOURS",payload:neighbours})
      dispatch({type:"SET_USERS",payload:users})
      dispatch({type:"SET_CARDS_ON_TABLE",payload:cards_on_table})
      dispatch({type:"SET_USERNAME",payload:username})
      dispatch({type:"SET_PLAYING_LIST",payload:playing_list})
      dispatch({type:"SET_OWNER",payload:owner})
      dispatch({type:"SET_TRUMP_SUIT",payload:trump_suit})
      dispatch({type:"SET_CARDS",payload:cards})
    })
    socket.on("neighbours", (neighbours) => {
      dispatch({type:"SET_NEIGHBOURS",payload:neighbours})
    })
    socket.on("cards_on_table", (cards_on_table) => {
      dispatch({type:"SET_CARDS_ON_TABLE",payload:cards_on_table})
    })
    socket.on("get_cards", ({cards,trump_suit}) => {
      dispatch({type:"SET_CARDS",payload: cards.sort((a,b) => a.value - b.value)})
      dispatch({type:"SET_TRUMP_SUIT",payload: trump_suit})
    })
    socket.on("new_owner", (owner) => {
      dispatch({type:"SET_OWNER",payload:owner})
    })
    socket.on("users", ({users}) => {
      dispatch({type:"SET_USERS",payload:users})
    })
    socket.on('playing_list', (claimed_seats) => {
      dispatch({type: 'SET_PLAYING_LIST', payload: claimed_seats})

    })
  },[])
  return (
    <div className="App">
      <HandleDisconnect roomID={roomID} token={token}>
      <Game/>
      </HandleDisconnect>
    </div>
  );
}

export default App;
