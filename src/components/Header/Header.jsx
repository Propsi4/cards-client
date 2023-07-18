import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import online from '../../images/icons/online.png'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const [isHovered, setIsHovered] = useState(false)
  const users = useSelector((state) => state.users);
  const username = useSelector((state) => state.username);
  const owner = useSelector((state) => state.owner);
  const navigate = useNavigate();
  return (
    <header className="header">
        <ul>
          <li><div>{username}</div></li>
          <li onClick={() => navigate("/")}>Return to lobby</li>
        </ul>
        {users.length ? <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='online'><span>{users.length}</span><img src={online}/></div> : null}
        {isHovered ? <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='online_users'>
          {users.map((user,index) => <div key={index}><span className='text-gradient-yellow'>{owner === user ? "[OWNER]" : null}</span>{user}</div>)}
        </div> : null}
      </header>
  )
}

export default Header