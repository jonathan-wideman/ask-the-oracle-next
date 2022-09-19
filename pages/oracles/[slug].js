import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDiceContext } from '../../contexts/DiceContext'
import { getOracles } from '../../lib/connector'
import { classNames } from '../../lib/util'
import utilityStyles from '../../styles/utility.module.css'
import rollTableStyles from '../../styles/RollTable.module.css'

export default function Oracle({ oracles }) {
  const router = useRouter()
  const { slug } = router.query
  const oracle = oracles.find(oracle => oracle.slug === slug)

  const [tableVisible, setTableVisible] = useState(false)

  const [result, setResult] = useState('consulting the oracle...')
  const { roll } = useDiceContext()

  const rollOracle = () => {
    setResult(roll(oracle))
  }

  useEffect(() => {
    rollOracle()
  }, [])

  const toggleTable = () => setTableVisible(visible => !visible)

  return (
    <Layout pageTitle={oracle.title}>
      <main>
        <div className={classNames(utilityStyles.container, utilityStyles.content_center)}>
          <p>Very well; {oracle.title}...</p>
          <p>{result}</p>

          <button onClick={() => rollOracle()}>ask again</button>
          <button onClick={() => toggleTable()}>{tableVisible ? 'put away' : 'consult'} the runic charts</button>

          <Link href="/oracles" >seek a different fate</Link>

          {tableVisible ? <div className={rollTableStyles.table}>
            {oracle.table.map((row, index) => <React.Fragment key={index}>
              <span>{row.roll}</span>
              <span>{row.result}</span>
            </React.Fragment>)}
          </div> : null}
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getOracles().map(oracle => ({ params: { slug: oracle.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps() {
  return { props: { oracles: getOracles() } }
}
