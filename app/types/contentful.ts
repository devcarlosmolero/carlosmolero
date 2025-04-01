export interface ContentfulFilters {
    contentType: string
    where?: string
    select?: string[]
    order?: string
    limit?: number
}

export interface Post {
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
    slug?: string
    sections?: { id: string; text: string; level: number }[]
}

export interface Project {
    seoTitle: string
    categories: string[]
    url: string
    successCaseSlug?: string
    img: any
    imgUrl: string
}
