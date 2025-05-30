import { BriefcaseBusiness, Code, Layers, MoveUpRight } from 'lucide-react'
import { useState } from 'react'
import Card from '~/components/templates/Card'
import { useHydrated } from '~/hooks/useHydrated'
import { cn } from '~/lib/utils'
import RepositoryCard from './RepositoryCard'
import NotoriousClientCard from './NotoriusClientCard'

export default function Portfolio({
    notoriousClientsData,
    conceptsData,
    repositoriesData,
}: {
    notoriousClientsData: any[]
    conceptsData: any[]
    repositoriesData: any[]
}) {
    const isHydrated = useHydrated()
    const [activeTab, setActiveTab] = useState('concepts')

    return (
        <section id="portfolio" className="space-y-8 rounded-md">
            <div className="space-y-5">
                <h2 className="heading-gradient py-1 text-center text-4xl md:text-start md:text-5xl">
                    Works
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                    <button
                        onClick={() => setActiveTab('concepts')}
                        className={cn(
                            'flex w-fit items-center gap-2 rounded-full border border-border-main px-4 py-2 text-sm transition-all duration-300 hover:border-text-two hover:text-text-two',
                            activeTab === 'concepts' &&
                                'border-text-two text-text-two'
                        )}
                    >
                        <Layers className="size-4" />
                        Concepts
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={cn(
                            'flex w-fit items-center gap-2 rounded-full border border-border-main px-4 py-2 text-sm transition-all duration-300 hover:border-text-two hover:text-text-two',
                            activeTab === 'code' &&
                                'border-text-two text-text-two'
                        )}
                    >
                        <Code className="size-4" />
                        Code
                    </button>
                    <button
                        onClick={() => setActiveTab('notoriousClients')}
                        className={cn(
                            'flex w-fit items-center gap-2 rounded-full border border-border-main px-4 py-2 text-sm transition-all duration-300 hover:border-text-two hover:text-text-two',
                            activeTab === 'notoriousClients' &&
                                'border-text-two text-text-two'
                        )}
                    >
                        <BriefcaseBusiness className="size-4" />
                        Notorious Clients
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 grid-rows-1 overflow-hidden">
                <div
                    className={cn(
                        'col-span-1 col-start-1 row-span-1 row-start-1 grid gap-5 transition-all duration-300 md:grid-cols-2',
                        activeTab === 'notoriousClients'
                            ? 'translate-x-0 opacity-100'
                            : 'h-0 translate-x-8 overflow-hidden opacity-0'
                    )}
                >
                    {notoriousClientsData.map((client, index) => (
                        <NotoriousClientCard
                            key={`client-${index}`}
                            name={client.name}
                            description={client.description}
                            logoSrc={client.logoSrc}
                            overlayBackgroundColor={
                                client.overlayBackgroundColor
                            }
                            landingHref={client.landingHref}
                            backgroundColor={client.backgroundColor}
                        />
                    ))}
                </div>
                <div
                    className={cn(
                        'col-span-1 col-start-1 row-span-1 row-start-1 grid gap-5 transition-all duration-300 md:grid-cols-2',
                        activeTab === 'concepts'
                            ? 'translate-x-0 opacity-100'
                            : 'h-0 translate-x-8 overflow-hidden opacity-0'
                    )}
                >
                    {conceptsData.map((concept, index) => (
                        <Card
                            key={`concept-${index}`}
                            className="aspect-square group"
                        >
                            <div className="overflow-hidden rounded-md">
                                {isHydrated && (
                                    <video
                                        loop
                                        autoPlay
                                        muted
                                        playsInline
                                        preload="auto"
                                        ref={(el) => {
                                            if (el) {
                                                el.play().catch((e) =>
                                                    console.log(
                                                        'Autoplay prevented:',
                                                        e
                                                    )
                                                )
                                            }
                                        }}
                                        src={concept.videoSrc}
                                        className="h-full w-full rounded-md transition-all duration-200 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <div className="mt-8 space-y-3">
                                <div className="group flex cursor-pointer">
                                    <div className="w-full">
                                        <h4 className="text-2xl text-text-two">
                                            {concept.title}
                                        </h4>
                                    </div>
                                    <div>
                                        <MoveUpRight className="size-6 text-text-three transition-all duration-200 group-hover:rotate-45 group-hover:text-text-two" />
                                    </div>
                                </div>
                                <p className="text-text-one">
                                    {concept.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
                <div
                    className={cn(
                        'col-span-1 col-start-1 row-span-1 row-start-1 grid gap-5 transition-all duration-300 md:grid-cols-2',
                        activeTab === 'code'
                            ? 'translate-x-0 opacity-100'
                            : 'h-0 translate-x-8 overflow-hidden opacity-0'
                    )}
                >
                    {repositoriesData.map((repo, index) => (
                        <RepositoryCard
                            key={`repo-${index}`}
                            name={repo.name}
                            description={repo.description}
                            repoHref={repo.repoHref}
                            language={repo.language}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
