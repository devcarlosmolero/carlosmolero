import { Form, useLocation } from '@remix-run/react'
import Button from '../atoms/Button'
import TextArea from '../atoms/TextArea'
import Input from '../atoms/Input'
import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react'

export default function ContactForm() {
    const [token, setToken] = useState<string>()
    const location = useLocation()

    return (
        <Form
            reloadDocument
            action="/api/contact-form"
            method="POST"
            id="contact"
            className="flex w-full flex-col space-y-3 rounded-md bg-base-secondary"
        >
            <Input
                name="email"
                type="email"
                placeholder="hello@example.com"
                disabled={!token}
                required
            />
            <input type="hidden" name="pathname" value={location.pathname} />
            <input type="hidden" name="token" value={token} />
            <TextArea
                name="message"
                placeholder="Message in brief..."
                disabled={!token}
                required
            />
            <Turnstile
                onSuccess={(token) => setToken(token)}
                siteKey="0x4AAAAAABDYC0VHvPuUFXUP"
                options={{
                    theme: 'dark',
                }}
                lang="en"
            />
            <Button
                variant="primary"
                isDisabled={!token}
                className="!mt-5 w-full md:w-fit"
            >
                {' '}
                Send Message
            </Button>
        </Form>
    )
}
