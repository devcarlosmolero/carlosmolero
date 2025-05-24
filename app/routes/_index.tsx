import {
    json,
    LoaderFunctionArgs,
    type MetaFunction,
} from '@remix-run/cloudflare'
import Page from '~/components/templates/Page'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '~/consts'
import MetaUtils from '~/utils/metas'
import HomePage from '~/components/pages/Home'
import ServerUtils, { loadYaml } from '~/utils/server'
import Posts from '~/actions/posts'
import { useLoaderData } from '@remix-run/react'
import { Post } from '~/types/contentful'

import 'animate.css/animate.compat.css'

export async function loader({ context, request }: LoaderFunctionArgs) {
    const [
        last6Posts,
        notoriusClientsData,
        conceptsData,
        repositoriesData,
        testimonialsData,
        servicesData,
    ] = await Promise.all([
        Posts.latest(6, context).appendHeaderImgUrls().formatDates().get(),
        loadYaml('/data/notorious-clients.yml', request),
        loadYaml('/data/concepts.yml', request),
        loadYaml('/data/repositories.yml', request),
        loadYaml('/data/testimonials.yml', request),
        loadYaml('/data/services.yml', request),
    ])

    return json(
        {
            posts: last6Posts,
            notoriusClientsData,
            conceptsData,
            repositoriesData,
            testimonialsData,
            servicesData,
        },
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
    const {
        posts,
        notoriusClientsData,
        conceptsData,
        repositoriesData,
        testimonialsData,
        servicesData,
    } = useLoaderData<typeof loader>()

    return (
        <Page>
            <HomePage.Hero />
            <HomePage.Services servicesData={servicesData} />
            <HomePage.Portfolio
                notoriousClientsData={notoriusClientsData}
                conceptsData={conceptsData}
                repositoriesData={repositoriesData}
            />
            <HomePage.Testimonials testimonialsData={testimonialsData} />
            <HomePage.Posts posts={posts as Post[]} />
        </Page>
    )
}
