import { ActionFunctionArgs } from '@remix-run/cloudflare'
import { ContactFormSubmission } from '~/types/forms'
import Discord from '~/actions/discord'
import ServerUtils from '~/utils/server'
import Turnstile from '~/actions/turnstile'

export async function action({ request, context }: ActionFunctionArgs) {
    const formData = await request.formData()
    const submission = Object.fromEntries(
        formData
    ) as unknown as ContactFormSubmission

    const notABot = await Turnstile.isTokenValid(submission.token, context)

    if (!notABot) {
        return ServerUtils.redirectWithToast(
            `${formData.get('pathname')}?formStatus=error`,
            'There was an error trying to send your message, please try again later.',
            'error',
            true
        )
    }

    await Discord.sendMessage(
        `\n\n🤖 **${submission.email}** has written: \n\n*"${submission.message}"*`,
        context
    )

    return ServerUtils.redirectWithToast(
        `${formData.get('pathname')}?formStatus=success`,
        'Message sent, I will reply before 24 hours.',
        'success',
        true
    )
}
