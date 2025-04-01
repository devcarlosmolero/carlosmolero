import { ActionFunctionArgs } from '@remix-run/cloudflare'
import { redirectWithToast } from '../../utils/server'
import { ContactFormSubmission } from '~/types/forms'
import { sendDiscordMessage } from '~/actions/discord'
import { isTurnstileTokenValid } from '~/actions/turnstile'

export async function action({ request, context }: ActionFunctionArgs) {
    const formData = await request.formData()
    const submission = Object.fromEntries(
        formData
    ) as unknown as ContactFormSubmission

    const notABot = await isTurnstileTokenValid(submission.token, context)

    if (!notABot) {
        return redirectWithToast(
            `${formData.get('pathname')}?formStatus=error`,
            'There was an error trying to send your message, please try again later.',
            'error',
            true
        )
    }

    await sendDiscordMessage(
        `\n\n🤖 **${submission.email}** has written: \n\n*"${submission.message}"*`,
        context
    )

    return redirectWithToast(
        `${formData.get('pathname')}?formStatus=success`,
        'Message sent, I will reply before 24 hours.',
        'success',
        true
    )
}
