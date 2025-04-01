import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    useLoaderData,
    useSearchParams,
} from '@remix-run/react'
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import Footer from './components/organisms/Footer'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import cn from 'classnames'
import { IMAGE_KIT_BASE_URL } from './consts'
import Navbar from './components/organisms/Navbar'

//@ts-expect-error idk
import stylesheet from '~/tailwind.css?url'
import 'react-toastify/dist/ReactToastify.css'

export async function loader({ request }: LoaderFunctionArgs) {
    return json({
        url: request.url,
    })
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
]

export default function App() {
    const { url } = useLoaderData<typeof loader>()
    const [params, setParams] = useSearchParams()
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)

    useEffect(() => {
        const newParams = new URLSearchParams(params)

        if (params.get('tt') === 'error') {
            toast.error(params.get('tm'))
        }
        if (params.get('tt') === 'success') {
            toast.success(params.get('tm'))
        }

        newParams.delete('tt')
        newParams.delete('tm')
        setParams(newParams, { preventScrollReset: true, replace: true })
    }, [params, setParams])

    return (
        <html lang="es">
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
