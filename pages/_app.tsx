import type { AppProps } from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  const GlobalStyle = createGlobalStyle`
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: Verdana, Arial, sans-serif;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }

  `

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
