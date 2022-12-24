import '../styles/main.scss'
import HeadAndMeta from 'components/headAndMeta/HeadAndMeta'
import { Inter } from '@next/font/google'

const inter = Inter({
    weight: '500',
    subsets: ['latin'],
})


function MyApp({ Component, pageProps }) {
    return (
        <>
            <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
            }
        `}
            </style>

            <HeadAndMeta
                title="Theneo Speco-netor 3000"
                description="Online editor to update/paste code and get openAPI spec code"
                favIconImagePath=""
                baseUrl="https://theneo-front-f43w.vercel.app/speconator.png"
                ogTitle="Theneo Speco-netor 3000 made by beqa.dev"
                ogDescription="Online editor to update/paste code and get openAPI spec code"
                ogImagePath="https://theneo-front-f43w.vercel.app/speconator.png"
                titleBarColor="#009879"
            />

            <Component {...pageProps} />
        </>
    )

}

export default MyApp
