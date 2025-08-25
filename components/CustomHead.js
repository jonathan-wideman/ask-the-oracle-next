import Head from 'next/head'

export default function CustomHead({ pageTitle }) {

  const title = `Ask the Oracle${pageTitle != null ? ` - ${pageTitle}` : ''}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Ironsworn TTRPG Ask the Oracle Generator" />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  )
}
