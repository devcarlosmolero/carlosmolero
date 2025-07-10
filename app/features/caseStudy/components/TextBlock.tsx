export default function TextBlock({
    title,
    content,
}: {
    title: string
    content: string
}) {
    return (
        <div className="space-y-5 md:w-[50%]">
            <h3 className="text-3xl text-text-three md:text-4xl">{title}</h3>
            <p
                dangerouslySetInnerHTML={{
                    __html: content.replaceAll('~', '<br/><br/>'),
                }}
                className="text-lg"
            />
        </div>
    )
}
