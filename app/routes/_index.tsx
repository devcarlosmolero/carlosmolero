import 'animate.css/animate.compat.css'
import {
    json,
    LoaderFunctionArgs,
    type MetaFunction,
} from '@remix-run/cloudflare'
import Page from '~/components/templates/Page'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '~/consts'
import MetaUtils from '~/utils/metas'
import HomePage from '~/components/pages/Home'
import ServerUtils from '~/utils/server'
import Posts from '~/actions/posts'
import { useLoaderData } from '@remix-run/react'
import { Post } from '~/types/contentful'

export async function loader({ context }: LoaderFunctionArgs) {
    const last6Posts = await Posts.latest(6, context)
        .appendHeaderImgUrls()
        .formatDates()
        .get()

    return json(
        {
            posts: last6Posts,
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
    const { posts } = useLoaderData<typeof loader>()

    return (
        <Page>
            <HomePage.Hero />
            <HomePage.Services />
            <HomePage.Portfolio />
            <HomePage.Testimonials />
            <HomePage.Posts posts={posts as Post[]} />
        </Page>
    )
}
