import { MoveUpRight } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

export default function ServiceCard({
    index,
    title,
    description,
}: {
    index: number
    title: string
    description: string
}) {
    return (
        <Fragment>
            <div className="group flex cursor-pointer">
                <div className="w-full">
                    <div className="w-fit rounded-md border border-border-main px-2 py-1 text-text-three group-hover:bg-base-quaternary group-hover:text-text-on-quaternary">
                        0{index}
                    </div>
                </div>
                <div>
                    <MoveUpRight className="size-6 text-text-three transition-all duration-200 group-hover:rotate-45 group-hover:text-text-two" />
                </div>
            </div>
            <div className="mt-8 space-y-5">
                <h3 className="text-3xl text-text-two md:text-4xl">{title}</h3>
                <p className="text-lg text-text-one">{description}</p>
            </div>
        </Fragment>
    )
}
