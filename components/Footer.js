import Link from 'next/link'
import React from 'react'
import { classNames } from '../lib/util'
import footerStyles from '../styles/Footer.module.css'
import utilityStyles from '../styles/utility.module.css'

export default function Footer() {
  return (
    // <footer className='container'>
    <footer>
      <div className={utilityStyles.container}>
        <div className={footerStyles.content}>
          <p>©2022 Jonathan Wideman</p>
          <p>based on <Link href={"https://www.ironswornrpg.com/"}>Ironsworn TTRPG</Link> by Shawn Tomkin</p>
        </div>
      </div>
    </footer >
  )
}
