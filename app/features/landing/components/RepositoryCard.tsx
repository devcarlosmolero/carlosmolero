import { Book } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

export default function RepositoryCard({
    repoHref,
    language = 'Ruby',
    name,
    description,
}: {
    repoHref: string
    language?: string
    name: string
    description: string
}) {
    return (
        <div className="flex flex-col items-start gap-5 rounded-xl border border-[#3d444d] bg-[#0d1117] p-5">
            <div className="flex h-full flex-col gap-3">
                <div className="space-y-1">
                    <a
                        href={repoHref}
                        target="_blank"
                        className="flex items-center gap-2 text-lg text-[#4493f8] underline underline-offset-2 hover:no-underline"
                        rel="noreferrer"
                    >
                        <Book className="size-5" /> {name}
                    </a>
                    <p className="text-sm text-[#9198a1]">{description}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 py-0">
                {language === 'Ruby' && (
                    <Fragment>
                        <span className="h-[10px] w-[10px] rounded-full bg-[#701516]"></span>
                        <p className="text-sm">{language}</p>
                    </Fragment>
                )}
                {language === 'TypeScript' && (
                    <Fragment>
                        <span className="h-[10px] w-[10px] rounded-full bg-[#3178c6]"></span>
                        <p className="text-sm">{language}</p>
                    </Fragment>
                )}
                {language === 'Python' && (
                    <Fragment>
                        <span className="h-[10px] w-[10px] rounded-full bg-[#3572A5]"></span>
                        <p className="text-sm">{language}</p>
                    </Fragment>
                )}
            </div>
        </div>
    )
}
