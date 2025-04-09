import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    useLoaderData,
} from '@remix-run/react'
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import Footer from './components/organisms/Footer'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import cn from 'classnames'
import { IMAGE_KIT_BASE_URL } from './consts'
import Navbar from './components/organisms/Navbar'

//@ts-expect-error idk
import stylesheet from '~/tailwind.css?url'
import 'react-toastify/dist/ReactToastify.css'
import { getTheme } from './utils/server'
import { themeCookie } from './utils/cookies/theme'

export async function loader({ request }: LoaderFunctionArgs) {
    const searchParams = new URL(request.url).searchParams
    const action = searchParams.get('action')
    const tt = searchParams.get('tt')
    const tm = searchParams.get('tm')

    let initialTheme = await getTheme(request)

    if (action === 'switch_theme') {
        initialTheme = initialTheme === 'light' ? 'dark' : 'light'
    }

    return json(
        {
            url: request.url,
            initialTheme,
            tt,
            tm,
        },
        {
            headers: {
                'Set-Cookie':
                    action === 'switch_theme'
                        ? await themeCookie.serialize(initialTheme)
                        : await themeCookie.serialize(initialTheme),
            },
        }
    )
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
]

export default function App() {
    const { url, initialTheme, tt, tm } = useLoaderData<typeof loader>()
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)

    useEffect(() => {
        if (tt && tm) {
            //@ts-expect-error idk
            toast[tt](tm)
        }
    }, [tt, tm])

    return (
        <html data-theme={initialTheme} lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href={`${IMAGE_KIT_BASE_URL}/tr:w-28,ar-1-1/favicon.png`}
                />
                <link rel="canonical" href={url} />
                <meta property="og:url" content={url} />
                <meta property="og:locale" content="es" />
                <Meta />
                <Links />
            </head>
            <body
                className={cn(
                    'bg-base-primary lg:overflow-y-auto',
                    isNavbarOpen ? 'overflow-y-hidden' : 'overflow-auto'
                )}
            >
                <main>
                    <Navbar
                        onOpen={() => setIsNavbarOpen(true)}
                        onClose={() => setIsNavbarOpen(false)}
                    />
                    <div className="h-[62px] w-full md:h-[80px]"></div>
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    <Footer />
                </main>
                <ToastContainer
                    position="bottom-right"
                    limit={3}
                    stacked
                    theme="colored"
                />
            </body>
        </html>
    )
}
