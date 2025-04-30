export default function AdminSalesCardHeader({
    title,
    description,
}: {
    title: string
    description: string
}) {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold text-text-two">{title}</h2>
            <p className="text-text-one">{description}</p>
        </div>
    )
}
