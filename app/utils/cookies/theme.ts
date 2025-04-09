import { createCookie } from '@remix-run/node'

export const themeCookie = createCookie('theme', {
    path: '/',
    maxAge: 31536000,
})
