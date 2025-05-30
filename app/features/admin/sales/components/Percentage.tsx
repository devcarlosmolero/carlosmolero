import { formatCurrency } from '../../utils'

export default function Percentage({
    total2024,
    total2025,
    isAhead,
    percentage,
    remainingAmount,
}: {
    total2024: number
    total2025: number
    isAhead: boolean
    percentage: number
    remainingAmount: number
}) {
    return (
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
                    {formatCurrency(total2025)} / {formatCurrency(total2024)}
                </span>
            </div>
            <div className="h-4 w-full rounded-full border border-border-main bg-base-primary">
                <div
                    className={`h-full rounded-full ${isAhead ? 'bg-green-500' : 'bg-text-one'}`}
                    style={{
                        width: `${isAhead ? 100 : percentage}%`,
                    }}
                ></div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-text-one">
                <span>0%</span>
                <span>100%</span>
            </div>
            {!isAhead && (
                <div className="mt-2 text-sm">
                    <span className="font-medium text-text-one">Missing: </span>
                    <span className="font-bold text-white">
                        {formatCurrency(remainingAmount)}
                    </span>

                    <span className="ml-2 text-red-300">
                        ({(100 - percentage).toFixed(1)}%)
                    </span>
                </div>
            )}
            {isAhead && (
                <div className="mt-2 text-sm">
                    <span className="font-medium text-text-one">
                        Exceeded by:{' '}
                    </span>
                    <span className="text-green-500">
                        {formatCurrency(Math.abs(remainingAmount))}
                    </span>
                    <span className="ml-2 text-green-300">
                        (+{(percentage - 100).toFixed(1)}%)
                    </span>
                </div>
            )}
        </div>
    )
}
