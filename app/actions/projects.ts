import { Project } from '~/types/contentful'
import {
    createContentfulFilters,
    createContentfulUrl,
    getAssetUrl,
} from './contentful'
import { AppLoadContext } from '@remix-run/cloudflare'

export async function getProjects(context: AppLoadContext) {
    const response = await fetch(
        createContentfulUrl(
            createContentfulFilters({
                contentType: 'project',
                limit: 100,
            }),
            context
        )
    )

    const { items } = (await response.json()) as any

    if (items && items.length > 0) {
        return items.map((item: any) => item.fields as Project)
    }

    return []
}

export async function appendImgUrlToProjects(
    projects: Project[],
    context: AppLoadContext
) {
    const result = await Promise.all(
        projects.map(async (project) => {
            const imgUrl = await getAssetUrl(project.img.sys.id, context)
            return {
                ...project,
                imgUrl,
            }
        })
    )

    return result || []
}
