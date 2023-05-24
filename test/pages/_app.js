<<<<<<< HEAD
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
=======
import "@/styles/globals.css";
import "./components/style.css";
import { ThemeProvider } from "next-themes";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

export default function App({ Component, pageProps }) {
  const supabase = createClient(
    "https://ridkenrjyemxnzmjevqi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZGtlbnJqeWVteG56bWpldnFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMzMTIyMDgsImV4cCI6MTk5ODg4ODIwOH0.hobwzh0Dlx5k2Sr_Q-RH6cnXxjmE4z7h9-JuHtAFw1w"
  );
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionContextProvider>
>>>>>>> 3ddb377 (Finish set data on google calendar, Now can only track user location)
  );
}
