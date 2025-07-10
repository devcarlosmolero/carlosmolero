export interface IContentfulFilters {
    contentType: string
    where?: string
    select?: string[]
    order?: string
    limit?: number
}

export interface IPost {
    seoTitle: string
    seoDescription: string
    content: string
    headerImg: any
    headerImgUrl?: string
    categories: string[]
    createdAt?: string
    updatedAt?: string
    formattedCreatedAt?: string
    formattedUpdatedAt?: string
    readingTime?: string
    hookTitle?: string
    hookDescription?: string
    slug: string
    sections?: { id: string; text: string; level: number }[]
}

export interface ICaseStudy {
    seoTitle: string
    seoDescription: string
    content: string
    detailsTimeFrame: string
    detailsRoles: string
    detailsInvolvement: string
    context: string
    interview: string
    challenge: string
    createdAt?: string
    updatedAt?: string
    goal: string
    video: any
    videoUrl?: string
    headerImg: any
    headerImgUrl?: string
    imgCarousel: any
    imgCarouselUrls: string[]
    beforeChallengeImgIndex: number
    afterChallengeImgIndex: number
    videoPreview: boolean
    formattedCreatedAt?: string
    formattedUpdatedAt?: string
    introduction?: string
    slug: string
    ready: boolean
}
