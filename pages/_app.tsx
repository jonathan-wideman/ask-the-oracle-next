import { DiceProvider } from '../contexts/DiceContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <DiceProvider>
      <Component {...pageProps} />
    </DiceProvider>
  )
}

export default MyApp
