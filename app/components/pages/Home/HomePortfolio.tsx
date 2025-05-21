import { Book, BriefcaseBusiness, Code, Layers, Link } from 'lucide-react'
import { Fragment, useState } from 'react'
import Button from '~/components/atoms/Button'
import { cn } from '~/lib/utils'

export default function HomePortfolio() {
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
                        <NotoriousClientCard
                            name="WizHelp"
                            description="Wizhelp offers IT support services to businesses,
                    aiming to boost productivity by managing systems,
                    applications, and devices. They provide support
                    across various environments, handle projects and
                    implementations, and automate repetitive tasks."
                            logoSrc="./wizhelp-logo.png"
                            overlayBackgroundColor="hsla(264, 100%, 52%, 0.08)"
                            landingHref="https://wizhelp.net"
                        />
                        <NotoriousClientCard
                            name="Beagly"
                            description="Beag.ly is a platform that offers online surveys and rewards 
                            participants with gift cards of $5 or more upon completion. Users can choose from various popular retailers 
                            like Amazon, Dunkin', CVS Pharmacy, Target, Whole Foods, and Walmart."
                            logoSrc="./beagly-logo.png"
                            landingHref="https://beag.ly"
                        />
                        <NotoriousClientCard
                            name="LathosClub"
                            description="Lathos Club is an exclusive ecosystem dedicated to developing, 
                    connecting, and empowering bright minds. It offers members access to 
                    expert knowledge, personalized mentorship, and a supportive community 
                    to foster their entrepreneurial and personal growth."
                            logoSrc="./lathosclub-logo.png"
                            backgroundColor="bg-black/80"
                            landingHref="https://lathosclub.com"
                        />
                        <NotoriousClientCard
                            name="Peakz"
                            description="On Peakz athletes get rewarded for what they do: you
                    video yourself training, preparing and competing and
                    post that content exclusively on your Peakz channel.
                    Your fans become scouts and pay to see your content."
                            logoSrc="./peakz-logo.png"
                            overlayBackgroundColor="hsla(34, 87%, 60%, 0.08)"
                            landingHref="https://app.peakz.com"
                        />
                        <NotoriousClientCard
                            name="Voicit"
                            description="Voicit is an AI-powered tool that provides online ChatGPT summaries for meeting notes. 
                    It enables users to summarize and create customizable meeting minutes, 
                    interacting with transcriptions, recordings, and intelligent chats to extract 
                    key information from both online and in-person meetings. "
                            logoSrc="./voicit-logo.png"
                            landingHref="https://voicit.es"
                        />
                        <NotoriousClientCard
                            name="Bravo Group"
                            description="Bravo Group's advocacy focuses on helping clients succeed by building powerful audiences through strategic communication. 
                            They specialize in influential issues such as healthcare, education, and infrastructure. They identify key individuals and create 
                            engaging strategies to persuade audiences."
                            logoSrc="./ignite-logo.png"
                            landingHref="https://bravogroup.us/advocacy"
                            backgroundColor="bg-red-600"
                        />
                    </Fragment>
                )}
                {activeTab === 'concepts' && (
                    <Fragment>
                        <p>
                            There are no concepts yet! Give me some time to
                            upload some ;).
                        </p>
                    </Fragment>
                )}
                {activeTab === 'code' && (
                    <Fragment>
                        <RepositoryCard
                            name="text-adventure-commander"
                            description="A simple but powerful gem that uses a Lexer in combination with a Parser to detect and execute commands in text-based video games."
                            repoHref="https://github.com/devcarlosmolero/text-adventure-commander"
                        />
                        <RepositoryCard
                            name="text-adventure-level-manager"
                            description="Gem that allows you to manage the maze of levels and scenes of a text-based video game with a simple .yml file."
                            repoHref="https://github.com/devcarlosmolero/text-adventure-level-manager"
                        />
                        <RepositoryCard
                            name="tabular-db"
                            description="Tabular DB allows you to use CSV files as a database and leverage existing CSV viewers to enhance the prototyping experience."
                            repoHref="https://github.com/devcarlosmolero/tabular-db"
                        />
                        <RepositoryCard
                            name="carlosmolero"
                            description="My personal website."
                            repoHref="https://github.com/devcarlosmolero/carlosmolero"
                            language="TypeScript"
                        />
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
