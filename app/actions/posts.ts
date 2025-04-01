import { ContentfulFilters, Post } from '~/types/contentful'
import {
    createContentfulFilters,
    createContentfulUrl,
    getAssetUrl,
} from './contentful'
import { format } from 'date-fns'
import { AppLoadContext } from '@remix-run/cloudflare'

async function appendHeaderImgUrls(posts: Post[], context: AppLoadContext) {
    const result = await Promise.all(
        posts.map(async (post) => {
            const headerImgUrl = await getAssetUrl(
                post.headerImg.sys.id,
                context
            )
            return {
                ...post,
                headerImgUrl,
            }
        })
    )

    return result || []
}

function createApi(filters: ContentfulFilters, context: AppLoadContext) {
    const state = {
        filters,
        appendHeaderImgUrls: false,
        formatDates: false,
    }

    const api = {
        appendHeaderImgUrls() {
            state.appendHeaderImgUrls = true
            return api
        },
        formatDates() {
            state.formatDates = true
            return api
        },
        async get() {
            const response = await fetch(
                createContentfulUrl(
                    createContentfulFilters(state.filters),
                    context
                )
            )
            const { items } = (await response.json()) as any

            if (!items || items.length === 0) {
                return null
            }

            let posts = items.map((item: any) => ({
                ...item.fields,
                createdAt: item.sys.createdAt,
                updatedAt: item.sys.updatedAt,
            })) as Post[]

            if (state.appendHeaderImgUrls) {
                posts = await appendHeaderImgUrls(posts, context)
            }

            if (state.formatDates) {
                posts = posts.map((post) => ({
                    ...post,
                    formattedCreatedAt: format(
                        new Date(post.createdAt!),
                        'dd/MM/yyyy'
                    ),
                    formattedUpdatedAt: format(
                        new Date(post.updatedAt!),
                        'dd/MM/yyyy'
                    ),
                }))
            }

            return posts
        },
    }

    return api
}

const Posts = {
    getBySlug(slug: string, context: AppLoadContext) {
        const filters = {
            contentType: 'post',
            where: `fields.slug=${slug}`,
        }

        return createApi(filters, context)
    },
    getRelatedByCategory(
        categories: string[],
        slug: string,
        context: AppLoadContext
    ) {
        const filters = {
            contentType: 'post',
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.headerImg',
                'fields.slug',
                'sys',
            ],
            limit: 5,
            where: `fields.categories[in]=${categories.join(',')}&fields.slug[ne]=${slug}`,
        }

        return createApi(filters, context)
    },
    async count(context: AppLoadContext) {
        const filters = {
            contentType: 'post',
            select: ['sys'],
        }

        const response = await fetch(
            createContentfulUrl(createContentfulFilters(filters), context)
        )
        const { total } = (await response.json()) as any
        return total
    },
    all(limit = 9, skip = 0, context: AppLoadContext) {
        const filters = {
            contentType: 'post',
            limit,
            skip,
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.slug',
                'fields.headerImg',
                'fields.categories',
                'sys',
            ],
            order: '-sys.createdAt',
        }

        return createApi(filters, context)
    },
    latest(limit = 6, context: AppLoadContext) {
        const filters = {
            contentType: 'post',
            limit,
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.slug',
                'fields.headerImg',
                'fields.categories',
                'sys',
            ],
            order: '-sys.createdAt',
        }

        return createApi(filters, context)
    },
}
export default Posts
