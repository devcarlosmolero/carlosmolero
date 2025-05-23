import {
    Book,
    BriefcaseBusiness,
    Code,
    Layers,
    Link,
    MoveUpRight,
} from 'lucide-react'
import { Fragment, useState } from 'react'
import Button from '~/components/atoms/Button'
import Card from '~/components/templates/Card'
import { cn } from '~/lib/utils'

export default function HomePortfolio({
    notoriousClientsData,
    conceptsData,
    repositoriesData,
}: {
    notoriousClientsData: any[]
    conceptsData: any[]
    repositoriesData: any[]
}) {
    const [activeTab, setActiveTab] = useState('notoriousClients')

    return (
        <section id="portfolio" className="space-y-8 rounded-md">
            <div className="space-y-5">
                <h2 className="heading-gradient py-1 text-center text-4xl md:text-start md:text-5xl">
                    Works
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
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
                </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
                {activeTab === 'notoriousClients' && (
                    <Fragment>
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
                    </Fragment>
                )}
                {activeTab === 'concepts' && (
                    <Fragment>
                        {conceptsData.map((concept, index) => (
                            <Card
                                key={`concept-${index}`}
                                className="aspect-square group"
                            >
                                <div className="overflow-hidden rounded-md">
                                    <video
                                        loop
                                        autoPlay
                                        muted
                                        playsInline
                                        src={concept.videoSrc}
                                        className="h-full w-full rounded-md transition-all duration-200 group-hover:scale-105"
                                    />
                                </div>
                                <div className="mt-8 space-y-3">
                                    <div className="group flex cursor-pointer">
                                        <div className="w-full">
                                            <h4 className="text-3xl text-text-two">
                                                {concept.title}
                                            </h4>
                                        </div>
                                        <div>
                                            <MoveUpRight className="size-6 text-text-three transition-all duration-200 group-hover:rotate-45 group-hover:text-text-two" />
                                        </div>
                                    </div>
                                    <p className="text-lg text-text-one">
                                        {concept.description}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </Fragment>
                )}
                {activeTab === 'code' && (
                    <Fragment>
                        {repositoriesData.map((repo, index) => (
                            <RepositoryCard
                                key={`repo-${index}`}
                                name={repo.name}
                                description={repo.description}
                                repoHref={repo.repoHref}
                                language={repo.language}
                            />
                        ))}
                    </Fragment>
                )}
            </div>
        </section>
    )
}

function NotoriousClientCard({
    backgroundColor = 'bg-white/80',
    overlayBackgroundColor,
    logoSrc,
    landingHref,
    name,
    description,
}: {
    backgroundColor?: string
    overlayBackgroundColor?: string
    logoSrc: string
    landingHref: string
    name: string
    description: string
}) {
    return (
        <div className="flex flex-col items-start gap-5 rounded-xl border border-border-main p-5">
            <div className="flex h-full flex-col gap-3">
                <div
                    className={`h-[50px] min-w-[50px] max-w-[50px] rounded-md ${backgroundColor}`}
                >
                    <div
                        style={{ backgroundColor: overlayBackgroundColor }}
                        className="flex h-full w-full items-center justify-center"
                    >
                        <img alt={name} className="w-[25px]" src={logoSrc} />
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-2xl text-text-two">{name}</h3>
                    <p className="text-text-on-primary">{description}</p>
                </div>
            </div>
            <hr className="h-[1px] w-full border-none bg-text-four" />
            <div className="w-full rounded-md px-0 py-0">
                <Button
                    asLink
                    to={landingHref}
                    props={
                        {
                            target: '_blank',
                        } as React.LinkHTMLAttributes<HTMLLinkElement>
                    }
                    variant="ghost"
                    className="!gap-2 !rounded-md border border-border-main !bg-[#101111] !px-4 !py-2 text-sm"
                    hasIcon
                >
                    <Link className="size-4 text-text-one" />
                    Landing
                </Button>
            </div>
        </div>
    )
}

function RepositoryCard({
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
                        className="flex items-center gap-2 text-lg text-[#4493f8] underline-offset-2 hover:underline"
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
            </div>
        </div>
    )
}
