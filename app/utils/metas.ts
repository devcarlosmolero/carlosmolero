import {
    IMAGE_KIT_BASE_URL,
    SITE_LINKEDIN_URL,
    SITE_PHONE_NUMBER,
    SITE_BASE_URL,
    SITE_EMAIL,
    SITE_NAME,
    SITE_X_HANDLE,
    SITE_X_URL,
} from '~/consts'
import { Post } from '~/types/contentful'
import { FAQJsonLdItem } from '~/types/metas'

export function getBasicMetas({
    title,
    description,
    image = `${IMAGE_KIT_BASE_URL}/tr:f-webp/meta.png`,
    robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
}: {
    title: string
    description: string
    image?: string
    robots?: string
}) {
    return [
        { title: title },
        {
            property: 'og:title',
            content: title,
        },
        {
            name: 'description',
            content: description,
        },
        {
            property: 'og:description',
            content: description,
        },
        {
            name: 'robots',
            content: robots,
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            property: 'og:image',
            content: image,
        },
        {
            property: 'og:image:width',
            content: '1366',
        },
        {
            property: 'og:image:height',
            content: '768',
        },
        {
            property: 'og:image:type',
            content: 'image/webp',
        },
        {
            property: 'og:site_name',
            content: SITE_NAME,
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: title,
        },
        {
            name: 'twitter:name',
            content: SITE_X_HANDLE,
        },
    ]
}

export function getBusinessJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Corporation',
        name: SITE_NAME,
        url: `${SITE_BASE_URL}/`,
        logo: `${IMAGE_KIT_BASE_URL}/tr:w-28,ar-1-1/favicon.png`,
        sameAs: [SITE_X_URL, SITE_LINKEDIN_URL],
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: SITE_PHONE_NUMBER,
                contactType: 'customer service',
                email: SITE_EMAIL,
                availableLanguage: 'es',
            },
        ],
    }
}

export function getHowToJsonLd({
    name,
    description,
    steps,
}: {
    name: string
    description: string
    steps: { text: string; name: string }[]
}) {
    return {
        '@context': 'https://schema.org/',
        '@type': 'HowTo',
        name,
        description,
        totalTime: 'PT60M',
        step: [
            ...steps.map(({ text, name }) => ({
                '@type': 'HowToStep',
                text,
                name,
            })),
        ],
    }
}

export function getArticleJsonLd(post: Post, postImageUrls: string[]) {
    return {
        '@context': 'https://schema.org/',
        '@type': 'article',
        headline: post.seoTitle,
        description: post.seoDescription,
        image: postImageUrls.map((url) => ({
            '@type': 'ImageObject',
            url: url,
            width: '1366',
            height: '768',
        })),
        author: {
            '@type': 'Corporation',
            name: SITE_NAME,
        },
        publisher: {
            '@type': 'Corporation',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${IMAGE_KIT_BASE_URL}/tr:w-28,ar-1-1/favicon.png`,
                width: '28',
                height: '28',
            },
        },
        datePublished: post.createdAt,
    }
}

export function getFaqsJsonLd(items: FAQJsonLdItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }
}
