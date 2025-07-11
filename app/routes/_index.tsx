import {
    json,
    LoaderFunctionArgs,
    type MetaFunction,
} from '@remix-run/cloudflare'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '~/consts'
import MetaUtils from '~/utils/metas'
import ServerUtils from '~/utils/server'
import PostsApi from '~/api/posts'
import { useLoaderData } from '@remix-run/react'
import { IPost } from '~/types/contentful'
import LandingPage from '~/features/landing/components'

import 'animate.css/animate.compat.css'
import CaseStudiesApi from '~/api/caseStudies'

export async function loader({ context, request }: LoaderFunctionArgs) {
    const [
        last6Posts,
        notoriusClientsData,
        repositoriesData,
        testimonialsData,
        servicesData,
    ] = await Promise.all([
        PostsApi.latest(6, context).appendHeaderImgUrls().formatDates().get(),
        ServerUtils.loadYaml('/data/notorious-clients.yml', request),
        ServerUtils.loadYaml('/data/repositories.yml', request),
        ServerUtils.loadYaml('/data/testimonials.yml', request),
        ServerUtils.loadYaml('/data/services.yml', request),
    ])

    const caseStudiesData = await CaseStudiesApi.all(6, 0, context)
        .appendImgCarouselUrls()
        .appendVideoUrl()
        .get()

    return json(
        {
            posts: last6Posts,
            notoriusClientsData,
            caseStudiesData,
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

export default function Page() {
    const {
        posts,
        notoriusClientsData,
        caseStudiesData,
        repositoriesData,
        testimonialsData,
        servicesData,
    } = useLoaderData<typeof loader>()

    return (
        <LandingPage
            posts={posts as IPost[]}
            notoriusClientsData={notoriusClientsData}
            caseStudiesData={caseStudiesData ?? []}
            repositoriesData={repositoriesData}
            testimonialsData={testimonialsData}
            servicesData={servicesData}
        />
    )
}
