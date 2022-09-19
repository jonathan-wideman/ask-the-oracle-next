import Link from 'next/link'
import Layout from '../../components/Layout'
import { getOracles } from '../../lib/connector'
import { classNames } from '../../lib/util'
import utilityStyles from '../../styles/utility.module.css'
import oracleStyles from '../../styles/Oracle.module.css'

export default function Oracles({ oracles }) {
  return (
    <Layout pageTitle={'Oracles'}>
      <main>
        <div className={classNames(utilityStyles.container, utilityStyles.content_center)}>
          <p className={oracleStyles.text_xl}>What do you seek?</p>
          <ul>
            {oracles?.map(oracle => <li key={oracle.id}>
              <Link href={`/oracles/${oracle.slug}`}>{oracle.title}</Link>
            </li>)}
          </ul>
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  return { props: { oracles: getOracles() } }
}
