import Formatters from '~/utils/formatters'

export default function AdminSalesQuaterlyTable({
    quarterlyComparison,
}: {
    quarterlyComparison: any
}) {
    return (
        <div className="overflow-x-auto rounded-md border border-border-main">
            <table className="min-w-full divide-y divide-border-main">
                <thead className="bg-base-primary">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-two">
                            Quarter
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-two">
                            2024
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-two">
                            2025
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-two">
                            Variation
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-background divide-y border-border-main">
                    {quarterlyComparison.map((item: any, index: number) => (
                        <tr
                            key={index}
                            className={'bg-background border-border-main'}
                        >
                            <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-text-three">
                                {item.quarter}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-sm text-blue-300">
                                {Formatters.formatCurrency(item.sales2024)}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-sm text-orange-300">
                                {Formatters.formatCurrency(item.sales2025)}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-sm">
                                <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.difference >= 0 ? 'text-green-300' : 'text-red-300'}`}
                                >
                                    {item.difference >= 0 ? '+' : ''}
                                    {Formatters.formatCurrency(item.difference)}
                                    <span className="ml-1">
                                        ({item.difference >= 0 ? '+' : ''}
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
    )
}
