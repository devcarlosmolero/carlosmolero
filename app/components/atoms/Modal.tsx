import { X } from 'lucide-react'
import {
    Fragment,
    ReactNode,
    useState,
    createContext,
    useContext,
    useEffect,
} from 'react'

interface ModalContextType {
    close: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used inside Modal.Root')
    }
    return context
}

function Overlay({ visible }: { visible: boolean }) {
    return (
        <div
            className={`fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-base-primary transition-opacity duration-300 ${
                visible ? 'opacity-50' : 'opacity-0'
            }`}
        ></div>
    )
}

function Root({
    children,
    open,
    onClose,
}: {
    children: ReactNode
    open: boolean
    onClose?: () => void
}) {
    const [isOpen, setIsOpen] = useState(open)
    const [isVisible, setIsVisible] = useState(open)

    function handleClose() {
        setIsVisible(false)
        setTimeout(() => {
            setIsOpen(false)
            onClose?.()
        }, 300)
    }

    useEffect(() => {
        if (open) {
            setIsOpen(true)
            setTimeout(() => setIsVisible(true), 10)
        } else {
            handleClose()
        }
    }, [open])

    return (
        <ModalContext.Provider value={{ close: handleClose }}>
            {isOpen && (
                <Fragment>
                    <Overlay visible={isVisible} />
                    <div className="fixed bottom-0 left-0 right-0 top-0 z-30 flex items-center justify-center">
                        <div
                            className={`m-5 flex w-full max-w-lg flex-col gap-y-5 rounded-xl border border-border-main bg-base-secondary p-5 ${
                                isVisible
                                    ? 'modal-content-enter'
                                    : 'modal-content-exit'
                            }`}
                        >
                            {children}
                        </div>
                    </div>
                </Fragment>
            )}
        </ModalContext.Provider>
    )
}

function Heading({
    title,
    description,
}: {
    title: string
    description: string
}) {
    const { close } = useModal()

    return (
        <div className="space-y-1">
            <h2 className="flex items-center gap-5 py-1 text-start text-2xl font-bold text-text-two">
                <p className="w-full">{title}</p>
                <button
                    onClick={() => close()}
                    className="rounded-full border border-border-main p-2 text-text-three hover:opacity-70"
                >
                    <X className="size-4" />
                </button>
            </h2>
            <p className="text-text-one">{description}</p>
        </div>
    )
}

function Content({ children }: { children: ReactNode }) {
    return <div>{children}</div>
}

const Modal = {
    Root,
    Overlay,
    Heading,
    Content,
}

export default Modal
