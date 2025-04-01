import { Fragment, ReactNode } from 'react'
import cn from 'classnames'
import Spinner from '../molecules/Spinner'
import { Link } from '@remix-run/react'
import { RemixLinkProps } from '@remix-run/react/dist/components'

export default function Button({
    children,
    variant = 'ghost',
    to,
    asLink = false,
    isLoading = false,
    hasIcon = false,
    className,
    props,
}: {
    children: ReactNode | string
    variant: 'primary' | 'ghost'
    to?: string
    asLink?: boolean
    isLoading?: boolean
    isDisabled?: boolean
    hasIcon?: boolean
    className?: string
    props?:
        | React.ForwardRefExoticComponent<
              RemixLinkProps & React.RefAttributes<HTMLAnchorElement>
          >
        | React.LinkHTMLAttributes<HTMLLinkElement>
}) {
    function getVariantClassname() {
        switch (variant) {
            case 'primary':
                return 'btn'
            case 'ghost':
                return 'text-text-two hover:text-text-one'
            default:
                return 'text-text-two hover:text-text-one'
        }
    }

    return (
        <Fragment>
            {!asLink && (
                <button
                    className={cn(
                        'transition-all duration-300',
                        getVariantClassname(),
                        className,
                        hasIcon && 'flex items-center gap-x-3',
                        'w-fit rounded-full px-5 py-3'
                    )}
                    {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                >
                    {isLoading && <Spinner />}
                    {!isLoading && <Fragment>{children}</Fragment>}
                </button>
            )}
            {asLink && (
                <Link
                    to={to ?? ''}
                    className={cn(
                        'transition-all duration-300',
                        getVariantClassname(),
                        className,
                        hasIcon && 'flex items-center gap-x-3',
                        'w-fit rounded-full px-5 py-3'
                    )}
                    {...(props as any)}
                >
                    {isLoading && <Spinner />}
                    {!isLoading && <Fragment>{children}</Fragment>}
                </Link>
            )}
        </Fragment>
    )
}
