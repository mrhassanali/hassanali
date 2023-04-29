import { Html, Head, Main, NextScript } from 'next/document'
import Footer from "../components/Footer/Footer"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"/>
        </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" defer></script>
      </body>
    </Html>
  )
}
