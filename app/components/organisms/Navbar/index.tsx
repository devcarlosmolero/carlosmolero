import { Link } from '@remix-run/react'
import Container from '~/components/templates/Container'
import Hamburger from '~/components/molecules/Hamburger'
import { useEffect, useState } from 'react'
import Button from '~/components/atoms/Button'
import NavbarDrawer from './NavbarDrawer'
import ImageKitImage from '~/components/atoms/ImageKitImage'

export default function Navbar({
    onOpen,
    onClose,
}: {
    onOpen: () => void
    onClose: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (isOpen) {
            onOpen()
            return
        }

        onClose()
    }, [isOpen, onOpen, onClose])

    return (
        <nav className="fixed z-20 flex w-full justify-center border border-x-0 border-t-0 border-b-border-main">
            <Container className="w-full bg-base-primary px-10 py-2 lg:px-5">
                {/* DESKTOP NAVBAR */}
                <div className="hidden grid-cols-12 items-center py-2 text-center lg:grid">
                    <div className="col-span-3 flex items-center justify-start gap-x-3">
                        <Link
                            reloadDocument
                            className="flex items-center gap-x-3 text-2xl text-text-two"
                            to="/"
                        >
                            <img
                                alt="logo"
                                className="w-[30px]"
                                src="https://i.postimg.cc/43BfSg0V/Frame-35.png"
                            />
                            <div className="flex items-center gap-x-1">
                                <span className="font-medium">Carlos</span>
                                <span className="font-light">Molero</span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-span-9 flex w-full items-center justify-end gap-x-10">
                        <Link className="nav-link w-fit" to={'#services'}>
                            Services
                        </Link>
                        <Link className="nav-link w-fit" to={'#about'}>
                            About
                        </Link>
                        <Link className="nav-link w-fit" to={'#testimonials'}>
                            Testimonials{' '}
                        </Link>
                        <Link className="nav-link w-fit" to={`#contact`}>
                            Say Hello
                        </Link>
                        <Button
                            hasIcon
                            variant="primary"
                            asLink
                            to="https://wa.link/zvj2va"
                            props={
                                {
                                    target: '_blank',
                                } as React.LinkHTMLAttributes<HTMLLinkElement>
                            }
                        >
                            Hire Me
                        </Button>
                    </div>
                </div>
                {/* MOBILE NAVBAR */}
                <div className="grid grid-cols-2 items-center px-2 py-2 text-center lg:hidden">
                    <div className="flex items-center justify-start gap-x-3">
                        <Link
                            reloadDocument
                            className="flex items-center gap-x-2 text-xl text-text-two"
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
                    </div>
                    <div className="flex justify-end">
                        <Hamburger setIsOpen={setIsOpen} isOpen={isOpen} />
                    </div>
                </div>
            </Container>
            <NavbarDrawer onClose={() => setIsOpen(false)} isOpen={isOpen} />
        </nav>
    )
}
