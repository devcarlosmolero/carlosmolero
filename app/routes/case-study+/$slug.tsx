import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import Markdown from 'react-markdown'
import { Fragment } from 'react/jsx-runtime'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import CaseStudiesApi from '~/api/caseStudies'
import Container from '~/components/templates/Container'
import Page from '~/components/templates/Page'
import { ICaseStudy } from '~/types/contentful'
import MetaUtils from '~/utils/metas'

export async function loader({ request, context }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const slug = url.pathname.split('/')[2]

    const caseStudy = (await CaseStudiesApi.getBySlug(slug, context)
        .appendImageCarouselUrls()
        .appendHeaderImgUrls()
        .appendVideoUrl()
        .formatDates()
        .get())![0] as ICaseStudy

    return {
        caseStudy,
    }
}

// @ts-expect-error idk
export const meta: MetaFunction = (payload: {
    data: { caseStudy: ICaseStudy }
}) => {
    const { caseStudy } = payload.data

    return [
        ...MetaUtils.getBasic({
            title: `Case Study: ${caseStudy?.seoTitle}`,
            description: caseStudy?.seoDescription,
            image: caseStudy.headerImgUrl,
        }),
        [
            {
                'script:ld+json': [
                    MetaUtils.getArticleJsonLd(
                        caseStudy,
                        caseStudy.imageCarouselUrls || []
                    ),
                ],
            },
        ],
    ]
}

export default function CaseStudySlugPage() {
    const { caseStudy } = useLoaderData<typeof loader>()

    return (
        <Fragment>
            <div className="bg-base-secondary">
                <Container className="flex min-h-[300px] flex-col items-center justify-center space-y-5">
                    <h1 className="heading-gradient py-1 text-center text-4xl md:text-6xl">
                        {caseStudy.seoTitle}
                    </h1>
                    <div className="flex items-center justify-center">
                        <div className="flex w-fit max-w-[650px] items-center text-center text-lg text-text-one">
                            <i>&quot;{caseStudy.seoDescription}&quot;</i>
                        </div>
                    </div>
                </Container>
            </div>
            <Page>
                <div className="mt-0 flex flex-col items-center md:mt-12 md:flex-row">
                    <div className="w-full space-y-12 md:space-y-20">
                        <h2 className="text-2xl text-text-three md:text-4xl">
                            {caseStudy.introduction}
                        </h2>
                        <div className="flex flex-col items-start justify-center gap-x-20 gap-y-12 md:flex-row">
                            <div className="space-y-5 md:w-[50%]">
                                <h3 className="text-3xl text-text-three md:text-4xl">
                                    Interview
                                </h3>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: caseStudy.interview.replaceAll(
                                            '~',
                                            '<br/><br/>'
                                        ),
                                    }}
                                    className="text-lg"
                                />
                            </div>
                            <div className="space-y-5 md:w-[50%]">
                                <h4 className="text-2xl text-text-three md:text-3xl">
                                    Details
                                </h4>
                                <div className="space-y-3">
                                    <p className="text-lg">
                                        <b>Time Frame:</b>{' '}
                                        {caseStudy.detailsTimeFrame}
                                    </p>
                                    <p className="text-lg">
                                        <b>Role:</b> {caseStudy.detailsRoles}
                                    </p>
                                    <p className="text-lg">
                                        <b>Involvement:</b>{' '}
                                        {caseStudy.detailsInvolvement}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <img
                            className="rounded-md"
                            alt={caseStudy.seoTitle}
                            src={`https:${caseStudy.imageCarouselUrls[caseStudy.beforeChallengeImageIndex]}`}
                        />
                        <div className="flex flex-col items-start justify-center gap-x-20 gap-y-12 md:flex-row">
                            <div className="space-y-5 md:w-[50%]">
                                <h3 className="text-3xl text-text-three md:text-4xl">
                                    Goal
                                </h3>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: caseStudy.goal.replaceAll(
                                            '~',
                                            '<br/><br/>'
                                        ),
                                    }}
                                    className="text-lg"
                                />
                            </div>
                            <div className="space-y-5 md:w-[50%]">
                                <h3 className="text-3xl text-text-three md:text-4xl">
                                    Challenges
                                </h3>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: caseStudy.challenge.replaceAll(
                                            '~',
                                            '<br/><br/>'
                                        ),
                                    }}
                                    className="text-lg"
                                />
                            </div>
                        </div>
                        <img
                            className="rounded-md"
                            alt={caseStudy.seoTitle}
                            src={`https:${caseStudy.imageCarouselUrls[caseStudy.afterChallengeImageIndex]}`}
                        />
                        <article className="prose prose-dark w-full !max-w-none prose-h2:mb-5 prose-h2:text-4xl prose-h2:font-normal prose-h2:text-text-three prose-p:text-lg prose-img:w-full prose-img:rounded-md [&_h2:first-of-type]:mt-0">
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeSlug, rehypeRaw]}
                            >
                                {caseStudy.content}
                            </Markdown>
                        </article>
                    </div>
                </div>
            </Page>
        </Fragment>
    )
}
