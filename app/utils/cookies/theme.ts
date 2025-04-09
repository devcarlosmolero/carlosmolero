import { createCookie } from '@remix-run/cloudflare'

export const themeCookie = createCookie('theme', {
    path: '/',
    maxAge: 31536000,
})
