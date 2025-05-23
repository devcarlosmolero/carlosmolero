import { INotionRowsResponse } from '~/types/notion'
import { ChartData, QuaterlyComparisonItem } from '~/types/sales'

function fromNotionSalesToChartData(response: INotionRowsResponse) {
    const data2024: { [key: string]: number } = {}
    const data2025: { [key: string]: number } = {}

    response.results.forEach((row) => {
        const amount = row.properties?.Amount?.number
        const saleDate = row.properties?.['Sale Date']?.date?.start

        if (amount !== undefined && saleDate) {
            const date = new Date(saleDate)
            const year = date.getFullYear()
            const month = date.getMonth()
            const quarter = Math.floor(month / 3) + 1
            const quarterKey = `Q${quarter}`

            if (year === 2024) {
                data2024[quarterKey] = (data2024[quarterKey] || 0) + amount
            } else if (year === 2025) {
                data2025[quarterKey] = (data2025[quarterKey] || 0) + amount
            }
        }
    })

    const chartData2024 = Object.entries(data2024)
        .sort(
            (a, b) => parseInt(a[0].substring(1)) - parseInt(b[0].substring(1))
        )
        .map(([name, amount]) => ({ name, amount2024: amount }))

    const chartData2025 = Object.entries(data2025)
        .sort(
            (a, b) => parseInt(a[0].substring(1)) - parseInt(b[0].substring(1))
        )
        .map(([name, amount]) => ({ name, amount2025: amount }))

    const mergedData = chartData2024.reduce((acc: any, item: any) => {
        const existing: any = acc.find((d: any) => d.name === item.name)
        if (existing) {
            existing.amount2024 = item.amount2024
        } else {
            acc.push(item)
        }
        return acc
    }, [])

    chartData2025.forEach((item) => {
        const existing = mergedData.find((d: any) => d.name === item.name)
        if (existing) {
            existing.amount2025 = item.amount2025
        } else {
            mergedData.push(item)
        }
    })

    const orderedData = ['Q1', 'Q2', 'Q3', 'Q4'].map((q) => {
        const found = mergedData.find((item: any) => item.name === q)
        return found || { name: q, amount2024: 0, amount2025: 0 }
    })

    return orderedData
}

function fromSalesChartDataToAnnualAmount(key: string, chartData: ChartData[]) {
    // @ts-expect-error idk
    return chartData.reduce((sum, item) => sum + (item[key] || 0), 0)
}

function fromSalesChartDataToQuaterlyComparison(chartData: ChartData[]) {
    return chartData.map(
        (item) =>
            ({
                quarter: item.name,
                sales2024: item.amount2024,
                sales2025: item.amount2025,
                difference: (item.amount2025 || 0) - (item.amount2024 || 0),
                growthRate: item.amount2024
                    ? (((item.amount2025 || 0) - (item.amount2024 || 0)) /
                          item.amount2024) *
                      100
                    : 0,
            }) as QuaterlyComparisonItem
    )
}

const Mappers = {
    fromNotionSalesToChartData,
    fromSalesChartDataToAnnualAmount,
    fromSalesChartDataToQuaterlyComparison,
}

export default Mappers
