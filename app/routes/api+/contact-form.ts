import { ActionFunctionArgs } from '@remix-run/cloudflare'
import { IContactFormSubmission } from '~/types/forms'
import DiscordApi from '~/api/discord'
import ServerUtils from '~/utils/server'
import TurnstileApi from '~/api/turnstile'

export async function action({ request, context }: ActionFunctionArgs) {
    const formData = await request.formData()
    const submission = Object.fromEntries(
        formData
    ) as unknown as IContactFormSubmission

    const notABot = await TurnstileApi.isTokenValid(submission.token, context)

    if (!notABot) {
        return ServerUtils.redirectWithToast(
            `${formData.get('pathname')}?formStatus=error`,
            'There was an error trying to send your message, please try again later.',
            'error',
            true
        )
    }

    await DiscordApi.sendMessage(
        `\n\n**${submission.email}** has written: \n\n*"${submission.message}"*`,
        context
    )

    return ServerUtils.redirectWithToast(
        `${formData.get('pathname')}?formStatus=success`,
        'Message sent, I will reply before 24 hours.',
        'success',
        true
    )
}
