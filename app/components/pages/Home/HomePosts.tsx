import { Link } from '@remix-run/react'
import { Calendar } from 'lucide-react'
import { FakeBackgroundImagePrimitive } from '~/components/atoms/FakeBackgroundImagePrimitive'
import ImageKitImage from '~/components/atoms/ImageKitImage'
import Card from '~/components/templates/Card'
import { Post } from '~/types/contentful'

export default function HomePosts({ posts }: { posts: Post[] }) {
    return (
        <section id="articles" className="space-y-8 rounded-md">
            <h2 className="heading-gradient py-1 text-center text-4xl md:text-start md:text-5xl">
                Articles
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
                {posts.map((post) => {
                    return (
                        <Link to={`/blog/${post.slug}`} key={post.slug}>
                            <Card className="aspect-square group space-y-5">
                                <div className="overflow-hidden rounded-md">
                                    <FakeBackgroundImagePrimitive.Container className="aspect-square h-[250px] rounded-md">
                                        <FakeBackgroundImagePrimitive.Image
                                            className="rounded-md transition-all duration-200 group-hover:scale-105"
                                            src={post.headerImgUrl!}
                                            alt={post.seoTitle}
                                        />
                                    </FakeBackgroundImagePrimitive.Container>
                                </div>
                                <div className="flex w-fit items-center gap-x-1 rounded-md border border-border-main px-2 py-1 text-text-one">
                                    {post.categories[0]}
                                </div>
                                <div>
                                    <h5 className="text-2xl text-text-two">
                                        {post.seoTitle}
                                    </h5>
                                </div>
                                <div className="flex items-center gap-5 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="size-5" />
                                        <p>{post.formattedCreatedAt}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ImageKitImage
                                            className="h-[25px] w-[25px] rounded-full grayscale"
                                            src="/carlos-molero.jpeg"
                                            alt="Author"
                                        />
                                        <p>Carlos Molero</p>
                                    </div>
                                    <div></div>
                                </div>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
