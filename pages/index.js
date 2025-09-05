import Link from 'next/link'
import Layout from '../components/Layout'
import { classNames, styleAnimationDelay } from '../lib/util'
import utilityStyles from '../styles/utility.module.css'
import oracleStyles from '../styles/Oracle.module.css'

export default function Home() {
  return (
    <Layout>
      <main>
        <div className={classNames(utilityStyles.container, utilityStyles.content_center)}>
          <p className={classNames(oracleStyles.text_xxl, utilityStyles.fadein)}>Greetings, Ironsworn!</p>
          <p className={classNames(oracleStyles.text_l, utilityStyles.fadein)} style={styleAnimationDelay(0.5)}>I am the Oracle.</p>
          <p className={utilityStyles.fadein} style={styleAnimationDelay(1)}>You may <Link href={"/oracles/categories"}>ask after your fate</Link></p>
          <p className={utilityStyles.fadein} style={styleAnimationDelay(1)}>or <Link href={"/moves/categories"}>consider your actions</Link>.</p>
        </div>
      </main>
    </Layout>
  )
}
