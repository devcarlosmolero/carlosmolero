import Button from '~/components/atoms/Button'
import { Mail, MoveRight } from 'lucide-react'
import ImageKitImage from '~/components/atoms/ImageKitImage'

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
                        Your Digital Product <br className="hidden md:block" />
                        With The Right Guidance
                    </h1>
                    <p className="text-center text-lg text-text-on-primary md:text-start">
                        It has never been easier to create digital products, but
                        creating them well? That's a whole different ballgame.
                        Stay away from the noise and let me provide you with a
                        clear vision and strategy to lead your digital project
                        to success.
                    </p>
                    <div className="mt-3 flex w-full flex-col items-center gap-x-0 gap-y-3 md:flex-row md:gap-0">
                        <Button asLink to="#contacto" variant="primary" hasIcon>
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
                <div className="flex w-full items-center justify-center">
                    <ImageKitImage
                        alt="Carlos Molero"
                        className="w-[80%] rounded-full grayscale"
                        src="/carlos-molero.jpeg"
                    />
                </div>
            </div>
        </section>
    )
}
