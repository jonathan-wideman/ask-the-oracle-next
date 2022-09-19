import Link from 'next/link'
import Layout from '../components/Layout'
import { classNames } from '../lib/util'
import utilityStyles from '../styles/utility.module.css'

export default function Home() {
  return (
    <Layout>
      <main>
        <div className={classNames(utilityStyles.container, utilityStyles.content_center)}>
          <p>Greetings, Ironsworn!</p>
          <p>I am the Oracle.</p>
          <p>You may <Link href={"/oracles"}>ask after your fate</Link>.</p>
        </div>
      </main>
    </Layout>
  )
}
