import { TextareaHTMLAttributes } from 'react'

export default function TextArea({
    placeholder,
    name,
    required = true,
    rows = 2,
    ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            name={name}
            rows={rows}
            className="rounded-md border border-input-border bg-input-bg px-4 py-2 text-text-one"
            placeholder={placeholder}
            required={required}
            {...props}
        />
    )
}
