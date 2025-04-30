import { AppLoadContext, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import Notion from '~/actions/notion'
import Page from '~/components/templates/Page'
import { Buffer } from 'node:buffer'
import AdminSalesPage from '~/components/pages/Admin/sales'
import Mappers from '~/utils/mappers'
import { IChartData } from '~/types/sales'

const isAuthorized = (
    request: LoaderFunctionArgs['request'],
    context: AppLoadContext
) => {
    const header = request.headers.get('Authorization')
    if (!header || !header.startsWith('Basic ')) {
        console.error("'Authorization' header missing or invalid", header)
        return null
    }

    const base64 = header.replace('Basic ', '')
    let credentials
    try {
        credentials = Buffer.from(base64, 'base64').toString()
    } catch (e) {
        console.error(e)
        return null
    }

    const [username, password] = credentials.split(':')
    if (!username || !password) {
        console.error('Username or password missing', credentials)
        return null
    }

    const adminUsername = context.cloudflare.env.ADMIN_USERNAME ?? 'admin'
    const adminPassword = context.cloudflare.env.ADMIN_PASSWORD ?? 'admin'

    const isValid = username === adminUsername && password === adminPassword
    return isValid
}

export const headers = ({ loaderHeaders }: { loaderHeaders: Headers }) => {
    return loaderHeaders
}

export async function loader({ request, context }: LoaderFunctionArgs) {
    const authResult = isAuthorized(request, context)

    if (!authResult) {
        return new Response('Required Authentication', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Protected"',
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        })
    }

    const response = await Notion.getSalesDatabaseRows(context)
    return {
        chartData: Mappers.fromNotionSalesToChartData(response),
        allowed: authResult,
    }
}

export default function AdminDataPage() {
    const { chartData, allowed } = useLoaderData<any>()

    if (!allowed) {
        return <></>
    }

    const total2024 = Mappers.fromSalesChartDataToAnnualAmount(
        'amount2024',
        chartData as IChartData[]
    )
    const total2025 = Mappers.fromSalesChartDataToAnnualAmount(
        'amount2025',
        chartData as IChartData[]
    )
    const quarterlyComparison =
        Mappers.fromSalesChartDataToQuaterlyComparison(chartData)
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

                <AdminSalesPage.Percentage
                    total2024={total2024}
                    total2025={total2025}
                    isAhead={isAhead}
                    percentage={percentage}
                    remainingAmount={remainingAmount}
                />

                <div className="space-y-5 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
                    <div className="rounded-xl bg-base-secondary p-5 shadow-md">
                        <AdminSalesPage.CardHeader
                            title="Sales Trend"
                            description="Comparative quarterly performance"
                        />
                        <div className="h-80">
                            <AdminSalesPage.Chart chartData={chartData} />
                        </div>
                    </div>

                    <div className="rounded-xl bg-base-secondary p-5 shadow-md">
                        <AdminSalesPage.CardHeader
                            title="Annual Summary"
                            description="Comparison of results"
                        />
                        <div className="space-y-5">
                            <AdminSalesPage.AnnualSummaryCards
                                total2024={total2024}
                                total2025={total2025}
                            />
                            <AdminSalesPage.QuaterlyTable
                                quarterlyComparison={quarterlyComparison}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}
