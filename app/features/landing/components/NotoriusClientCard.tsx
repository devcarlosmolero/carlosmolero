import { Link } from 'lucide-react'
import Button from '~/components/atoms/Button'

export default function NotoriousClientCard({
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
