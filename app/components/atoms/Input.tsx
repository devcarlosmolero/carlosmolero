import { InputHTMLAttributes } from 'react'

export default function Input({
    placeholder,
    name,
    type = 'text',
    required = true,
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            name={name}
            className="h-[58px] rounded-md border border-input-border bg-input-bg px-4 py-2 text-text-one"
            type={type}
            placeholder={placeholder}
            required={required}
            {...props}
        />
    )
}
