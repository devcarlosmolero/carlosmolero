import { Fragment } from 'react/jsx-runtime'
import cn from 'classnames'
import { Link } from '@remix-run/react'
import Button from '~/components/atoms/Button'
import ImageKitImage from '~/components/atoms/ImageKitImage'
import { useContactModal } from '~/contexts/contactModalContext'

export default function NavbarDrawer({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) {
    const { open: openContactModal } = useContactModal()
    return (
        <Fragment>
            <div
                role="button"
                tabIndex={-1}
                onKeyUp={() => {}}
                onClick={onClose}
                className={cn(
                    'fixed z-20 h-[100vh] w-full cursor-default bg-base-primary opacity-50 transition-opacity duration-500 lg:hidden',
                    isOpen && 'opacity-1',
                    !isOpen && 'hidden opacity-0'
                )}
            ></div>
            <div
                className={cn(
                    `fixed left-0 z-50 h-[100vh] bg-base-primary transition-all duration-500 lg:hidden`,
                    isOpen && 'opacity-1 w-[80%]',
                    !isOpen && 'w-[0%] opacity-0'
                )}
            >
                <div
                    className={cn(
                        'h-100 flex min-w-[300px] flex-col items-start justify-center gap-y-2 px-6 py-4 transition-opacity',
                        isOpen && 'opacity-1 w-[100%] duration-500',
                        !isOpen && 'hidden w-[0%] opacity-0 duration-0'
                    )}
                >
                    <Link
                        className="mb-3 flex items-center gap-x-2 text-xl text-text-two"
                        to="/"
                    >
                        <ImageKitImage
                            alt="logo"
                            className="w-[30px]"
                            src="/logo.png"
                        />
                        <div className="flex items-center gap-x-1">
                            <span className="font-medium">Carlos</span>
                            <span className="font-light">Molero</span>
                        </div>
                    </Link>
                    <Link
                        onClick={onClose}
                        className="nav-link"
                        to={'/#services'}
                    >
                        Services
                    </Link>
                    <Link
                        onClick={onClose}
                        className="nav-link"
                        to={'/#portfolio'}
                    >
                        Portfolio
                    </Link>
                    <Link
                        onClick={onClose}
                        className="nav-link"
                        to={'/#testimonials'}
                    >
                        Testimonials
                    </Link>
                    <button
                        onClick={() => {
                            openContactModal()
                            onClose()
                        }}
                        className="nav-link"
                    >
                        Say Hello
                    </button>
                    <Button
                        hasIcon
                        variant="primary"
                        className="mt-3 !py-2"
                        asLink
                        to="https://wa.link/4cmmvr"
                        props={
                            {
                                target: '_blank',
                                onClick: onClose,
                            } as React.LinkHTMLAttributes<HTMLLinkElement>
                        }
                    >
                        Hire Me
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}
