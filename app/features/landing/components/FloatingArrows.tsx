import { MousePointer2 } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function FloatingArrows() {
    const arrowsContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const arrows =
            arrowsContainerRef.current?.querySelectorAll('.floating-arrow')
        if (!arrows) return

        arrows.forEach((arrow, index) => {
            const delay = index * 2
            const element = arrow as HTMLElement
            element.style.animationDelay = `${delay}s`
        })
    }, [])

    return (
        <div
            ref={arrowsContainerRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
        >
            <div className="floating-arrow absolute left-[15%] top-[5%] flex items-center">
                <span className="whitespace-nowrap rounded-md bg-[#FEFCE1] px-3 py-1 text-sm text-black">
                    Software Development
                </span>
                <MousePointer2 className="ml-1 size-5 rotate-90 fill-amber-400 text-amber-400" />
            </div>

            <div className="floating-arrow absolute bottom-[20%] right-[10%] flex items-center">
                <MousePointer2 className="mr-1 size-5 fill-amber-400 text-amber-400" />
                <span className="whitespace-nowrap rounded-md bg-[#FEFCE1] px-3 py-1 text-sm text-black">
                    UI Design
                </span>
            </div>

            <div className="floating-arrow absolute left-[10%] top-[55%] flex items-center">
                <span className="whitespace-nowrap rounded-md bg-[#FEFCE1] px-3 py-1 text-sm text-black">
                    Digital Strategy
                </span>
                <MousePointer2 className="ml-1 size-5 rotate-90 fill-amber-400 text-amber-400" />
            </div>
        </div>
    )
}
