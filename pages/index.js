import Link from 'next/link'
import Layout from '../components/Layout'
import { classNames } from '../lib/util'
import utilityStyles from '../styles/utility.module.css'
import oracleStyles from '../styles/Oracle.module.css'

export default function Home() {
  return (
    <Layout>
      <main>
        <div className={classNames(utilityStyles.container, utilityStyles.content_center)}>
          <p className={oracleStyles.text_xl}>Greetings, Ironsworn!</p>
          <p className={oracleStyles.text_l}>I am the Oracle.</p>
          <p>You may <Link href={"/oracles"}>ask after your fate</Link>.</p>
        </div>
      </main>
    </Layout>
  )
}
