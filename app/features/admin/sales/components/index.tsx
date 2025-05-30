import Page from '~/components/templates/Page'
import QuaterlyTable from './QuaterlyTable'
import AnnualSummaryCards from './AnnualSummaryCards'
import Chart from './Chart'
import CardHeader from './CardHeader'
import Percentage from './Percentage'
import { IChartData } from '../../types'
import {
    fromSalesChartDataToAnnualAmount,
    fromSalesChartDataToQuaterlyComparison,
} from '../../utils'

export default function AdminSalesPage({
    chartData,
    allowed,
}: {
    chartData: IChartData[]
    allowed: boolean
}) {
    if (!allowed) {
        return <></>
    }

    const total2024 = fromSalesChartDataToAnnualAmount(
        'amount2024',
        chartData as IChartData[]
    )
    const total2025 = fromSalesChartDataToAnnualAmount(
        'amount2025',
        chartData as IChartData[]
    )
    const quarterlyComparison =
        fromSalesChartDataToQuaterlyComparison(chartData)

    const percentage = total2024 > 0 ? (total2025 / total2024) * 100 : 0
    const remainingAmount = Math.abs(total2024 - total2025)
    const isAhead = total2025 >= total2024

    return (
        <Page>
            <div className="space-y-5">
                <div className="space-y-0">
                    <h1 className="heading-gradient py-1 text-center text-5xl md:text-start md:text-6xl">
                        Sales Metrics
                    </h1>
                    <p className="text-center text-lg text-text-on-primary md:text-start">
                        Quarterly Comparison 2024 / 2025
                    </p>
                </div>

                <Percentage
                    total2024={total2024}
                    total2025={total2025}
                    isAhead={isAhead}
                    percentage={percentage}
                    remainingAmount={remainingAmount}
                />

                <div className="space-y-5 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
                    <div className="rounded-xl bg-base-secondary p-5 shadow-md">
                        <CardHeader
                            title="Sales Trend"
                            description="Comparative quarterly performance"
                        />
                        <div className="h-80">
                            <Chart chartData={chartData} />
                        </div>
                    </div>

                    <div className="rounded-xl bg-base-secondary p-5 shadow-md">
                        <CardHeader
                            title="Annual Summary"
                            description="Comparison of results"
                        />
                        <div className="space-y-5">
                            <AnnualSummaryCards
                                total2024={total2024}
                                total2025={total2025}
                            />
                            <QuaterlyTable
                                quarterlyComparison={quarterlyComparison}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}
