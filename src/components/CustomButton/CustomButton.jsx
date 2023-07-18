import React from 'react'
import styles from "./CustomButton.module.css"
const CustomButton = ({spanStyles,children,...attributes}) => {
    // if attributes contain classNa, add it to the button
    // if not, add the default class
    if (attributes.className) {
        attributes.className += ` ${styles.button}`
    }
    else {
        attributes.className = styles.button
    }
  return (
    <button className={styles.button} {...attributes} role="button"><span style={spanStyles}>{children}</span></button>
  )
}

export default CustomButton