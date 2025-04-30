import { MoveUpRight } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'
import Card from '~/components/templates/Card'

export default function HomeServices() {
    return (
        <section
            id="services"
            className="space-y-8 rounded-md md:bg-[#101111] md:p-[50px]"
        >
            <h2 className="heading-gradient py-1 text-center text-4xl md:text-start md:text-5xl">
                Services
            </h2>
            <div className="flex flex-col space-y-5">
                <div className="flex flex-col gap-5 md:flex-row">
                    <Card className="md:w-[65%]">
                        <ServiceItem
                            index={1}
                            title="UX/UI Design"
                            description="Gain a vivid understanding of your product through intuitive, interactive prototypes and design sketches that prioritize a seamless user experience."
                        />
                    </Card>
                    <Card className="md:w-[35%]">
                        <ServiceItem
                            index={2}
                            title="Branding"
                            description="We’ll collaborate to define a distinctive color palette, visual assets, and tone that set your brand apart and make it unforgettable."
                        />
                    </Card>
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <Card className="md:w-[35%]">
                        <ServiceItem
                            index={3}
                            title="Product Development"
                            description="I’ll bring your product to life using a versatile toolkit—NoCode, LowCode, AI, and, leveraging my technical expertise, traditional programming languages."
                        />
                    </Card>
                    <Card className="md:w-[65%]">
                        <ServiceItem
                            index={4}
                            title="UX Engineering"
                            description="As a front-end development expert and UX/UI designer, I’ll audit your app to enhance its user experience, driving better engagement and higher conversions."
                        />
                    </Card>
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <Card>
                        <ServiceItem
                            index={5}
                            title="Business Strategy"
                            description="I’ll craft a detailed plan with clear steps and milestones to drive your business success, aligning your goals with actionable strategies for growth and sustainability."
                        />
                    </Card>
                </div>
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
