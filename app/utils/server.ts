import {
    AppLoadContext,
    LoaderFunctionArgs,
    redirect,
} from '@remix-run/cloudflare'
import yaml from 'js-yaml'

function redirectWithToast(
    pathname: string,
    message: string,
    type: 'success' | 'error',
    alreadyHasParams = false
) {
    return redirect(
        `${pathname}${alreadyHasParams ? '&' : '?'}tm=${encodeURIComponent(message)}&tt=${encodeURIComponent(type)}`
    )
}

async function getCookie(
    cookie: string
    // request: LoaderFunctionArgs['request']
) {
    // const cookieHeader = request.headers.get('Cookie')

    switch (cookie) {
        default:
            return
    }
}

function getCacheControlHeader(
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

export async function loadYaml(
    filePath: string,
    request: LoaderFunctionArgs['request']
) {
    try {
        const url = new URL(filePath, request.url)
        const response = await fetch(url.toString())
        const yamlText = await response.text()
        return yaml.load(yamlText) as any[]
    } catch (error) {
        console.error(`Error loading YAML data from ${filePath}:`, error)
        return []
    }
}

const isHTTPAuthorized = (
    request: LoaderFunctionArgs['request'],
    context: AppLoadContext
) => {
    const header = request.headers.get('Authorization')
    if (!header || !header.startsWith('Basic ')) {
        console.error("'Authorization' header missing or invalid", header)
        return null
    }

    const base64 = header.replace('Basic ', '')
    let credentials
    try {
        credentials = Buffer.from(base64, 'base64').toString()
    } catch (e) {
        console.error(e)
        return null
    }

    const [username, password] = credentials.split(':')
    if (!username || !password) {
        console.error('Username or password missing', credentials)
        return null
    }

    const adminUsername = context.cloudflare.env.ADMIN_USERNAME ?? 'admin'
    const adminPassword = context.cloudflare.env.ADMIN_PASSWORD ?? 'admin'

    const isValid = username === adminUsername && password === adminPassword
    return isValid
}

const ServerUtils = {
    redirectWithToast,
    getCookie,
    getCacheControlHeader,
    isHTTPAuthorized,
    loadYaml,
}

export default ServerUtils
