import 'animate.css/animate.compat.css'
import { json, type MetaFunction } from '@remix-run/cloudflare'
import Page from '~/components/templates/Page'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '~/consts'
import MetaUtils from '~/utils/metas'
import HomePage from '~/components/pages/Home'
import ServerUtils from '~/utils/server'

export async function loader() {
    return json(
        {},
        {
            headers: {
                'Cache-Control': ServerUtils.getCacheControlHeader('ONE_WEEK'),
            },
        }
    )
}

export const meta: MetaFunction = () => {
    return [
        ...MetaUtils.getBasic({
            title: `${SITE_TITLE} - ${SITE_NAME}`,
            description: SITE_DESCRIPTION,
        }),
        {},
    ]
}

export default function Home() {
    return (
        <Page>
            <HomePage.Hero />
            <HomePage.Services />
            <HomePage.Testimonials />
        </Page>
    )
}
