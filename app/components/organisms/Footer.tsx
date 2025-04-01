import { Linkedin, TwitterX } from 'react-bootstrap-icons'
import Button from '../atoms/Button'
import Container from '../templates/Container'
import { Form, Link } from '@remix-run/react'
import { MoveUpRight } from 'lucide-react'
import Input from '../atoms/Input'
import TextArea from '../atoms/TextArea'
import ContactForm from './ContactForm'

export default function Footer() {
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
                        <p className="text-center text-text-on-primary md:text-start">
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
                        <div className="flex items-center gap-x-3">
                            <Link
                                to="https://x.com/iscarlosmolero"
                                className="cursor-pointer text-text-three"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <TwitterX className="size-5" />
                            </Link>
                            <Link
                                className="cursor-pointer text-text-three"
                                to="https://www.linkedin.com/in/iscarlosmolero/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Linkedin className="size-5" />
                            </Link>
                        </div>
                    </div>
                    <div id="contact" className="col-span-2">
                        <ContactForm />
                    </div>
                </div>
            </Container>
        </footer>
    )
}
