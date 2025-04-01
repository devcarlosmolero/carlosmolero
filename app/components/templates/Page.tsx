import { ReactNode } from 'react'
import Container from './Container'
import PageInner from './PageInner'

export default function Page({
    children,
    className,
}: {
    children: ReactNode | ReactNode[]
    className?: string
}) {
    return (
        <div className="text-text-one">
            <Container>
                <PageInner className={className}>{children}</PageInner>
            </Container>
        </div>
    )
}
