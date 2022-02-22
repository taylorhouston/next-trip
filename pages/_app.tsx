import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = {}

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
