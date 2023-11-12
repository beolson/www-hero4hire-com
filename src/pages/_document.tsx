import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en" className="h-full antialiased">
            <Head />
            <body className="flex h-full bg-zinc-50 dark:bg-black">
                <div className="flex w-full">
                    <Main />
                    <NextScript />
                </div>
            </body>
        </Html>
    )
}