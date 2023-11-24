import { AppProps } from "next/app";
import "../styles/tailwind.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen">
      <Component {...pageProps} />
    </div>
  );
}
