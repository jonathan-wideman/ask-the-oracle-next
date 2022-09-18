import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDiceContext } from '../../contexts/DiceContext'
import { getOracles } from '../../lib/connector'

export default function Oracle({ oracles }) {
  const router = useRouter()
  const { slug } = router.query
  const oracle = oracles.find(oracle => oracle.slug === slug)

  const [result, setResult] = useState('consulting the oracle...')
  const { roll } = useDiceContext()

  const rollOracle = () => {
    setResult(roll(oracle))
  }

  useEffect(() => {
    rollOracle()
  }, [])

  return (
    <Layout pageTitle={slug}>
      <main>
        <p>Very well; {oracle.title}...</p>
        <p>{result}</p>

        <button onClick={() => rollOracle()}>ask again</button>

        <ul>
          {oracle.table.map((row, index) => <li key={index}>
            {row.roll} -- {row.result}
          </li>)}
        </ul>
      </main>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getOracles().map(oracle => ({ params: { slug: oracle.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps() {
  // return { props: { oracle: getOracles().find(oracle => oracle.slug === slug) } }
  return { props: { oracles: getOracles() } }
}
