import { useCallback, useEffect, useState } from 'react'

type UseAutoplayType = {
    autoplayIsPlaying: boolean
    onAutoplayButtonClick: (callback: () => void) => void
}

export const useAutoplay = (emblaApi: any): UseAutoplayType => {
    const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false)

    const onAutoplayButtonClick = useCallback(
        (callback: () => void) => {
            const autoplay = emblaApi?.plugins()?.autoplay as any
            if (!autoplay) return

            const resetOrStop = (
                autoplay.options.stopOnInteraction === false
                    ? autoplay.reset
                    : autoplay.stop
            ) as any

            resetOrStop()
            callback()
        },
        [emblaApi]
    )

    useEffect(() => {
        const autoplay = emblaApi?.plugins()?.autoplay as any
        if (!autoplay) return

        setAutoplayIsPlaying(autoplay.isPlaying())
        emblaApi
            .on('autoplay:play', () => setAutoplayIsPlaying(true))
            .on('autoplay:stop', () => setAutoplayIsPlaying(false))
            .on('reInit', () => setAutoplayIsPlaying(autoplay.isPlaying()))
    }, [emblaApi])

    return {
        autoplayIsPlaying,
        onAutoplayButtonClick,
    }
}
