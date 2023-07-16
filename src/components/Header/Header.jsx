import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import online from '../../images/icons/online.png'
const Header = () => {
  const [isHovered, setIsHovered] = useState(false)
  const users = useSelector((state) => state.users);
  const username = useSelector((state) => state.username);
  return (
    <header className="header">
        <ul>
          <li><div>{username}</div></li>
          <li>Home</li>
          <li>About</li>
        </ul>
        {users.length ? <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='online'><span>{users.length}</span><img src={online}/></div> : null}
        {isHovered ? <div className='online_users'>
          {users.map((user,index) => <div key={index}>{user}</div>)}
        </div> : null}
      </header>
  )
}

export default Header