export default function TextArea({
    placeholder,
    name,
    required = true,
}: {
    placeholder: string
    name: string
    required: boolean
}) {
    return (
        <textarea
            name={name}
            rows={2}
            className="rounded-md border border-input-border bg-input-bg px-4 py-2 text-text-one"
            placeholder={placeholder}
            required={required}
        />
    )
}
