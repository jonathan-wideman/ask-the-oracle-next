import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { useDiceContext } from '../../contexts/DiceContext'
import { getOracles } from '../../lib/connector'
import { classNames, styleAnimationDelay } from '../../lib/util'
import utilityStyles from '../../styles/utility.module.css'
import oracleStyles from '../../styles/Oracle.module.css'

export default function Oracle({ oracles }) {
  const router = useRouter()
  const { slug } = router.query
  const oracle = oracles.find(oracle => oracle.slug === slug)

  const [tableVisible, setTableVisible] = useState(false)

  const [result, setResult] = useState('consulting the oracle...')
  const { roll } = useDiceContext()

  const [rolling, setRolling] = useState(false)
  const timeoutRef = useRef(null);
  const resetAnimation = (delay) => {
    timeoutRef.current = setTimeout(() => setRolling(false), delay);
  }
  useEffect(() => {
    // Clear the timeout interval when the component unmounts
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const rollOracle = (delay = 10) => {
    setRolling(true)
    resetAnimation(delay)
    setResult(roll(oracle))
  }

  useEffect(() => {
    // rollOracle(1000)
    rollOracle(500)
  }, [])

  const toggleTable = () => setTableVisible(visible => !visible)

  return (
    <Layout pageTitle={oracle.title}>
      <main>
        <div className={classNames(utilityStyles.container, utilityStyles.content_center)}>
          <p className={classNames(oracleStyles.text_xxl, utilityStyles.fadein)}> Very well;</p>
          <p className={classNames(oracleStyles.text_l, utilityStyles.fadein)} style={styleAnimationDelay(0.5)}>{oracle.title}...</p>

          <p className={classNames(oracleStyles.result, rolling ? utilityStyles.transparent : utilityStyles.fadein)}>{result}</p>

          <button onClick={() => rollOracle()} className={utilityStyles.fadein} style={styleAnimationDelay(1.5)}>ask again</button>
          <button onClick={() => toggleTable()} className={utilityStyles.fadein} style={styleAnimationDelay(1.5)}>{tableVisible ? 'put away' : 'consult'} the runic charts</button>
          <Link href="/oracles" ><a className={utilityStyles.fadein} style={styleAnimationDelay(1.5)}>seek a different fate</a></Link>

          {tableVisible ? <div className={classNames(oracleStyles.table, utilityStyles.fadein)}>
            {oracle.table.map((row, index) => <React.Fragment key={index}>
              <span className={utilityStyles.fadein} style={styleAnimationDelay(index * 0.025 + 0.25)}>{row.roll}</span>
              <span className={utilityStyles.fadein} style={styleAnimationDelay(index * 0.025 + 0.25)}>{row.result}</span>
            </React.Fragment>)}
          </div> : null}
        </div>
      </main >
    </Layout >
  )
}

export async function getStaticPaths() {
  const paths = getOracles().map(oracle => ({ params: { slug: oracle.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps() {
  return { props: { oracles: getOracles() } }
}
