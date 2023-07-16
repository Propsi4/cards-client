import React from 'react'
import { getImage } from '../../utils/utils'
const ModalContent = ({player}) => {
  return (
    <div className='modal_content'>
        <div className='modal_header'>
            <h2>{player.username}</h2>
        </div>
        <hr></hr>
        <div className='modal_body'>
            <span>Points: {player.points}</span>
            <div className='modal_body_cards'>
                {player.cards.map((card,index) => <div className='card_image' key={index} style={{backgroundImage: card?.value ?  `url(${getImage(card)})` : null}}></div>)}
            </div>
        </div>
    </div>
  )
}

export default ModalContent