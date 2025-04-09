import 'animate.css/animate.compat.css'
import { json, type MetaFunction } from '@remix-run/cloudflare'
import Page from '~/components/templates/Page'
import Hero from '~/components/pages/Home/Hero'
import Services from '~/components/pages/Home/Services'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '~/consts'
import { getBasicMetas } from '~/utils/metas'
import { getCacheControlHeader } from '~/utils/server'
import AboutMe from '~/components/pages/Home/AboutMe'
import Testimonials from '~/components/pages/Home/Testimonials'

export async function loader() {
    return json(
        {},
        {
            headers: {
                'Cache-Control': getCacheControlHeader('ONE_WEEK'),
            },
        }
    )
}

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: `${SITE_TITLE} - ${SITE_NAME}`,
            description: SITE_DESCRIPTION,
        }),
        {},
    ]
}

export default function Home() {
    return (
        <Page>
            <Hero />
            <Services />
            <AboutMe />
            <Testimonials />
        </Page>
    )
}
