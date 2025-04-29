import { AppLoadContext, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'
import Notion from '~/actions/notion'
import Page from '~/components/templates/Page'
import { Buffer } from 'node:buffer'
import AdminQuaterlyTable from '~/components/pages/Admin/AdminQuaterlyTable'
import Formatters from '~/utils/formatters'
import AdminAnnualSummaryCards from '~/components/pages/Admin/AdminAnnualSumaryCards'
import AdminCardHeader from '~/components/pages/Admin/AdminCardHeader'

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

function transformNotionDataForChart(notionRows: any[]) {
    const data2024: { [key: string]: number } = {}
    const data2025: { [key: string]: number } = {}

    notionRows.results.forEach((row) => {
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

    const mergedData = chartData2024.reduce((acc, item) => {
        const existing = acc.find((d) => d.name === item.name)
        if (existing) {
            existing.amount2024 = item.amount2024
        } else {
            acc.push(item)
        }
        return acc
    }, [])

    chartData2025.forEach((item) => {
        const existing = mergedData.find((d) => d.name === item.name)
        if (existing) {
            existing.amount2025 = item.amount2025
        } else {
            mergedData.push(item)
        }
    })

    const orderedData = ['Q1', 'Q2', 'Q3', 'Q4'].map((q) => {
        const found = mergedData.find((item) => item.name === q)
        return found || { name: q, amount2024: 0, amount2025: 0 }
    })

    return orderedData
}

export const headers = ({ loaderHeaders }: { loaderHeaders: Headers }) => {
    return loaderHeaders
}

export async function loader({ request, context }: LoaderFunctionArgs) {
    const authResult = isAuthorized(request, context)

    if (!authResult) {
        return new Response('Autenticación requerida', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Protegido"',
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        })
    }

    const rows = await Notion.getSalesDatabaseRows(context)
    return {
        chartData: transformNotionDataForChart(rows),
        allowed: authResult,
    }
}

export default function AdminDataPage() {
    const { chartData, allowed } = useLoaderData<typeof loader>()

    if (!allowed) {
        return <></>
    }

    const total2024 = chartData.reduce(
        (sum, item) => sum + (item.amount2024 || 0),
        0
    )
    const total2025 = chartData.reduce(
        (sum, item) => sum + (item.amount2025 || 0),
        0
    )

    const quarterlyComparison = chartData.map((item) => ({
        quarter: item.name,
        sales2024: item.amount2024,
        sales2025: item.amount2025,
        difference: (item.amount2025 || 0) - (item.amount2024 || 0),
        growthRate: item.amount2024
            ? (((item.amount2025 || 0) - (item.amount2024 || 0)) /
                  item.amount2024) *
              100
            : 0,
    }))

    const progressPercentage = total2024 > 0 ? (total2025 / total2024) * 100 : 0
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

                <div className="w-full rounded-xl bg-base-secondary p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-text-two">
                            {isAhead ? (
                                <span className="text-green-500">
                                    Target 2024 exceeded!
                                </span>
                            ) : (
                                <span>Progress towards 2024</span>
                            )}
                        </h2>
                        <span
                            className={`text-end text-sm font-medium ${isAhead ? 'text-green-500' : 'text-text-two'}`}
                        >
                            {Formatters.formatCurrency(total2025)} /{' '}
                            {Formatters.formatCurrency(total2024)}
                        </span>
                    </div>
                    <div className="h-4 w-full rounded-full border border-border-main bg-base-primary">
                        <div
                            className={`h-full rounded-full ${isAhead ? 'bg-green-500' : 'bg-text-one'}`}
                            style={{
                                width: `${isAhead ? 100 : progressPercentage}%`,
                            }}
                        ></div>
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-text-one">
                        <span>0%</span>
                        <span>100%</span>
                    </div>
                    {!isAhead && (
                        <div className="mt-2 text-sm">
                            <span className="font-medium text-text-one">
                                Missing:{' '}
                            </span>
                            <span className="font-bold text-white">
                                {Formatters.formatCurrency(remainingAmount)}
                            </span>

                            <span className="ml-2 text-red-300">
                                ({(100 - progressPercentage).toFixed(1)}%)
                            </span>
                        </div>
                    )}
                    {isAhead && (
                        <div className="mt-2 text-sm">
                            <span className="font-medium text-text-one">
                                Exceeded by:{' '}
                            </span>
                            <span className="text-green-500">
                                {Formatters.formatCurrency(
                                    Math.abs(remainingAmount)
                                )}
                            </span>
                            <span className="ml-2 text-green-300">
                                (+{(progressPercentage - 100).toFixed(1)}%)
                            </span>
                        </div>
                    )}
                </div>

                <div className="space-y-5 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
                    <div className="rounded-xl bg-base-secondary p-5 shadow-md">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-text-two">
                                Sales Trend
                            </h2>
                            <p className="text-text-one">
                                Comparative quarterly performance
                            </p>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={chartData}
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        bottom: 40,
                                    }}
                                >
                                    <CartesianGrid
                                        stroke="rgba(187, 186, 166, 0.2)"
                                        strokeDasharray="3 3"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        tick={{
                                            fontSize: 12,
                                            fill: '#bbbaa6',
                                        }}
                                        axisLine={{ stroke: '#bbbaa6' }}
                                        tickLine={{ stroke: '#bbbaa6' }}
                                    />
                                    <YAxis
                                        tick={{
                                            fontSize: 12,
                                            fill: '#bbbaa6',
                                        }}
                                        axisLine={{ stroke: '#d1d5db' }}
                                        tickLine={{ stroke: '#d1d5db' }}
                                        tickFormatter={(value) =>
                                            `$${value.toLocaleString()}`
                                        }
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#0e0f0f',
                                            border: 'rgba(187, 186, 166, 0.2)',
                                            borderRadius: '0.5rem',
                                            boxShadow:
                                                '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        }}
                                        formatter={(value: number) =>
                                            Formatters.formatCurrency(value)
                                        }
                                        labelFormatter={(label) =>
                                            `Trimestre: ${label}`
                                        }
                                    />
                                    <Legend
                                        wrapperStyle={{
                                            paddingTop: 20,
                                        }}
                                        formatter={(value) =>
                                            value === 'amount2024'
                                                ? '2024'
                                                : '2025'
                                        }
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="amount2024"
                                        name="amount2024"
                                        stroke="oklch(80.9% 0.105 251.813)"
                                        strokeWidth={2}
                                        dot={{
                                            r: 4,
                                            fill: 'oklch(80.9% 0.105 251.813)',
                                        }}
                                        activeDot={{
                                            r: 6,
                                            stroke: 'oklch(93.2% 0.032 255.585)',
                                            strokeWidth: 2,
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="amount2025"
                                        name="amount2025"
                                        stroke="oklch(83.7% 0.128 66.29)"
                                        strokeWidth={2}
                                        dot={{
                                            r: 4,
                                            fill: 'oklch(83.7% 0.128 66.29)',
                                        }}
                                        activeDot={{
                                            r: 6,
                                            stroke: 'oklch(95.4% 0.038 75.164)',
                                            strokeWidth: 2,
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="rounded-xl bg-base-secondary p-5 shadow-md">
                        <AdminCardHeader
                            title="Annual Summary"
                            description="Comparison of results"
                        />
                        <div className="space-y-5">
                            <AdminAnnualSummaryCards
                                total2024={total2024}
                                total2025={total2025}
                            />
                            <AdminQuaterlyTable
                                quarterlyComparison={quarterlyComparison}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}
