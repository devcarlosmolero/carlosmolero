import { useEffect, useState } from 'react'

export const useHydrated = () => {
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    return isHydrated
}
