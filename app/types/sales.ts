export interface QuaterlyComparisonItem {
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4'
    sales2024: number | undefined
    sales2025: number | undefined
    difference: number
    growthRate: number
}

export interface ChartData {
    name: string
    amount2024: number | undefined
    amount2025: number | undefined
}
