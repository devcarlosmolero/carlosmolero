import Formatters from '~/utils/formatters'

export default function AdminSalesAnnualSummaryCards({
    total2024,
    total2025,
}: {
    total2024: number
    total2025: number
}) {
    return (
        <div className="grid grid-cols-2 gap-5">
            <div className="rounded-md border border-border-main bg-base-primary p-5">
                <h3 className="text-sm font-medium text-blue-300">
                    2024 Total
                </h3>
                <p className="mt-1 text-2xl font-bold text-blue-200">
                    {Formatters.formatCurrency(total2024)}
                </p>
            </div>
            <div className="rounded-md border border-border-main bg-base-primary p-5">
                <h3 className="text-sm font-medium text-orange-300">
                    2025 Total
                </h3>
                <p className="mt-1 flex flex-col text-2xl font-bold text-orange-200 md:flex-row">
                    {Formatters.formatCurrency(total2025)}
                    <span
                        className={`ml-2 text-sm ${total2025 >= total2024 ? 'text-green-300' : 'text-red-300'}`}
                    >
                        ({total2025 >= total2024 ? '+' : ''}
                        {(((total2025 - total2024) / total2024) * 100).toFixed(
                            1
                        )}
                        %)
                    </span>
                </p>
            </div>
        </div>
    )
}
