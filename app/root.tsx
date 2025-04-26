import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    useLoaderData,
    useNavigate,
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
import Modal from './components/atoms/Modal'
import ContactForm from './components/organisms/ContactForm'

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const searchParams = url.searchParams
    const action = searchParams.get('action')
    const pathname = url.pathname
    const tt = searchParams.get('tt')
    const tm = searchParams.get('tm')

    const headers: Record<string, string> = {}

    return json(
        {
            url: request.url,
            action,
            tt,
            tm,
            pathname,
        },
        {
            headers,
        }
    )
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
]

export default function App() {
    const { url, tt, tm, pathname, action } = useLoaderData<typeof loader>()
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(
            "%cHey there! Curious about the code? Well, I'll let you in on it: it's built with React (Remix) and styled with Tailwind CSS!",
            'font-size: 20px; color: #fefce1; background: #0e0f0f; padding: 10px; border-radius: 5px; font-weight: bold;'
        )
    }, [])

    useEffect(() => {
        if (tt && tm) {
            //@ts-expect-error idk
            toast[tt](tm)

            const url = new URL(window.location.href)
            url.searchParams.delete('tt')
            url.searchParams.delete('tm')
            url.searchParams.delete('formStatus')

            navigate(`${url.pathname}${url.search}`, {
                replace: true,
                preventScrollReset: true,
            })
        }
    }, [tt, tm, navigate])

    function handleContactFormClose() {
        const url = new URL(window.location.href)
        url.searchParams.delete('action')
        navigate(`${url.pathname}${url.search}`, {
            replace: true,
            preventScrollReset: true,
        })
    }

    return (
        <html lang="en">
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
                    {!pathname.includes('admin') && (
                        <Navbar
                            onOpen={() => setIsNavbarOpen(true)}
                            onClose={() => setIsNavbarOpen(false)}
                        />
                    )}
                    {!pathname.includes('admin') && (
                        <div className="h-[62px] w-full md:h-[80px]"></div>
                    )}

                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    {!pathname.includes('admin') && <Footer />}
                </main>
                <ToastContainer
                    position="bottom-right"
                    limit={3}
                    stacked
                    theme="colored"
                />
                <Modal.Root
                    open={action === 'open_contact_form'}
                    onClose={handleContactFormClose}
                >
                    <Modal.Heading
                        title="Let's get in touch!"
                        description="I'll reply back in less than 24 hours, that's a promise."
                    />
                    <Modal.Content>
                        <ContactForm />
                    </Modal.Content>
                </Modal.Root>
            </body>
        </html>
    )
}
