import { Github, Threads } from 'react-bootstrap-icons'
import Container from '../templates/Container'
import { Link } from '@remix-run/react'
import { Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="mx-5 mt-16 border border-b-0 border-l-0 border-r-0 border-border-main">
            <Container className="flex items-center justify-center px-4 py-8 md:justify-start">
                <div className="flex items-center gap-x-3">
                    <Link
                        to="https://threads.net/@iscarlosmolero"
                        className="cursor-pointer rounded-full border border-input-focus-border p-2 text-text-three hover:bg-base-tertiary hover:text-text-on-tertiary"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Threads className="size-4" />
                    </Link>
                    <Link
                        className="cursor-pointer rounded-full border border-input-focus-border p-2 text-text-three hover:bg-base-tertiary hover:text-text-on-tertiary"
                        to="https://linkedin.com/in/iscarlosmolero"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Linkedin className="size-4" />
                    </Link>
                    <Link
                        className="cursor-pointer rounded-full border border-input-focus-border p-2 text-text-three hover:bg-base-tertiary hover:text-text-on-tertiary"
                        to="https://github.com/devcarlosmolero"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Github className="size-4" />
                    </Link>
                </div>
            </Container>
        </footer>
    )
}
