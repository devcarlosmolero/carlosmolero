export interface INotionRowsResponse {
    object: 'list'
    next_cursor: string | null
    has_more: boolean
    type: 'page_or_database'
    results: INotionRow[]
    page_or_database: Record<string, any>
    request_id: string
}

export interface INotionRow {
    object: 'page'
    id: string
    created_time: string
    last_edited_time: string
    created_by: any
    last_edited_by: any
    cover: null
    icon: any | null
    parent: any
    archived: boolean
    in_trash: boolean
    properties: any
    url: string
    public_url: string | null
}
