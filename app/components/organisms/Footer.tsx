import { Github, Threads } from 'react-bootstrap-icons'
import Button from '../atoms/Button'
import Container from '../templates/Container'
import { Link } from '@remix-run/react'
import { Linkedin, MoveUpRight } from 'lucide-react'
import ContactForm from './ContactForm'
import { TTheme } from '~/types/theme'

export default function Footer({ theme }: { theme: TTheme }) {
    return (
        <footer className="mt-16 border border-b-0 border-l-0 border-r-0 border-border-main">
            <Container className="px-4 py-16">
                <div className="grid gap-10 md:grid-cols-4">
                    <div className="col-span-2 flex flex-col items-center gap-y-5 md:col-span-2 md:items-start">
                        <h1 className="heading-gradient py-1 text-center text-3xl md:text-start">
                            What Are You Waiting For?
                            <br className="hidden md:block" /> Your Product Can
                            Be A Reality
                        </h1>
                        <p className="text-center text-lg text-text-on-primary md:text-start">
                            Taking action in time is key, do it and get ahead of
                            your competition by taking advantage of my
                            experience and my technical knowledge.
                        </p>
                        <Button
                            hasIcon
                            asLink
                            to="https://cal.com/iscarlosmolero/hire-me-meeting?duration=30"
                            props={
                                {
                                    target: '_blank',
                                } as React.LinkHTMLAttributes<HTMLLinkElement>
                            }
                            variant="primary"
                        >
                            Book a Meeting
                            <MoveUpRight className="size-6" />
                        </Button>
                        <div className="mt-5 flex items-center gap-x-3">
                            <Link
                                to="https://x.com/iscarlosmolero"
                                className="cursor-pointer rounded-full border border-input-focus-border p-2 text-text-three hover:bg-base-tertiary hover:text-text-on-tertiary"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Threads className="size-5" />
                            </Link>
                            <Link
                                className="cursor-pointer rounded-full border border-input-focus-border p-2 text-text-three hover:bg-base-tertiary hover:text-text-on-tertiary"
                                to="https://www.linkedin.com/in/iscarlosmolero"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Linkedin className="size-5" />
                            </Link>
                            <Link
                                className="cursor-pointer rounded-full border border-input-focus-border p-2 text-text-three hover:bg-base-tertiary hover:text-text-on-tertiary"
                                to="https://github.com/devcarlosmolero"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Github className="size-5" />
                            </Link>
                        </div>
                    </div>
                    <div id="contact" className="col-span-2">
                        <ContactForm theme={theme} />
                    </div>
                </div>
            </Container>
        </footer>
    )
}
