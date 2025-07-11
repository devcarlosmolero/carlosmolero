import { AppLoadContext } from '@remix-run/cloudflare'
import { ICaseStudy, IContentfulFilters } from '~/types/contentful'
import Contentful from './contentful'
import { format } from 'date-fns'

async function appendImgCarouselUrls(
    caseStudies: ICaseStudy[],
    context: AppLoadContext
) {
    const result = await Promise.all(
        caseStudies.map(async (caseStudy) => {
            const imgCarouselUrls = []
            for (const imageCarouselObject of caseStudy?.imgCarousel || []) {
                imgCarouselUrls.push(
                    await Contentful.getAssetUrl(
                        imageCarouselObject.sys.id,
                        context
                    )
                )
            }
            return {
                ...caseStudy,
                imgCarouselUrls,
            }
        })
    )

    return result || []
}

async function appendVideoUrl(
    caseStudies: ICaseStudy[],
    context: AppLoadContext
) {
    const result = await Promise.all(
        caseStudies.map(async (caseStudy) => {
            if (caseStudy?.video) {
                const videoUrl = await Contentful.getAssetUrl(
                    caseStudy.video.sys.id,
                    context
                )
                return {
                    ...caseStudy,
                    videoUrl,
                }
            }

            return caseStudy
        })
    )

    return result || []
}

async function appendHeaderImgUrls(
    caseStudies: ICaseStudy[],
    context: AppLoadContext
) {
    const result = await Promise.all(
        caseStudies.map(async (caseStudy) => {
            const headerImgUrl = await Contentful.getAssetUrl(
                caseStudy.headerImg.sys.id,
                context
            )
            return {
                ...caseStudy,
                headerImgUrl,
            }
        })
    )

    return result || []
}

function createApi(filters: IContentfulFilters, context: AppLoadContext) {
    const state = {
        filters,
        appendImageCarouselUrls: false,
        appendHeaderImgUrls: false,
        appendVideoUrl: false,
        formatDates: false,
    }

    const api = {
        formatDates() {
            state.formatDates = true
            return api
        },
        appendImgCarouselUrls() {
            state.appendImageCarouselUrls = true
            return api
        },
        appendHeaderImgUrls() {
            state.appendHeaderImgUrls = true
            return api
        },
        appendVideoUrl() {
            state.appendVideoUrl = true
            return api
        },
        async get() {
            const response = await fetch(
                Contentful.composeUrl(
                    Contentful.composeFilters(state.filters),
                    context
                )
            )
            const { items } = (await response.json()) as any

            if (!items || items.length === 0) {
                return null
            }

            let caseStudies = items.map((item: any) => ({
                ...item.fields,
                createdAt: item.sys.createdAt,
                updatedAt: item.sys.updatedAt,
            })) as ICaseStudy[]

            if (state.appendVideoUrl) {
                caseStudies = await appendVideoUrl(caseStudies, context)
            }

            if (state.appendImageCarouselUrls) {
                caseStudies = await appendImgCarouselUrls(caseStudies, context)
            }

            if (state.appendHeaderImgUrls) {
                caseStudies = await appendHeaderImgUrls(caseStudies, context)
            }

            if (state.formatDates) {
                caseStudies = caseStudies.map((caseStudy) => ({
                    ...caseStudy,
                    formattedCreatedAt: format(
                        new Date(caseStudy.createdAt!),
                        'dd/MM/yyyy'
                    ),
                    formattedUpdatedAt: format(
                        new Date(caseStudy.updatedAt!),
                        'dd/MM/yyyy'
                    ),
                }))
            }

            return caseStudies
        },
    }

    return api
}

const CaseStudiesApi = {
    getBySlug(slug: string, context: AppLoadContext) {
        const filters = {
            contentType: 'caseStudy',
            where: `fields.slug=${slug}`,
        }

        return createApi(filters, context)
    },
    all(limit = 9, skip = 0, context: AppLoadContext) {
        const filters = {
            contentType: 'caseStudy',
            limit,
            skip,
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.video',
                'fields.imgCarousel',
                'fields.slug',
                'fields.ready',
                'sys',
            ],
            order: '-sys.createdAt',
        }

        return createApi(filters, context)
    },
}

export default CaseStudiesApi
