import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { IChartData } from '~/types/sales'
import Formatters from '~/utils/formatters'

export default function AdminSalesChart({
    chartData,
}: {
    chartData: IChartData[]
}) {
    return (
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
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#0e0f0f',
                        border: 'rgba(187, 186, 166, 0.2)',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                    formatter={(value: number) =>
                        Formatters.formatCurrency(value)
                    }
                    labelFormatter={(label) => `Trimestre: ${label}`}
                />
                <Legend
                    wrapperStyle={{
                        paddingTop: 20,
                    }}
                    formatter={(value) =>
                        value === 'amount2024' ? '2024' : '2025'
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
    )
}
