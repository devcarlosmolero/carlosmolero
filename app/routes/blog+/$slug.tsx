import Markdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Fragment } from 'react/jsx-runtime'
import { FakeBackgroundImagePrimitive } from '~/components/atoms/FakeBackgroundImagePrimitive'
import Page from '~/components/templates/Page'
import { Calendar } from 'lucide-react'
import ImageKitImage from '~/components/atoms/ImageKitImage'
import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { IPost } from '~/types/contentful'
import PostsApi from '~/api/posts'
import { useLoaderData } from '@remix-run/react'
import Container from '~/components/templates/Container'
import MetaUtils from '~/utils/metas'
import { useContactModal } from '~/contexts/contactModalContext'
import { useEffect } from 'react'
import hljs from 'highlight.js'

import 'highlight.js/styles/github-dark.css'
import './HighlightJsOverride.css'
import { getPostImageUrls } from '~/features/blog/utils'

export async function loader({ request, context }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const slug = url.pathname.split('/')[2]

    const post = (await PostsApi.getBySlug(slug, context)
        .appendHeaderImgUrls()
        .formatDates()
        .get())![0] as IPost

    return {
        post,
        postImageUrls: post
            ? [`https:${post.headerImgUrl}`, ...getPostImageUrls(post.content)]
            : [],
    }
}

// @ts-expect-error idk
export const meta: MetaFunction = (payload: {
    data: { post: IPost; postImageUrls: string[] }
}) => {
    const { post, postImageUrls } = payload.data

    return [
        ...MetaUtils.getBasic({
            title: post?.seoTitle,
            description: post?.seoDescription,
            image: `https:${post?.headerImgUrl}`,
        }),
        [
            {
                'script:ld+json': [
                    MetaUtils.getArticleJsonLd(post, postImageUrls),
                ],
            },
        ],
    ]
}

export default function BlogSlugPage() {
    const { post } = useLoaderData<typeof loader>()
    const { open: openContactModal } = useContactModal()

    useEffect(() => {
        const openContactModalLinkElement =
            document.getElementById('open-contact-modal')
        openContactModalLinkElement?.addEventListener('click', (e) => {
            e.preventDefault()
            openContactModal()
        })

        hljs.highlightAll()
    }, [])

    return (
        <Fragment>
            <div className="bg-base-secondary">
                <Container className="flex min-h-[400px] flex-col items-center justify-center space-y-5">
                    <div className="flex w-fit items-center gap-x-1 rounded-md border border-border-main px-2 py-1 text-text-one">
                        {post.categories[0]}
                    </div>
                    <h1 className="heading-gradient py-1 text-center text-4xl md:text-6xl">
                        {post.seoTitle}
                    </h1>
                </Container>
            </div>
            <Page>
                <div className="mt-12 flex flex-col items-center md:flex-row">
                    <div className="w-full space-y-5 md:w-[70%]">
                        <FakeBackgroundImagePrimitive.Container className="aspect-h-3 aspect-w-4 rounded-md">
                            <FakeBackgroundImagePrimitive.Image
                                className="rounded-md"
                                alt={post.seoTitle}
                                src={post.headerImgUrl!}
                            />
                        </FakeBackgroundImagePrimitive.Container>
                        <div className="flex items-center gap-5 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="size-5" />
                                <p>{post.formattedCreatedAt}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <ImageKitImage
                                    className="h-[25px] w-[25px] rounded-full grayscale"
                                    src="/carlos-molero.jpeg"
                                    alt="Author"
                                />
                                <p>Carlos Molero</p>
                            </div>
                            <div></div>
                        </div>
                        <p className="text-xl font-semibold">
                            {post.seoDescription}
                        </p>
                        <article className="prose prose-dark w-full !max-w-none prose-p:text-lg prose-img:w-full prose-img:rounded-md [&_h2:first-of-type]:mt-0">
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeSlug, rehypeRaw]}
                            >
                                {post.content}
                            </Markdown>
                        </article>
                    </div>
                    <div className="w-full md:w-[30%]"></div>
                </div>
            </Page>
        </Fragment>
    )
}
