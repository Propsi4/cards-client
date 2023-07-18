import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import socket from "../../socket/socket";
import { getImage } from '../../utils/utils';
import CustomButton from '../CustomButton/CustomButton';
const CardsGame = () => {

    const [seat,setSeat] = useState(0)
    const turn = useSelector((state) => state.turn);
    const [seats,setSeats] = useState([1,2])
    const playing_list = useSelector((state) => state.playing_list);
    const is_admin = useSelector((state) => state.is_admin);
    const username = useSelector((state) => state.username);
    const token = localStorage.getItem("token");
    const { roomID } = useParams();
    const [displayButtons,setDisplayButtons] = useState(false)
    const [clear_setting,setClearSetting] = useState(true)
    useEffect(() => {
      socket.emit('clear_on_end', roomID, token, clear_setting)
    }, [clear_setting])
    useEffect(() => {
      let seats = [1,2]
        playing_list.map((seat) => {
        seats[seat.seat] = seat
        if(seat.username === username){
          setSeat(seat.seat)
        }
        })
      setSeats([...seats])
    }, [playing_list])
    useEffect(() => {
      if(turn === seat && playing_list.find((obj) => obj.username === username)){
        if(!playing_list.find((obj) => obj.username === username).skipped){
          setDisplayButtons(true)
        }
      }
      else{
        setDisplayButtons(false)
      }
    }, [turn,seat,playing_list])


  return (
    <div className="game_container">
        
        <div className="field">
          {seats.map((seat_temp,index) => 
          <div className="player_side" key={index}>
           <div className={`seat${turn === index ? " seat-turn" : ""}`} key={index} onClick={() => socket.emit('take_seat', roomID,token,index)}>
            {seat_temp.username ? <div className='seat-info'>{seat_temp.username}<br/>{seat_temp.points}</div> : index}
          </div>
          <div className="cards">
            {seat_temp.cards?.map((card,index) => <div style={{display : "flex"}} key={index}><div style={{backgroundImage: card?.value ?  `url(${getImage(card)})` : null}} className='card_image' key={index}/></div>)}
          </div>
          </div>)}
        </div>
        

        <div className='buttons'>
        {displayButtons ? (playing_list.length >= 2 ? <CustomButton onClick={() => socket.emit('take_card', roomID, token)}>Take card</CustomButton> : null) : null}
        {displayButtons && playing_list.find((user) => user.username === username)?.points ? (playing_list.length >= 2 ? <CustomButton onClick={() => socket.emit('pass', roomID, token)}>Skip turn</CustomButton> : null) : null}
        {playing_list.find((obj) => obj.username === username) ? <CustomButton className='game_button' onClick={() => socket.emit('leave_seat', roomID, token)}>Leave seat</CustomButton> : null}
        </div>
        <div className="admin-buttons">
        {is_admin ? <CustomButton onClick={() => socket.emit('reset_cards', roomID, token)}>Reset game</CustomButton> : null}
        {is_admin ? <CustomButton onClick={() => {setClearSetting(!clear_setting)}}>Clear seats on end: {clear_setting ? "True" : "False"}</CustomButton> : null}
        </div>
    </div>

  )
}

export default CardsGame