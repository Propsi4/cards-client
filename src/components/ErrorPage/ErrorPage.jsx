import React from 'react'
import { useRouteError } from 'react-router-dom'
import './styles.css'
const ErrorPage = () => {
    const error = useRouteError();
  return (
    <div className='error'>
        <h1>Oops!</h1>
        <p>Sorry, something went wrong</p>
        <p>{error.statusText ?? error.message}</p>
    </div>
  )
}

export default ErrorPage