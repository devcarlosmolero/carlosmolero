import { MoveUpRight } from 'lucide-react'
import { useState } from 'react'
import Card from '~/components/templates/Card'
import { useHydrated } from '~/hooks/useHydrated'
import { cn } from '~/lib/utils'
import RepositoryCard from './RepositoryCard'
import NotoriousClientCard from './NotoriusClientCard'
import PortfolioTabs from './PortfolioTabs'
import CaseStudyImageCarousel from './CaseStudyImageCarousel'
import { Link } from '@remix-run/react'

export default function Portfolio({
    notoriousClientsData,
    caseStudiesData,
    repositoriesData,
}: {
    notoriousClientsData: any[]
    caseStudiesData: any[]
    repositoriesData: any[]
}) {
    const isHydrated = useHydrated()
    const [activeTab, setActiveTab] = useState('caseStudies')

    return (
        <section id="portfolio" className="space-y-8 rounded-md">
            <PortfolioTabs activeTab={activeTab} onChange={setActiveTab} />
            <div className="grid grid-cols-1 grid-rows-1 overflow-hidden">
                <div
                    className={cn(
                        'col-span-1 col-start-1 row-span-1 row-start-1 grid gap-5 transition-all duration-300 sm:grid-cols-2 lg:grid-cols-3',
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
                        activeTab === 'caseStudies'
                            ? 'translate-x-0 opacity-100'
                            : 'h-0 translate-x-8 overflow-hidden opacity-0'
                    )}
                >
                    {caseStudiesData.map((caseStudy, index) => (
                        <Link
                            to={`/case-study/${caseStudy.slug}`}
                            key={`case-study-${index}`}
                        >
                            <Card className="aspect-square group !h-full">
                                <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-md">
                                    {caseStudy.videoPreview && isHydrated && (
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
                                            src={`https:${caseStudy.videoUrl}`}
                                            className="h-full w-full rounded-md transition-all duration-200 group-hover:scale-105"
                                        />
                                    )}
                                    {!caseStudy.videoPreview && (
                                        <CaseStudyImageCarousel
                                            caseStudy={caseStudy}
                                        />
                                    )}
                                </div>
                                <div className="mt-8 space-y-3">
                                    <div className="group flex cursor-pointer">
                                        <div className="w-full">
                                            <h4 className="text-2xl text-text-two">
                                                {caseStudy.seoTitle}
                                            </h4>
                                        </div>
                                        <div>
                                            <MoveUpRight className="size-6 text-text-three transition-all duration-200 group-hover:rotate-45 group-hover:text-text-two" />
                                        </div>
                                    </div>
                                    <p className="text-text-one">
                                        {caseStudy.seoDescription}
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
                <div
                    className={cn(
                        'col-span-1 col-start-1 row-span-1 row-start-1 grid gap-5 transition-all duration-300 sm:grid-cols-2 lg:grid-cols-3',
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
