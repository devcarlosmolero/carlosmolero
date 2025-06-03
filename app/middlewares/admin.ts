import { AppLoadContext } from '@remix-run/cloudflare'

export default function (request: Request, context: AppLoadContext) {
    const url = new URL(request.url)
    const pathname = url.pathname

    if (pathname.startsWith('/admin')) {
        const searchParams = url.searchParams
        const token = searchParams.get('token')
        if (!token || token !== context.cloudflare.env.ADMIN_TOKEN) {
            return false
        }

        return true
    }
}
