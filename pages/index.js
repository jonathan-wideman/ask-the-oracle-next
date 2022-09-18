import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

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
