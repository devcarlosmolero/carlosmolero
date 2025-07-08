import Page from '~/components/templates/Page'
import Hero from './Hero'
import { IPost } from '~/types/contentful'
import Portfolio from './Portfolio'
import Posts from './Posts'
import Services from './Services'
import Testimonials from './Testimonials'

export default function LandingPage({
    servicesData,
    notoriusClientsData,
    caseStudiesData,
    repositoriesData,
    testimonialsData,
    posts,
}: {
    servicesData: any
    notoriusClientsData: any
    caseStudiesData: any
    repositoriesData: any
    testimonialsData: any
    posts: IPost[]
}) {
    return (
        <Page>
            <Hero />
            <Services servicesData={servicesData} />
            <Portfolio
                notoriousClientsData={notoriusClientsData}
                caseStudiesData={caseStudiesData}
                repositoriesData={repositoriesData}
            />
            <Testimonials testimonialsData={testimonialsData} />
            <Posts posts={posts as IPost[]} />
        </Page>
    )
}
