import { createContext, useContext, useState, ReactNode } from 'react'

type ContactModalContextType = {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(
    undefined
)

export function ContactModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return (
        <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </ContactModalContext.Provider>
    )
}

export function useContactModalContext() {
    const context = useContext(ContactModalContext)

    if (context === undefined) {
        throw new Error(
            'useContactModalContext must be used within a ContactModalProvider'
        )
    }

    return context
}
