import Head from 'next/head'

import PureTone from './components/PureTone'
import Inverses from './components/Inverses'


import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sound Playground</title>
        <meta name="description" content="A few simple visualizations of sound concepts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Sound Playground
        </h1>
        <p className={styles.description}>
          A few simple visualizations of sound concepts.
        </p>
      <PureTone />
      <Inverses />

      </main>

      <footer className={styles.footer}>
       
      </footer>
    </div>
  )
}
