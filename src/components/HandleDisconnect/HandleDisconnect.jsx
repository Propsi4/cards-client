import React,{ useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
const HandleDisconnect = ({children,token,roomID}) => {
    const navigator = useNavigate()
    const handleDisconnect = async ()=>{
        const join_resp = await fetch("/api/join_room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            },
          body: JSON.stringify({ token : token,  roomID: roomID }),
        }).then((res) => res.json());
        if(!join_resp.username){
          navigator('/')
        }
      }
      useEffect(()=>{
        if(!token || !roomID){
          navigator('/')
        }
        handleDisconnect()
        },[])
  return (
    <div>
    {children}
    </div>
  )
}

export default HandleDisconnect