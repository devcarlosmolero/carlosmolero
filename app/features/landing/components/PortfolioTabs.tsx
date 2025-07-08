import { BriefcaseBusiness, Code, Layers } from 'lucide-react'
import { cn } from '~/lib/utils'

export default function PortfolioTabs({
    onChange,
    activeTab,
}: {
    onChange: (tab: string) => void
    activeTab: string
}) {
    return (
        <div className="space-y-5">
            <h2 className="heading-gradient py-1 text-center text-4xl md:text-start md:text-5xl">
                Works
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <button
                    onClick={() => onChange('caseStudies')}
                    className={cn(
                        'flex w-fit items-center gap-2 rounded-full border border-border-main px-4 py-2 text-sm transition-all duration-300 hover:border-text-two hover:text-text-two',
                        activeTab === 'caseStudies' &&
                            'border-text-two text-text-two'
                    )}
                >
                    <Layers className="size-4" />
                    Case Studies
                </button>
                <button
                    onClick={() => onChange('notoriousClients')}
                    className={cn(
                        'flex w-fit items-center gap-2 rounded-full border border-border-main px-4 py-2 text-sm transition-all duration-300 hover:border-text-two hover:text-text-two',
                        activeTab === 'notoriousClients' &&
                            'border-text-two text-text-two'
                    )}
                >
                    <BriefcaseBusiness className="size-4" />
                    Notorious Clients
                </button>

                <button
                    onClick={() => onChange('code')}
                    className={cn(
                        'flex w-fit items-center gap-2 rounded-full border border-border-main px-4 py-2 text-sm transition-all duration-300 hover:border-text-two hover:text-text-two',
                        activeTab === 'code' && 'border-text-two text-text-two'
                    )}
                >
                    <Code className="size-4" />
                    Code
                </button>
            </div>
        </div>
    )
}
