import type { Config } from 'tailwindcss'

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            typography: ({ theme }) => ({
                dark: {
                    css: {
                        '--tw-prose-body': theme('colors.gray[300]'),
                        '--tw-prose-headings': theme('colors.white'),
                        '--tw-prose-lead': theme('colors.gray[200]'),
                        '--tw-prose-links': theme('colors.violet[300]'),
                        '--tw-prose-bold': theme('colors.white'),
                        '--tw-prose-counters': theme('colors.gray[400]'),
                        '--tw-prose-bullets': theme('colors.violet[300]'),
                        '--tw-prose-hr': theme('colors.gray[600]'),
                        '--tw-prose-quotes': theme('colors.white'),
                        '--tw-prose-quote-borders': theme('colors.gray[600]'),
                        '--tw-prose-captions': theme('colors.gray[400]'),
                        '--tw-prose-code': theme('colors.white'),
                        '--tw-prose-pre-code': theme('colors.gray[800]'),
                        '--tw-prose-pre-bg': theme('colors.black'),
                        '--tw-prose-th-borders': theme('colors.gray[600]'),
                        '--tw-prose-td-borders': theme('colors.gray[500]'),
                        '--tw-prose-invert-body': theme('colors.white'),
                        '--tw-prose-invert-headings': theme('colors.black'),
                        '--tw-prose-invert-lead': theme('colors.gray[200]'),
                        '--tw-prose-invert-links': theme('colors.violet[300]'),
                        '--tw-prose-invert-bold': theme('colors.white'),
                        '--tw-prose-invert-counters': theme('colors.gray[400]'),
                        '--tw-prose-invert-bullets':
                            theme('colors.violet[500]'),
                        '--tw-prose-invert-hr': theme('colors.gray[200]'),
                        '--tw-prose-invert-quotes': theme('colors.black'),
                        '--tw-prose-invert-quote-borders':
                            theme('colors.gray[200]'),
                        '--tw-prose-invert-captions': theme('colors.gray[400]'),
                        '--tw-prose-invert-code': theme('colors.black'),
                        '--tw-prose-invert-pre-code': theme('colors.white'),
                        '--tw-prose-invert-pre-bg': 'rgb(255 255 255 / 50%)',
                        '--tw-prose-invert-th-borders':
                            theme('colors.gray[200]'),
                        '--tw-prose-invert-td-borders':
                            theme('colors.gray[300]'),
                    },
                },
            }),
            fontFamily: {
                sans: ['Inter Tight'],
            },
            colors: {
                'base-primary': 'var(--dtr-base-color-primary)',
                'base-secondary': 'var(--dtr-base-color-secondary)',
                'base-tertiary': 'var(--dtr-base-color-tertiary)',
                'base-quaternary': 'var(--dtr-base-color-quaternary)',

                'text-one': 'var(--dtr-text-color-one)',
                'text-two': 'var(--dtr-text-color-two)',
                'text-three': 'var(--dtr-text-color-three)',
                'text-four': 'var(--dtr-text-color-four)',

                'text-on-primary': 'var(--dtr-text-on-base-primary)',
                'text-on-secondary': 'var(--dtr-text-on-base-secondary)',
                'text-on-tertiary': 'var(--dtr-text-on-base-tertiary)',
                'text-on-quaternary': 'var(--dtr-text-on-base-quaternary)',

                heading: 'var(--dtr-text-color-heading)',
                'heading-link': 'var(--dtr-text-color-heading-link)',
                link: 'var(--dtr-link-color)',
                'link-hover': 'var(--dtr-link-hover-color)',

                'border-main': 'var(--dtr-border-color-main)',

                'input-bg': 'var(--dtr-input-bg)',
                'input-text': 'var(--dtr-input-color)',
                'input-border': 'var(--dtr-input-border-color)',
                'input-focus-border': 'var(--dtr-input-focus-border-color)',

                btn: 'var(--dtr-btn-color)',
                'btn-hover': 'var(--dtr-btn-hover-color)',
                'btn-border': 'var(--dtr-btn-border-color)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('tailwind-hamburgers'),
        require('@tailwindcss/typography'),
    ],
} satisfies Config
