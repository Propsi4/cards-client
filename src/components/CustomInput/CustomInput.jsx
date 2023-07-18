import React from 'react'
import styles from './CustomInput.module.css'
import { useEffect, useState } from 'react'
const CustomInput = ({children,...attributes}) => {
  // create unique id for input
  const [random,setRandom] = useState(0)
  useEffect(() => {
    setRandom(Math.random().toString(36).substring(7))
  },[])

  return (
    <div className={styles.form__group}>
        <input {...attributes}  className={styles.form__field}  id={`input-text-${random}`} required />
        <label htmlFor={`input-text-${random}`} className={styles.form__label}>{children}</label>
    </div>
  )
}

export default CustomInput