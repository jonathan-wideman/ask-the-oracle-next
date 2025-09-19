import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import Layout from '../../components/Layout'
import { getOracles } from '../../lib/connector'
import { classNames, styleAnimationDelay } from '../../lib/util'
import { useOracleState } from '../../hooks/useOracleState'
import { OracleTable } from '../../components/OracleTable'
import { OracleTableToggleButton } from '../../components/OracleTableToggleButton'
import { OracleResult } from '../../components/OracleResult'
import { Container } from '../../components/atoms/Container'

export default function Oracle({ oracles }) {
  const router = useRouter()
  const { slug } = router.query
  const oracle = oracles.find(oracle => oracle.slug === slug)

  const { rollOracle, tableVisible, toggleTable, result, rolling } =
    useOracleState(oracle, true, undefined, 500);

  return (
    <Layout pageTitle={oracle.title}>
      <main>
        <Container variant='center'>
          <p className={classNames("mb-4 text-3xl font-bold", "fadein")}> Very well;</p>
          <p className={classNames("mb-4 text-lg font-bold", "fadein")} style={styleAnimationDelay(0.5)}>{oracle.title}...</p>

          <OracleResult result={result} rolling={rolling} rollOracle={rollOracle} />

          <button onClick={() => rollOracle()} className="fadein" style={styleAnimationDelay(1.5)}>ask again</button>
          <OracleTableToggleButton toggleTable={toggleTable} tableVisible={tableVisible} animationDelay={1.5} />
          <Link
            href={`/oracles/categories/${oracle.category}`}
            className="fadein"
            style={styleAnimationDelay(1.5)}>seek a different fate</Link>

          <OracleTable oracle={oracle} tableVisible={tableVisible} />
        </Container>
      </main >
    </Layout >
  );
}

export async function getStaticPaths() {
  const paths = getOracles().map(oracle => ({ params: { slug: oracle.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps() {
  return { props: { oracles: getOracles() } }
}
