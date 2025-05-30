import { createContext, useContext, useState, ReactNode } from 'react'

type ContactModalContextType = {
    isOpen: boolean
    open: () => void
    close: () => void
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(
    undefined
)

export function ContactModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return (
        <ContactModalContext.Provider value={{ isOpen, open, close }}>
            {children}
        </ContactModalContext.Provider>
    )
}

export function useContactModal() {
    const context = useContext(ContactModalContext)

    if (context === undefined) {
        throw new Error(
            'useContactModalContext must be used within a ContactModalProvider'
        )
    }

    return context
}
