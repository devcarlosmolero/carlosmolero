import { AppLoadContext, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { Home, X } from 'lucide-react'
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

const isAuthorized = (
    request: LoaderFunctionArgs['request'],
    context: AppLoadContext
) => {
    const header = request.headers.get('Authorization')

    if (!header || !header.startsWith('Basic ')) {
        return null
    }

    const base64 = header.replace('Basic ', '')
    let credentials
    try {
        credentials = Buffer.from(base64, 'base64').toString()
    } catch (e) {
        return null
    }

    const [username, password] = credentials.split(':')
    if (!username || !password) {
        return null
    }

    const adminUsername = context.cloudflare.env.ADMIN_USERNAME ?? 'admin'
    const adminPassword = context.cloudflare.env.ADMIN_PASSWORD ?? 'admin'

    console.log('adminUsername', adminUsername)
    console.log('adminPassword', adminPassword)
    console.log('username', username)
    console.log('password', password)

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

function formatCurrency(amount: number | undefined): string {
    return amount !== undefined
        ? `€${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : '-'
}

export default function AdminDataPage() {
    const { chartData, allowed } = useLoaderData<typeof loader>()

    if (!allowed) {
        return (
            <Page className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <X className="size-5 text-red-500" />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-800">
                        Access Forbidden
                    </h2>
                    <p className="text-gray-600">
                        You are not authorized to view this page.
                    </p>
                    <a href="/">
                        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <Home className="h-5 w-5" />
                            Go home
                        </button>
                    </a>
                </div>
            </Page>
        )
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

    const progressPercentage =
        total2024 > 0 ? Math.min(100, (total2025 / total2024) * 100) : 0
    const remainingAmount =
        total2024 - total2025 > 0 ? total2024 - total2025 : 0
    const isAhead = total2025 >= total2024

    return (
        <Page className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Dashboard de Ventas
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    Comparativa trimestral 2024 vs 2025
                </p>
            </div>

            <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {isAhead ? (
                            <span className="text-green-600">
                                ¡Objetivo 2024 superado!
                            </span>
                        ) : (
                            <span>Progreso para alcanzar 2024</span>
                        )}
                    </h2>
                    <span
                        className={`text-sm font-medium ${isAhead ? 'text-green-600' : 'text-blue-600'}`}
                    >
                        {formatCurrency(total2025)} /{' '}
                        {formatCurrency(total2024)}
                    </span>
                </div>
                <div className="h-4 w-full rounded-full bg-gray-200">
                    <div
                        className={`h-full rounded-full ${isAhead ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{
                            width: `${isAhead ? 100 : progressPercentage}%`,
                        }}
                    ></div>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-600">
                    <span>0%</span>
                    <span>100%</span>
                </div>
                {!isAhead && (
                    <div className="mt-2 text-sm">
                        <span className="font-medium text-gray-700">
                            Faltan:{' '}
                        </span>
                        <span className="text-blue-600">
                            {formatCurrency(remainingAmount)}
                        </span>
                        <span className="ml-2 text-gray-500">
                            ({(100 - progressPercentage).toFixed(1)}%)
                        </span>
                    </div>
                )}
                {isAhead && (
                    <div className="mt-2 text-sm">
                        <span className="font-medium text-gray-700">
                            Superado por:{' '}
                        </span>
                        <span className="text-green-600">
                            {formatCurrency(Math.abs(remainingAmount))}
                        </span>
                        <span className="ml-2 text-gray-500">
                            (+{(progressPercentage - 100).toFixed(1)}%)
                        </span>
                    </div>
                )}
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="rounded-xl bg-white p-6 shadow-md">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Tendencia de Ventas
                        </h2>
                        <p className="text-gray-500">
                            Evolución trimestral comparativa
                        </p>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 40,
                                }}
                            >
                                <CartesianGrid
                                    stroke="#f0f0f0"
                                    strokeDasharray="3 3"
                                />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                    axisLine={{ stroke: '#d1d5db' }}
                                    tickLine={{ stroke: '#d1d5db' }}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                    axisLine={{ stroke: '#d1d5db' }}
                                    tickLine={{ stroke: '#d1d5db' }}
                                    tickFormatter={(value) =>
                                        `$${value.toLocaleString()}`
                                    }
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.5rem',
                                        boxShadow:
                                            '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    }}
                                    formatter={(value: number) =>
                                        formatCurrency(value)
                                    }
                                    labelFormatter={(label) =>
                                        `Trimestre: ${label}`
                                    }
                                />
                                <Legend
                                    wrapperStyle={{ paddingTop: 20 }}
                                    formatter={(value) =>
                                        value === 'amount2024' ? '2024' : '2025'
                                    }
                                />
                                <Line
                                    type="monotone"
                                    dataKey="amount2024"
                                    name="amount2024"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: '#3b82f6' }}
                                    activeDot={{
                                        r: 6,
                                        stroke: '#1d4ed8',
                                        strokeWidth: 2,
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="amount2025"
                                    name="amount2025"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: '#10b981' }}
                                    activeDot={{
                                        r: 6,
                                        stroke: '#059669',
                                        strokeWidth: 2,
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-md">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Resumen Anual
                        </h2>
                        <p className="text-gray-500">
                            Comparación de resultados
                        </p>
                    </div>

                    <div className="mb-8 grid grid-cols-2 gap-4">
                        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                            <h3 className="text-sm font-medium text-blue-800">
                                2024 Total
                            </h3>
                            <p className="mt-1 text-2xl font-bold text-blue-600">
                                {formatCurrency(total2024)}
                            </p>
                        </div>
                        <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                            <h3 className="text-sm font-medium text-green-800">
                                2025 Total
                            </h3>
                            <p className="mt-1 text-2xl font-bold text-green-600">
                                {formatCurrency(total2025)}
                                <span
                                    className={`ml-2 text-sm ${total2025 >= total2024 ? 'text-green-600' : 'text-red-600'}`}
                                >
                                    ({total2025 >= total2024 ? '+' : ''}
                                    {(
                                        ((total2025 - total2024) / total2024) *
                                        100
                                    ).toFixed(1)}
                                    %)
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Trimestre
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-blue-600">
                                        2024
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-600">
                                        2025
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Variación
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {quarterlyComparison.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={
                                            index % 2 === 0
                                                ? 'bg-white'
                                                : 'bg-gray-50'
                                        }
                                    >
                                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                                            {item.quarter}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-blue-600">
                                            {formatCurrency(item.sales2024)}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-green-600">
                                            {formatCurrency(item.sales2025)}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.difference >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                            >
                                                {item.difference >= 0
                                                    ? '+'
                                                    : ''}
                                                {formatCurrency(
                                                    item.difference
                                                )}
                                                <span className="ml-1">
                                                    (
                                                    {item.difference >= 0
                                                        ? '+'
                                                        : ''}
                                                    {item.growthRate.toFixed(1)}
                                                    %)
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Page>
    )
}
