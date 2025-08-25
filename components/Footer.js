import Link from 'next/link'
import footerStyles from '../styles/Footer.module.css'
import utilityStyles from '../styles/utility.module.css'

export default function Footer() {
  return (
    <footer>
      <div className={utilityStyles.container}>
        <div className={footerStyles.content}>
          <p>©2025 Jonathan Wideman</p>
          <Link href={"/api-docs"}>API Documentation</Link>
          <p>Based on <Link href={"https://www.ironswornrpg.com/"}>Ironsworn TTRPG</Link> by Shawn Tomkin</p>
        </div>
      </div>
    </footer >
  )
}
