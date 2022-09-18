import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <main>
        <h1>Greetings, Ironsworn!</h1>
        <p>I am the Oracle.</p>
        You may <Link href={"/oracles"}>ask after your fate</Link>.
      </main>
    </Layout>
  )
}
