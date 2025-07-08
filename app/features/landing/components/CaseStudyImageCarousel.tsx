import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useRef } from 'react'
import { useAutoplay } from '~/hooks/useEmblaAutoPlay'
import { useAutoplayProgress } from '~/hooks/useEmblaAutoPlayProgress'
import { useEmblaPrevNextButtons } from '~/hooks/useEmblaPrevNextButtons'
import Autoplay from 'embla-carousel-autoplay'
import { ICaseStudy } from '~/types/contentful'

export default function CaseStudyImageCarousel({
    caseStudy,
}: {
    caseStudy: ICaseStudy
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            watchDrag: false,
        },
        [Autoplay({ playOnInit: true, delay: 3000 })]
    )
    const progressNode = useRef<HTMLDivElement>(null)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = useEmblaPrevNextButtons(emblaApi)

    const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
        useAutoplay(emblaApi)

    const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode)

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {caseStudy.imageCarouselUrls?.map((imageUrl, index) => (
                    <div
                        className="embla__single__slide !mx-0"
                        key={`case-study-image-${index}`}
                    >
                        <img
                            alt={caseStudy.seoTitle}
                            src={`https:${imageUrl}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
