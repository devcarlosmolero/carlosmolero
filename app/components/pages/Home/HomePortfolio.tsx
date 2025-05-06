import { MoveUpRight } from 'lucide-react'
import Card from '~/components/templates/Card'

export default function HomePortfolio() {
    return (
        <section id="portfolio" className="space-y-8 rounded-md">
            <h2 className="heading-gradient py-1 text-center text-4xl md:text-start md:text-5xl">
                Works
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
                <Card className="aspect-square group">
                    <div className="overflow-hidden rounded-md">
                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                        <video
                            loop
                            autoPlay
                            muted
                            playsInline
                            src="./babel.mp4"
                            className="h-full w-full rounded-md transition-all duration-200 group-hover:scale-105"
                        />
                    </div>
                    <div className="mt-8 space-y-3">
                        <div className="group flex cursor-pointer">
                            <div className="w-full">
                                <h4 className="text-3xl text-text-two">
                                    Babel
                                </h4>
                            </div>
                            <div>
                                <MoveUpRight className="size-6 text-text-three transition-all duration-200 group-hover:rotate-45 group-hover:text-text-two" />
                            </div>
                        </div>
                        <p className="text-lg text-text-one">
                            Form builder for language teachers.
                        </p>
                    </div>
                </Card>
            </div>
        </section>
    )
}
