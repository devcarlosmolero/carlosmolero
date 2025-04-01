import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useEmblaPrevNextButtons } from '~/hooks/useEmblaPrevNextButtons'

export default function Testimonials() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        watchDrag: false,
    })

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = useEmblaPrevNextButtons(emblaApi)

    return (
        <section id="testimonials" className="space-y-8">
            <h2 className="heading-gradient py-1 text-center text-4xl md:text-start md:text-5xl">
                Testimonials
            </h2>
            <div className="embla gradient-border" ref={emblaRef}>
                <div className="embla__container gradient-content">
                    <div className="embla__slide">
                        <TestimonialItem
                            name="Yanko Antonio"
                            company="WizHelp"
                            jobTitle="Founder"
                            src="https://media.licdn.com/dms/image/v2/D4D03AQEbUk4qrq2YmQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1690973043938?e=1749081600&v=beta&t=Y69BlcMdohKn__mCsyyog004_jsBLoNCsCikj5OHcvQ"
                            testimonial="Carlos executed as requested our web design migration to Framer, well organized one-pager, and helped us craft the specific sections we needed. Will repeat in the future once we expand our offering. Thanks Carlos!"
                        />
                    </div>
                    <div className="embla__slide">
                        <TestimonialItem
                            name="Jacinto"
                            company="TripleJSoftware"
                            jobTitle="CEO"
                            src="https://dam.malt.com/a51e9289-5433-43e5-a1d0-72913147f39f?gravity=face&func=crop&w=80&h=80&force_format=png?gravity=face&func=crop&w=80&h=80&force_format=png"
                            testimonial="Carlos has done a great job, with very good communication and meeting deadlines. We will definitely work with him again."
                        />
                    </div>
                    <div className="embla__slide">
                        <TestimonialItem
                            name="Adrian Ward"
                            company="FenwayDataGroup"
                            jobTitle="CTO"
                            src="https://dam.malt.com/cc6810db-7f78-477f-9bb1-2de2bd1290d5?gravity=face&func=crop&w=80&h=80&force_format=png?gravity=face&func=crop&w=80&h=80&force_format=png"
                            testimonial="Carlos was patient, kind and behaved like an expert. He was more involved with my project than I expected, I am sure I will work with him again in the future."
                        />
                    </div>
                    <div className="embla__slide">
                        <TestimonialItem
                            name="Jordi"
                            company="Nyxidiom"
                            jobTitle="CEO"
                            src="https://dam.malt.com/cc484a33-f6ff-46d7-9e17-78f437f4ce9c?gravity=face&func=crop&w=80&h=80&force_format=png?gravity=face&func=crop&w=80&h=80&force_format=png"
                            testimonial="Carlos is an excellent developer. He was able to accomplish a wide variety of complex tasks, with very good communication throughout the course of the project."
                        />
                    </div>
                </div>
            </div>
            <div className="embla__controls flex justify-center">
                <div className="embla__buttons flex items-center gap-2">
                    <button
                        className="rounded-full bg-[#141514] p-2 hover:bg-base-tertiary hover:text-text-on-tertiary"
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        className="rounded-full bg-[#141514] p-2 hover:bg-base-tertiary hover:text-text-on-tertiary"
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </section>
    )
}

function TestimonialItem({
    name,
    jobTitle,
    company,
    src,
    testimonial,
}: {
    name: string
    jobTitle: string
    company: string
    src: string
    testimonial: string
}) {
    return (
        <div className="h-full space-y-5 rounded-md bg-[#141514] p-[20px] md:p-[50px]">
            <div className="flex">
                <div className="w-full">
                    <h3 className="text-2xl text-text-two">{name}</h3>
                    <p className="text-text-on-primary">
                        {jobTitle}
                        <span> @{company}</span>
                    </p>
                </div>
                <img
                    className="h-[80px] w-[80px] rounded-full"
                    src={src}
                    alt={name}
                />
            </div>
            <div>
                <div>
                    <Quote className="size-8 text-text-on-primary" />
                </div>
                <p className="mt-5 text-text-on-primary">"{testimonial}"</p>
            </div>
        </div>
    )
}
