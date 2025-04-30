import { ReactNode } from 'react'
import { cn } from '~/lib/utils'

export default function Card({
    children,
    className = '',
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div
            className={cn('w-full rounded-xl bg-base-secondary p-5', className)}
        >
            {children}
        </div>
    )
}
