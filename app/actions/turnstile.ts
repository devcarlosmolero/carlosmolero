import { AppLoadContext } from '@remix-run/cloudflare'

export async function isTurnstileTokenValid(
    token: string,
    context: AppLoadContext
) {
    try {
        const resp = await fetch(
            `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    response: token,
                    secret: context.cloudflare.env.TURNSTILE_SECRET,
                }),
            }
        )

        const result = (await resp.json()) as any
        return result.success
    } catch (e) {
        return false
    }
}
