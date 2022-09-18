import Link from 'next/link'
import Layout from '../../components/Layout'
import { getOracles } from '../../lib/connector'

export default function Oracles({ oracles }) {
  return (
    <Layout pageTitle={'Oracles'}>
      <main>
        <p>What do you seek?</p>
        <ul>
          {oracles?.map(oracle => <li key={oracle.id}>
            <Link href={`/oracles/${oracle.slug}`}>{oracle.title}</Link>
          </li>)}
        </ul>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  return { props: { oracles: getOracles() } }
}
