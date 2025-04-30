import { AppLoadContext } from '@remix-run/cloudflare'
import { ContentfulFilters } from '~/types/contentful'

const CONFIG = {
    CDA: {
        BASE_URL: 'https://cdn.contentful.com',
    },
    CMA: {
        BASE_URL: 'https://api.contentful.com',
    },
}

function composeFilters({
    contentType,
    where,
    select,
    order,
    limit = 1,
}: ContentfulFilters) {
    let filtersQueryString = ''

    filtersQueryString += `&content_type=${contentType}`
    filtersQueryString += `&limit=${limit}`

    if (where && where.length > 0) {
        filtersQueryString += `&${where}`
    }

    if (select && select.length > 0) {
        filtersQueryString += `&select=${select?.join(',')}`
    }

    if (order && order.length > 0) {
        filtersQueryString += `&order=${order}`
    }

    console.log('[contentful]:', {
        contentType,
        where,
        select,
        order,
        limit,
    })

    return filtersQueryString
}

function composeUrl(filters: string, context: AppLoadContext) {
    const url = `${CONFIG.CDA.BASE_URL}/spaces/${context.cloudflare.env.CONTENTFUL_SPACE_ID}/entries?access_token=${context.cloudflare.env.CONTENTFUL_CDA_TOKEN}${filters}`
    return url
}

function composeSingleUrl(entryId: string, context: AppLoadContext) {
    const url = `${CONFIG.CDA.BASE_URL}/spaces/${context.cloudflare.env.CONTENTFUL_SPACE_ID}/environments/master/entries/${entryId}?access_token=${context.cloudflare.env.CONTENTFUL_CDA_TOKEN}`
    return url
}

function composeAssetUrl(assetId: string, context: AppLoadContext) {
    const url = `${CONFIG.CDA.BASE_URL}/spaces/${context.cloudflare.env.CONTENTFUL_SPACE_ID}/assets/${assetId}?access_token=${context.cloudflare.env.CONTENTFUL_CDA_TOKEN}`
    return url
}

async function getAssetUrl(assetId: string, context: AppLoadContext) {
    const response = await fetch(composeAssetUrl(assetId, context))
    const { fields } = (await response.json()) as any
    return fields.file.url as string
}

async function getEntryById(entryId: string, context: AppLoadContext) {
    const response = await fetch(composeSingleUrl(entryId, context))
    const { fields } = (await response.json()) as any
    return fields
}

const Contentful = {
    composeFilters,
    composeUrl,
    composeSingleUrl,
    getAssetUrl,
    getEntryById,
}

export default Contentful
