import Button from '~/components/atoms/Button'
import { Mail, MoveRight } from 'lucide-react'
import ImageKitImage from '~/components/atoms/ImageKitImage'
import FloatingArrows from './FloatingArrows'

import '../assets/hero.css'

export default function Hero() {
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
                        I Don&apos;t Just Code,
                        <br className="hidden md:block" />
                        <span className="font-playfair font-extralight italic tracking-tighter">
                            I Strategize & Build
                        </span>
                    </h1>

                    <p className="text-center text-lg text-text-on-primary md:text-start">
                        <b>
                            You won&apos;t find a &quot;code monkey&quot; here
                        </b>
                        . Instead, you&apos;ll work with someone who can tackle
                        your digital project from business strategy to design
                        and all the way through technical development.
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
                    <FloatingArrows />
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
