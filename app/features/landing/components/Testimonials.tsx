import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Card from '~/components/templates/Card'
import { useEmblaPrevNextButtons } from '~/hooks/useEmblaPrevNextButtons'

export default function Testimonials({
    testimonialsData,
}: {
    testimonialsData: any[]
}) {
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
            <div className="embla gradient-content" ref={emblaRef}>
                <div className="embla__container">
                    {testimonialsData.map((testimonial, index) => (
                        <div
                            className="embla__slide"
                            key={`testimonial-${index}`}
                        >
                            <TestimonialItem
                                name={testimonial.name}
                                company={testimonial.company}
                                jobTitle={testimonial.jobTitle}
                                src={testimonial.src}
                                testimonial={testimonial.testimonial}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla__controls flex justify-center">
                <div className="embla__buttons flex items-center gap-2">
                    <button
                        className="rounded-full bg-base-secondary p-2 hover:bg-base-tertiary hover:text-text-on-tertiary"
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        className="rounded-full bg-base-secondary p-2 hover:bg-base-tertiary hover:text-text-on-tertiary"
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
        <Card className="h-full space-y-5 p-[20px] md:p-[50px]">
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
                <p className="mt-5 text-lg text-text-on-primary">
                    &quot;{testimonial}&quot;
                </p>
            </div>
        </Card>
    )
}
