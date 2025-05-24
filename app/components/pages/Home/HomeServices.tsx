import { MoveUpRight } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'
import Card from '~/components/templates/Card'

export default function HomeServices({
    servicesData,
}: {
    servicesData: any[]
}) {
    return (
        <section
            id="services"
            className="space-y-8 rounded-md md:bg-[#101111] md:p-[50px]"
        >
            <h2 className="heading-gradient py-1 text-center text-4xl md:text-start md:text-5xl">
                Services
            </h2>
            <div className="flex flex-col space-y-5">
                {
                    <Fragment>
                        {servicesData.length >= 2 && (
                            <div className="flex flex-col gap-5 md:flex-row">
                                <Card className={'md:w-[65%]'}>
                                    <ServiceItem
                                        index={servicesData[0].index}
                                        title={servicesData[0].title}
                                        description={
                                            servicesData[0].description
                                        }
                                    />
                                </Card>
                                <Card className={'md:w-[35%]'}>
                                    <ServiceItem
                                        index={servicesData[1].index}
                                        title={servicesData[1].title}
                                        description={
                                            servicesData[1].description
                                        }
                                    />
                                </Card>
                            </div>
                        )}

                        {servicesData.length >= 4 && (
                            <div className="flex flex-col gap-5 md:flex-row">
                                <Card className={'md:w-[35%]'}>
                                    <ServiceItem
                                        index={servicesData[2].index}
                                        title={servicesData[2].title}
                                        description={
                                            servicesData[2].description
                                        }
                                    />
                                </Card>
                                <Card className={'md:w-[65%]'}>
                                    <ServiceItem
                                        index={servicesData[3].index}
                                        title={servicesData[3].title}
                                        description={
                                            servicesData[3].description
                                        }
                                    />
                                </Card>
                            </div>
                        )}

                        {servicesData.length >= 5 && (
                            <div className="flex flex-col gap-5 md:flex-row">
                                {servicesData.slice(4).map((service, idx) => (
                                    <Card
                                        key={`service-${idx + 5}`}
                                        className={'md:w-[100%]'}
                                    >
                                        <ServiceItem
                                            index={service.index}
                                            title={service.title}
                                            description={service.description}
                                        />
                                    </Card>
                                ))}
                            </div>
                        )}
                    </Fragment>
                }
            </div>
        </section>
    )
}

function ServiceItem({
    index,
    title,
    description,
}: {
    index: number
    title: string
    description: string
}) {
    return (
        <Fragment>
            <div className="group flex cursor-pointer">
                <div className="w-full">
                    <div className="w-fit rounded-md border border-border-main px-2 py-1 text-text-three group-hover:bg-base-quaternary group-hover:text-text-on-quaternary">
                        0{index}
                    </div>
                </div>
                <div>
                    <MoveUpRight className="size-6 text-text-three transition-all duration-200 group-hover:rotate-45 group-hover:text-text-two" />
                </div>
            </div>
            <div className="mt-8 space-y-5">
                <h3 className="text-3xl text-text-two md:text-4xl">{title}</h3>
                <p className="text-lg text-text-one">{description}</p>
            </div>
        </Fragment>
    )
}
