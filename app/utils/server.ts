import { LoaderFunctionArgs, redirect } from '@remix-run/cloudflare'
import { TTheme } from '~/types/theme'
import { themeCookie } from './cookies/theme'

export function redirectWithToast(
    pathname: string,
    message: string,
    type: 'success' | 'error',
    alreadyHasParams = false
) {
    return redirect(
        `${pathname}${alreadyHasParams ? '&' : '?'}tm=${encodeURIComponent(message)}&tt=${encodeURIComponent(type)}`
    )
}

export async function getTheme(request: LoaderFunctionArgs['request']) {
    const cookieTheme = await getCookie('theme', request)
    if (cookieTheme) {
        return cookieTheme as TTheme
    }

    const prefersDark = request.headers
        .get('Accept')
        ?.includes('prefers-color-scheme: dark')
    const theme = prefersDark ? 'dark' : 'light'
    return theme as TTheme
}

export async function getCookie(
    cookie: 'theme',
    request: LoaderFunctionArgs['request']
) {
    const cookieHeader = request.headers.get('Cookie')

    switch (cookie) {
        case 'theme':
            return await themeCookie.parse(cookieHeader)
        default:
            return
    }
}

export function getCacheControlHeader(
    duration: 'THREE_DAYS' | 'ONE_WEEK' | 'ONE_MONTH'
): string {
    let maxAge: number

    switch (duration) {
        case 'THREE_DAYS':
            maxAge = 60 * 60 * 24 * 3
            break
        case 'ONE_WEEK':
            maxAge = 60 * 60 * 24 * 7
            break
        case 'ONE_MONTH':
            maxAge = 60 * 60 * 24 * 30
            break
    }

    return `public, max-age=${maxAge}, s-maxage=${maxAge}`
}
