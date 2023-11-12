import { AppProps } from 'next/app'
import '../styles/tailwind.css'
import { Layout } from '@/components/Layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return         <div className="flex w-full">
  <Layout>  <Component {...pageProps} /></Layout>
</div>
  

}
