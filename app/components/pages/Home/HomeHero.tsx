import Button from '~/components/atoms/Button'
import { Mail, MoveRight, MousePointer2 } from 'lucide-react'
import ImageKitImage from '~/components/atoms/ImageKitImage'
import { useEffect, useRef } from 'react'

import './HomeHero.css'

export default function HomeHero() {
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
        <section id="hero">
            <div className="grid gap-x-20 gap-y-10 lg:grid-cols-2">
                <div className="flex flex-col items-center gap-y-5 md:items-start">
                    <div className="flex w-fit items-center gap-x-3 rounded-full border border-border-main px-4 py-3 text-sm">
                        <div className="relative">
                            <div className="h-[10px] w-[10px] rounded-full bg-green-400"></div>
                            <div className="absolute top-0 h-[10px] w-[10px] animate-ping rounded-full bg-green-400 opacity-75"></div>
                        </div>
                        <p className="text-text-two">Ready for Work</p>
                    </div>
                    <h1 className="heading-gradient py-1 text-center text-5xl md:text-start md:text-6xl">
                        Your Digital Product <br className="hidden md:block" />
                        With The Right Guidance
                    </h1>
                    <p className="text-center text-lg text-text-on-primary md:text-start">
                        It has never been easier to create digital products, but
                        creating them well? That&apos;s a whole different
                        ballgame. Stay away from the noise and let me provide
                        you with a clear vision and strategy to lead your
                        digital project to success.
                    </p>
                    <div className="mt-3 flex w-full flex-col items-center gap-x-0 gap-y-3 md:flex-row md:gap-0">
                        <Button
                            asLink
                            to="#portfolio"
                            variant="primary"
                            hasIcon
                        >
                            View Portfolio
                            <MoveRight className="size-6" />
                        </Button>
                        <Button
                            asLink
                            to="mailto:hi@carlosmolero.com"
                            variant="ghost"
                            hasIcon
                        >
                            <Mail className="size-6 text-text-one" />
                            hi@carlosmolero.com
                        </Button>
                    </div>
                </div>
                <div className="relative flex w-full items-center justify-center">
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
                    <ImageKitImage
                        alt="Carlos Molero"
                        className="relative z-10 w-[80%] rounded-full grayscale"
                        src="/carlos-molero.jpeg"
                    />
                </div>
            </div>
        </section>
    )
}
