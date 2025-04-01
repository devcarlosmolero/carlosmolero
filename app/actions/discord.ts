import { AppLoadContext } from '@remix-run/cloudflare'

const CHANNEL_ID = '1356605330825416788'
const ENDPOINT = `https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`

export async function sendDiscordMessage(
    message: string,
    context: AppLoadContext
) {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bot ${context.cloudflare.env.DISCORD_BOT_TOKEN}`,
    }
    return fetch(ENDPOINT, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ content: message }),
    })
}
