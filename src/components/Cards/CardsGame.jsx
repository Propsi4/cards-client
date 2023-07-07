import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import socket from "../../socket/socket";
import { isAllNull } from '../../utils/utils';
const CardsGame = () => {
  const getImage = (card) => {
      return require('../../images/cards/'+card.value+'-'+card.suit+'.png')
  } 
  const getTrumpSuit = (suit) => {
    return require('../../images/suits/'+suit+'.png')
  }
    const dragStartHandler = (card) => {
      setCard(card)
    }
    const dragOverHandler = (e,index) => {
      e.preventDefault()
      setCardPos(index)
    }
    const dragLeaveHandler = (e) => {
      e.preventDefault()
      setCardPos(null)

    }
    const dropHandler = (e) => {
      e.preventDefault()
      const user = playing_list.find((user) => user.username === username)
      if(!user || !card || cardPos === null) return
      if(user.seat === neighbours.defender){
        if(cards_on_table[cardPos]?.value){
          if(card?.suit !== trump_suit && cards_on_table[cardPos]?.suit === trump_suit) return
          if(card?.suit === trump_suit && cards_on_table[cardPos]?.suit === trump_suit && card?.value <= cards_on_table[cardPos]?.value) return
          if(card?.suit !== trump_suit && cards_on_table[cardPos]?.suit !== trump_suit && card?.value <= cards_on_table[cardPos]?.value) return
          if(card?.suit !== trump_suit && card?.suit !== cards_on_table[cardPos]?.suit) return
        }
      } else if([neighbours.left,neighbours.right].includes(user.seat)){
          if(!isAllNull(cards_on_table)){
            if(!cards_on_table.map((obj) => obj?.value === card.value).includes(true)){ console.log("You can't play this card"); return}
          }
      }else return
      socket.emit('play_card', roomID, token, card, cardPos)
      setCard(null)
      setCardPos(null)

    }
    const trump_suit = useSelector((state) => state.trump_suit);
    const [seats,setSeats] = useState([1,2,3,4,5,6])
    const [card, setCard] = useState(null)
    const [cardPos, setCardPos] = useState(null)
    const cards_on_table = useSelector((state) => state.cards_on_table);
    const neighbours = useSelector((state) => state.neighbours);
    const playing_list = useSelector((state) => state.playing_list);
    const is_admin = useSelector((state) => state.is_admin);
    const cards = useSelector((state) => state.cards);
    const username = useSelector((state) => state.username);
    const token = localStorage.getItem("token");
    const { roomID } = useParams();

    useEffect(() => {
      let seats = [1,2,3,4,5,6]
        playing_list.map((seat) => {
        seats[seat.seat] = seat
        })
      setSeats([...seats])
    }, [playing_list])
    const takeSeat = (index) => {
      socket.emit('take_seat', roomID,token,index)
    }
    const resetGame = () => {
      socket.emit('reset_cards', roomID, token)
    }
  return (
    <div className="game_container">
        {trump_suit ? <div className='trump_suit' style={{backgroundImage: `url(${getTrumpSuit(trump_suit)})`}}></div> : null}
        {is_admin ? <button className='reset_game' onClick={() => resetGame()}>Reset game</button> : null}
        <div className="seats">
          {seats.map((seat,index) => <div className='seat' style={{backgroundColor: (index === neighbours?.left || index === neighbours.right) ? "green" : (index === neighbours.defender ? "#c94a40" : null)}} key={index} onClick={() => takeSeat(index)}>{index+1} {seat.username}</div>)}
        </div>
        <div className='table'>
          {cards_on_table.map((obj,index) => <div style={{backgroundImage: obj?.value ?  `url(${getImage(obj)})` : null}} onDragLeave={(e) => {dragLeaveHandler(e)}} onDragOver={(e) => {dragOverHandler(e,index)}}   className='table_card' key={index}></div>)}
        </div>
        <div className="cards_list">
          {cards.length ? cards.map((card,index) => 
          <div 
          draggable
          onDragStart={() => {dragStartHandler(card)}}
          onDragEnd={(e) => {dropHandler(e)}}

          className='card' 
          key={index}
          style={{backgroundImage: `url(${getImage(card)})`}}>
          </div>) : null}
        </div>

    </div>

  )
}

export default CardsGame