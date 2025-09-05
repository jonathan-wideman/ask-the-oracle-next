import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import Layout from '../../components/Layout'
import { getOracles } from '../../lib/connector'
import { classNames, styleAnimationDelay } from '../../lib/util'
import utilityStyles from '../../styles/utility.module.css'
import oracleStyles from '../../styles/Oracle.module.css'
import { useOracleState } from '../../hooks/useOracleState'
import { OracleTable } from '../../components/OracleTable'
import { OracleTableToggleButton } from '../../components/OracleTableToggleButton'
import { OracleResult } from '../../components/OracleResult'

export default function Oracle({ oracles }) {
  const router = useRouter()
  const { slug } = router.query
  const oracle = oracles.find(oracle => oracle.slug === slug)

  const { rollOracle, tableVisible, toggleTable, result, rolling } =
    useOracleState(oracle, true, undefined, 500);

  return (
    <Layout pageTitle={oracle.title}>
      <main>
        <div className={classNames(utilityStyles.container, utilityStyles.content_center)}>
          <p className={classNames(oracleStyles.text_xxl, utilityStyles.fadein)}> Very well;</p>
          <p className={classNames(oracleStyles.text_l, utilityStyles.fadein)} style={styleAnimationDelay(0.5)}>{oracle.title}...</p>

          <OracleResult result={result} rolling={rolling} rollOracle={rollOracle} />

          <button onClick={() => rollOracle()} className={utilityStyles.fadein} style={styleAnimationDelay(1.5)}>ask again</button>
          <OracleTableToggleButton toggleTable={toggleTable} tableVisible={tableVisible} animationDelay={1.5} />
          <Link href={`/oracles/categories/${oracle.category}`} ><a className={utilityStyles.fadein} style={styleAnimationDelay(1.5)}>seek a different fate</a></Link>

          <OracleTable oracle={oracle} tableVisible={tableVisible} />
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
