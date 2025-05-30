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

export interface IQuaterlyComparisonItem {
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4'
    sales2024: number | undefined
    sales2025: number | undefined
    difference: number
    growthRate: number
}

export interface IChartData {
    name: string
    amount2024: number | undefined
    amount2025: number | undefined
}
