import { Fragment } from 'react/jsx-runtime'
import Card from '~/components/templates/Card'
import ServiceCard from './ServiceCard'

export default function Services({ servicesData }: { servicesData: any[] }) {
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
                                    <ServiceCard
                                        index={servicesData[0].index}
                                        title={servicesData[0].title}
                                        description={
                                            servicesData[0].description
                                        }
                                    />
                                </Card>
                                <Card className={'md:w-[35%]'}>
                                    <ServiceCard
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
                                    <ServiceCard
                                        index={servicesData[2].index}
                                        title={servicesData[2].title}
                                        description={
                                            servicesData[2].description
                                        }
                                    />
                                </Card>
                                <Card className={'md:w-[65%]'}>
                                    <ServiceCard
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
                                        <ServiceCard
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
