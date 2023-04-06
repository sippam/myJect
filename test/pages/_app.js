import '@/styles/globals.css'
import "./components/style.css";
// import "./bootstrap/css/bootstrap.min.css";
import { ThemeProvider} from 'next-themes'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class" >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
