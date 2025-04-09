import { Form, useLocation } from '@remix-run/react'
import Button from '../atoms/Button'
import TextArea from '../atoms/TextArea'
import Input from '../atoms/Input'
import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react'
import { TTheme } from '~/types/theme'

export default function ContactForm({ theme }: { theme: TTheme }) {
    const [token, setToken] = useState<string>()
    const location = useLocation()

    return (
        <Form
            reloadDocument
            action="/api/contact-form"
            method="POST"
            id="contact"
            className="flex w-full flex-col space-y-5 rounded-md bg-base-secondary p-[20px] md:p-[50px]"
        >
            <h2 className="heading-gradient py-1 text-center text-3xl md:text-start md:text-4xl">
                It's time
                <br /> to talk about your project.
            </h2>
            <p className="text-center text-lg text-text-on-primary md:text-start">
                Let’s embark on creative journey together by shaping a visual
                narrative of your brand in the crowded digital space.
            </p>
            <Input
                name="email"
                type="email"
                placeholder="hello@example.com"
                required
            />
            <input type="hidden" name="pathname" value={location.pathname} />
            <input type="hidden" name="token" value={token} />
            <TextArea
                name="message"
                placeholder="Message in brief..."
                required
            />
            <Turnstile
                onSuccess={(token) => setToken(token)}
                siteKey="0x4AAAAAABDYC0VHvPuUFXUP"
                options={{
                    theme,
                }}
                lang="en"
            />
            <Button variant="primary" className="w-full md:w-fit">
                {' '}
                Send Message
            </Button>
        </Form>
    )
}
