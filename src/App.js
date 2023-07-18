import React,{ useEffect, useState } from 'react';
import Game from './components/Game/Game';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import HandleDisconnect from './components/HandleDisconnect/HandleDisconnect';
import socket from './socket/socket';
import ModalWindow from './components/ModalWindow/ModalWindow';
function App() {
  const [results, setResults] = useState(null)
  const dispatch = useDispatch()
  const {roomID} = useParams()
  const token = localStorage.getItem("token")
  const username = useSelector(state => state.username)
  useEffect(()=>{

    socket.emit("user_joined", roomID, token)
    setInterval(() => {
      socket.emit("alive", roomID,token)
    }, 5000);


    socket.on("game_info", ({username,playing_list,owner,users,turn}) => {
      if(username === owner) dispatch({type:"SET_ADMIN",payload:true})
      else dispatch({type:"SET_ADMIN",payload:false})
      dispatch({type:"SET_USERS",payload:users})
      dispatch({type:"SET_USERNAME",payload:username})
      dispatch({type:"SET_PLAYING_LIST",payload:playing_list})
      dispatch({type:"SET_OWNER",payload:owner})
      dispatch({type:"SET_TURN",payload:turn})

    })
    socket.on("turn", (turn) => {
      dispatch({type:"SET_TURN",payload:turn})
    })

    socket.on("new_owner", (owner) => {
      dispatch({type:"SET_OWNER",payload:owner})
      if(owner === username) dispatch({type:"SET_ADMIN",payload:true})
      else dispatch({type:"SET_ADMIN",payload:false})
      window.location.reload()
    })

    socket.on("users", ({users}) => {
      dispatch({type:"SET_USERS",payload:users})
    })

    socket.on('playing_list', (claimed_seats) => {
      dispatch({type: 'SET_PLAYING_LIST', payload: claimed_seats})

    })

    socket.on('results', (result) => {
      if(!result) return;
      // display modal window with winner for 5 seconds
      setResults(result)
      setTimeout(() => {
        setResults(null)
      }
      , 5000)
    })
  },[])
  return (
    <div className="App">
      {results ? <ModalWindow {...results} setResults={setResults}/> : null}
      <HandleDisconnect roomID={roomID} token={token}>
      <Game/>
      </HandleDisconnect>
    </div>
  );
}

export default App;
