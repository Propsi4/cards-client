import React from 'react'
import styles from "./CustomButton.module.css"
const CustomButton = ({children,...attributes}) => {
    // if attributes contain classNa, add it to the button
    // if not, add the default class
    if (attributes.className) {
        attributes.className += ` ${styles.button}`
    }
    else {
        attributes.className = styles.button
    }
  return (
    <button className={styles.button} {...attributes} role="button"><span class="text">{children}</span></button>
  )
}

export default CustomButton