import { MoveUpRight } from 'lucide-react'
import { useState } from 'react'
import Card from '~/components/templates/Card'
import { useHydrated } from '~/hooks/useHydrated'
import { cn } from '~/lib/utils'
import RepositoryCard from './RepositoryCard'
import NotoriousClientCard from './NotoriusClientCard'
import PortfolioTabs from './PortfolioTabs'

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
    const [activeTab, setActiveTab] = useState('notoriousClients')

    return (
        <section id="portfolio" className="space-y-8 rounded-md">
            <PortfolioTabs activeTab={activeTab} onChange={setActiveTab} />
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
                    {conceptsData.length === 0 && (
                        <p>There&apos;s nothing here... Yet!</p>
                    )}
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
