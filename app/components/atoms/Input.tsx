export default function Input({
    type,
    placeholder,
    name,
    required = true,
}: {
    type: string
    placeholder: string
    name: string
    required: boolean
}) {
    return (
        <input
            name={name}
            className="h-[52px] rounded-md border border-input-border bg-input-bg px-4 py-2 text-lg text-text-one"
            type={type}
            placeholder={placeholder}
            required={required}
        />
    )
}
