import '@/styles/globals.css'
import "./components/style.css";
// import "./bootstrap/css/bootstrap.min.css";
import { ThemeProvider} from 'next-themes'
import firebaseLogin from './components/FirebaseLogin';

export default function App({ Component, pageProps }) {
  firebaseLogin();
  return (
    <ThemeProvider enableSystem={true} attribute="class" >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
