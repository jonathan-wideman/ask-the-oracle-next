import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../components/Layout'
import { useDiceContext } from '../../contexts/DiceContext'
import { getOracles } from '../../lib/connector'

export default function Oracle({ oracles }) {
  const router = useRouter()
  const { slug } = router.query
  const oracle = oracles.find(oracle => oracle.slug === slug)

  const [result, setResult] = useState('')
  const { roll } = useDiceContext()

  return (
    <Layout pageTitle={slug}>
      <main>
        <h1>Oracle: {oracle.title}</h1>
        <button onClick={() => setResult(roll(oracle))}>Roll</button>
        <p>{result}</p>
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
