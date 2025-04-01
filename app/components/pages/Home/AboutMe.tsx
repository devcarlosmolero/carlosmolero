import { MessageCircleDashed } from 'lucide-react'
import { ChevronRight } from 'react-bootstrap-icons'
import Button from '~/components/atoms/Button'
import ImageKitImage from '~/components/atoms/ImageKitImage'

export default function AboutMe() {
    return (
        <section id="about" className="space-y-8">
            <h2 className="heading-gradient py-1 text-center text-4xl md:text-start md:text-5xl">
                About Me
            </h2>
            <div className="flex flex-col space-y-5">
                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="flex w-full items-center justify-center rounded-md bg-[#141514] p-[20px] md:w-[30%] md:p-[50px]">
                        <ImageKitImage
                            alt="Carlos Molero"
                            className="w-[150px] rounded-full grayscale"
                            src="/carlos-molero.jpeg"
                        />
                    </div>
                    <div className="w-full space-y-5 rounded-md bg-[#141514] p-[20px] md:w-[70%] md:p-[50px]">
                        <h2 className="flex items-center justify-center text-center text-3xl text-text-three md:justify-start md:text-start">
                            <span>Hi</span>
                            <span>
                                <img
                                    src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.webp"
                                    alt=""
                                    className="mx-2 inline-block w-[30px]"
                                />
                            </span>
                            <span>I'm Carlos</span>
                        </h2>
                        <p className="text-center text-lg text-text-on-primary md:text-start">
                            As a product designer, I excel at transforming
                            challenges and opportunities into user-focused,
                            strategic solutions. With a strong technical
                            background and expertise in business strategy, I
                            craft distinctive visual identities for digital
                            products that seamlessly blend form and function.
                        </p>
                        <p className="text-center text-lg text-text-on-primary md:text-start">
                            I’m passionate about building stunning designs
                            rooted in shared values, open communication, and a
                            deep respect for the audience, ensuring every
                            solution is both impactful and purposeful.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="flex w-full flex-col items-center justify-start rounded-md bg-[#141514] p-[20px] md:w-[45%] md:items-start md:p-[50px]">
                        <h2 className="text-3xl text-text-three">Experience</h2>
                        <div className="mt-12 flex flex-col gap-y-5">
                            <AboutItem
                                title="Full Time Freelancing"
                                institution="NovaScript"
                                src="https://media.licdn.com/dms/image/v2/D560BAQF5o4xmkjOvaA/company-logo_100_100/company-logo_100_100/0/1738879408081/devcarlosmolero_logo?e=1749081600&v=beta&t=otEmNkSLsb0E1saoH30SYEyEMmsGKTMaPZjTrSKU480"
                                alt="NovaScript LLC"
                                startDate="Sept 2019"
                                endDate="Present"
                            />
                            <AboutItem
                                title="Sr Developer"
                                institution="TheKnot"
                                src="https://media.licdn.com/dms/image/v2/D560BAQF8E0W-1YZowA/company-logo_100_100/company-logo_100_100/0/1719841509379?e=1749081600&v=beta&t=RzK2kwkd7SlsaZTrv8hqEGYSe2Bkg9Q5jt43MGsmtss"
                                alt=""
                                startDate="Oct 2023"
                                endDate="Dec 2023"
                            />
                            <AboutItem
                                title="Tech Lead"
                                institution="Voicit"
                                src="https://media.licdn.com/dms/image/v2/C4E0BAQH5WY5C8BYhow/company-logo_100_100/company-logo_100_100/0/1664120420112/voicit_logo?e=1749081600&v=beta&t=q-XB6xyBf-OQiDjDSvxaynRm9Znhx3SjnW7XTxFXBhs"
                                alt=""
                                startDate="May 2022"
                                endDate="Oct 2023"
                            />
                            <AboutItem
                                title="Backend Developer"
                                institution="Sprinter"
                                src="https://media.licdn.com/dms/image/v2/D4D0BAQEbEqTapl0q1A/company-logo_100_100/B4DZVl4vT6HIAU-/0/1741171127926/sprinter_logo?e=1749081600&v=beta&t=Ew138yKFFTo11Qu9Svf21F9htRmSuRHCWuLNmvhLFsg"
                                alt=""
                                startDate="Oct 2022"
                                endDate="Dec 2022"
                            />
                            <AboutItem
                                title="Full Stack Developer"
                                institution="Peakz"
                                src="https://media.licdn.com/dms/image/v2/C4E0BAQGqp7BlqcEpbQ/company-logo_100_100/company-logo_100_100/0/1630617929994/peakz_logo?e=1749081600&v=beta&t=mVvgFhKuS5SxuJamVtGV7UXZIhVeWmV3oUMTkujIRcg"
                                alt=""
                                startDate="Jun 2022"
                                endDate="May 2022"
                            />
                            <AboutItem
                                title="Full Stack Developer"
                                institution="Metaphase07"
                                src="https://media.licdn.com/dms/image/v2/C560BAQHzNy1gjgqoDw/company-logo_100_100/company-logo_100_100/0/1630671932759/metaphase07_logo?e=1749081600&v=beta&t=ACgQu7X0NqVazyDi8A7AeXSq2RAJQvt7K5Gjlv82Wqg"
                                alt=""
                                startDate="Dec 2020"
                                endDate="Ago 2021"
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start rounded-md bg-[#141514] p-[20px] md:w-[55%] md:items-start md:p-[50px]">
                        <h2 className="text-3xl text-text-three">Education</h2>
                        <div className="mt-12 flex flex-col gap-y-5">
                            <AboutItem
                                title="UX/UI Certificate"
                                institution="Google"
                                src="https://media.licdn.com/dms/image/v2/C4D0BAQHiNSL4Or29cg/company-logo_100_100/company-logo_100_100/0/1631311446380?e=1749081600&v=beta&t=P2w22NED7LR2lVCENiptdDWe_4XYTMUJ9OpoXtYZTd0"
                                alt=""
                                startDate="Mar 2023"
                                endDate="Mar 2023"
                            />
                            <AboutItem
                                title="Computer Engineering"
                                institution="UoPeople"
                                src="https://media.licdn.com/dms/image/v2/C4D0BAQHOgtiBRiYWSw/company-logo_100_100/company-logo_100_100/0/1648062225718/university_of_the_people_logo?e=1749081600&v=beta&t=2DycX3F-GxBRf8TRZ00Q0OrOCIiW62yOfkCUpHfoRO0"
                                alt=""
                                startDate="Sept 2018"
                                endDate="Sept 2021"
                            />
                            <AboutItem
                                title="Psychology Degree"
                                institution="UoMalaga"
                                src="https://media.licdn.com/dms/image/v2/D4D0BAQGJBeLXcK1OZA/company-logo_100_100/company-logo_100_100/0/1719820796974/universidad_de_malaga_logo?e=1749081600&v=beta&t=0eFCW8JldzUxFhGKufCuUVS6fEKZ9gQiBlb_zO1Y9no"
                                alt=""
                                startDate="Sept 2016"
                                endDate="Sept 2020"
                            />
                            <AboutItem
                                title="Law Degree"
                                institution="UoMalaga"
                                src="https://media.licdn.com/dms/image/v2/D4D0BAQGJBeLXcK1OZA/company-logo_100_100/company-logo_100_100/0/1719820796974/universidad_de_malaga_logo?e=1749081600&v=beta&t=0eFCW8JldzUxFhGKufCuUVS6fEKZ9gQiBlb_zO1Y9no"
                                alt=""
                                startDate="Sept 2012"
                                endDate="Sept 2016"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="flex w-full flex-col items-center justify-start rounded-md bg-[#141514] p-[20px] md:w-[65%] md:items-start md:p-[50px]">
                        <h2 className="text-3xl text-text-three">Skills</h2>
                        <div className="mt-12 flex w-full flex-col gap-5 md:flex-row">
                            <SkillItem
                                name="Figma"
                                src="/figma.png"
                                alt="Figma"
                                percentage="85%"
                            />
                            <SkillItem
                                name="FlutterFlow"
                                src="/flutter.png"
                                alt="FlutterFlow"
                                percentage="80%"
                            />
                            <SkillItem
                                name="Wordpress"
                                src="/wordpress.png"
                                alt="Wordpress"
                                percentage="90%"
                            />
                            <SkillItem
                                name="Framer"
                                src="/framer.png?n=3"
                                alt="Framer"
                                percentage="80%"
                            />
                            <SkillItem
                                name="Webflow"
                                src="/webflow.png"
                                alt="Webflow"
                                percentage="75%"
                            />
                            <SkillItem
                                name="Coding"
                                src="/coding.png?n=1"
                                alt="Coding"
                                percentage="95%"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5 md:w-[35%]">
                        <div className="w-full space-y-5 rounded-md bg-[#141514] p-[20px] md:p-[50px]">
                            <p className="text-center text-5xl text-[#FEFCE1]">
                                8
                            </p>
                            <p className="text-center text-xl text-text-three">
                                Years of <br /> Experience
                            </p>
                        </div>
                        <div className="w-full space-y-5 rounded-md bg-[#141514] p-[20px] md:p-[50px]">
                            <p className="text-center text-5xl text-[#FEFCE1]">
                                65
                            </p>
                            <p className="text-center text-xl text-text-three">
                                Projects <br /> Completed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3 flex w-full flex-col items-center gap-x-0 gap-y-3 md:flex-row md:gap-0">
                <Button
                    asLink
                    to="https://docs.google.com/document/d/10zwBGEO3XI5P-yxAje9PkUKiXILKrhWf/edit?usp=sharing&ouid=110596581882338817822&rtpof=true&sd=true"
                    props={
                        {
                            target: '_blank',
                        } as React.LinkHTMLAttributes<HTMLLinkElement>
                    }
                    variant="primary"
                >
                    View Resume
                </Button>
                <Button
                    asLink
                    to="https://wa.link/zvj2va"
                    props={
                        {
                            target: '_blank',
                        } as React.LinkHTMLAttributes<HTMLLinkElement>
                    }
                    variant="ghost"
                    hasIcon
                >
                    <MessageCircleDashed className="size-6 text-text-one" />{' '}
                    <p>Get In Touch</p>
                </Button>
            </div>
        </section>
    )
}

function AboutItem({
    src,
    alt,
    title,
    institution,
    startDate,
    endDate,
}: {
    src: string
    alt: string
    title: string
    institution: string
    startDate: string
    endDate: string
}) {
    return (
        <div className="flex items-start gap-5">
            <img alt={alt} className="h-[40px] w-[40px] rounded-md" src={src} />
            <div className="space-y-3">
                <div className="flex gap-1">
                    <p className="m-0 w-fit text-lg text-text-two">
                        {title}{' '}
                        <span className="m-0 text-lg text-text-one">
                            @{institution}
                        </span>
                    </p>
                </div>
                <div className="flex w-fit items-center gap-x-1 rounded-md border border-border-main px-2 py-1 text-sm text-text-one">
                    <p>{startDate}</p>
                    <ChevronRight className="size-4" />
                    <p>{endDate}</p>
                </div>
            </div>
        </div>
    )
}

function SkillItem({
    name,
    percentage,
    alt,
    src,
}: {
    name: string
    percentage: string
    alt: string
    src: string
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <div className="flex w-full flex-col items-center justify-center gap-y-5 rounded-lg bg-[#101111] p-5">
                <ImageKitImage className="w-[50px]" alt={alt} src={src} />
                <p className="text-sm text-text-on-primary">{percentage}</p>
            </div>
            <p className="text-[#FEFCE1]">{name}</p>
        </div>
    )
}
