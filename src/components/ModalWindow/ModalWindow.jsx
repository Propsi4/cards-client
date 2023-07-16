import React from 'react'
import "./modalwindow.css"
import ModalContent from './ModalContent'
const ModalWindow = ({winner,loser, setResults}) => {
  return (

    <div className='modal' onClick={() => setResults(null)}>
        <div className='modal_info' onClick={(e) => e.stopPropagation()}>

        {winner.points !== loser.points ? 
        `${winner.username.charAt(0).toUpperCase() + winner.username.slice(1)} has won the game!` : "Draw!"}

        {winner ? 
            <ModalContent player={winner}/>
        : null}
        {loser ?
            <ModalContent player={loser}/>
        : null}
        
        </div>
    </div>
  )
}

export default ModalWindow