import type { Config } from 'tailwindcss'

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}', './public/data/*.yml'],
    theme: {
        extend: {
            typography: () => ({
                dark: {
                    css: {
                        '--tw-prose-body': 'var(--cmm-text-color-one)',
                        '--tw-prose-invert-body': 'var(--cmm-text-color-one)',

                        '--tw-prose-headings': 'var(--cmm-text-color-heading)',
                        '--tw-prose-invert-headings':
                            'var(--cmm-text-color-heading)',

                        '--tw-prose-lead': 'var(--cmm-text-color-one)',
                        '--tw-prose-invert-lead': 'var(--cmm-text-color-one)',

                        '--tw-prose-links': 'var(--cmm-link-color)',
                        '--tw-prose-invert-links': 'var(--cmm-link-color)',

                        '--tw-prose-bold': 'var(--cmm-text-color-two)',
                        '--tw-prose-invert-bold': 'var(--cmm-text-color-two)',

                        '--tw-prose-counters': 'var(--cmm-text-color-three)',
                        '--tw-prose-invert-counters':
                            'var(--cmm-text-color-three)',

                        '--tw-prose-bullets': 'var(--cmm-text-color-three)',
                        '--tw-prose-invert-bullets':
                            'var(--cmm-text-color-three)',

                        '--tw-prose-hr': 'var(--cmm-border-color-main)',
                        '--tw-prose-invert-hr': 'var(--cmm-border-color-main)',

                        '--tw-prose-quotes': 'var(--cmm-text-color-three)',
                        '--tw-prose-invert-quotes':
                            'var(--cmm-text-color-three)',
                        '--tw-prose-quote-borders':
                            'var(--cmm-border-color-main)',
                        '--tw-prose-invert-quote-borders':
                            'var(--cmm-border-color-main)',

                        blockquote: {
                            backgroundColor: 'var(--cmm-base-color-secondary)',
                            padding: '1rem',
                            borderRadius: 'var(--cmm-radius-rounded-small)',
                        },

                        '--tw-prose-captions': 'var(--cmm-text-color-one)',
                        '--tw-prose-invert-captions':
                            'var(--cmm-text-color-one)',

                        '--tw-prose-code': 'var(--cmm-text-color-two)',
                        '--tw-prose-invert-code': 'var(--cmm-text-color-two)',

                        '--tw-prose-pre-code': 'var(--cmm-text-color-two)',
                        '--tw-prose-pre-bg': 'var(--cmm-base-color-secondary)',
                        '--tw-prose-invert-pre-code':
                            'var(--cmm-text-color-two)',
                        '--tw-prose-invert-pre-bg':
                            'var(--cmm-base-color-secondary)',

                        '--tw-prose-th-borders': 'var(--cmm-border-color-main)',
                        '--tw-prose-td-borders': 'var(--cmm-border-color-main)',
                        '--tw-prose-invert-th-borders':
                            'var(--cmm-border-color-main)',
                        '--tw-prose-invert-td-borders':
                            'var(--cmm-border-color-main)',

                        h1: {
                            fontSize: 'var(--cmm-font-size-h1)',
                            fontWeight: 'var(--cmm-font-weight-heading)',
                            lineHeight: 'var(--cmm-line-height-heading)',
                        },
                        h2: {
                            fontSize: 'var(--cmm-font-size-h2)',
                            fontWeight: 'var(--cmm-font-weight-heading)',
                            lineHeight: 'var(--cmm-line-height-heading)',
                        },
                        h3: {
                            fontSize: 'var(--cmm-font-size-h3)',
                            fontWeight: 'var(--cmm-font-weight-heading)',
                            lineHeight: 'var(--cmm-line-height-heading)',
                        },
                        h4: {
                            fontSize: 'var(--cmm-font-size-h4)',
                            fontWeight: 'var(--cmm-font-weight-heading)',
                            lineHeight: 'var(--cmm-line-height-heading)',
                        },
                        h5: {
                            fontSize: 'var(--cmm-font-size-h5)',
                            fontWeight: 'var(--cmm-font-weight-heading)',
                            lineHeight: 'var(--cmm-line-height-heading)',
                        },
                        h6: {
                            fontSize: 'var(--cmm-font-size-h6)',
                            fontWeight: 'var(--cmm-font-weight-heading)',
                            lineHeight: 'var(--cmm-line-height-heading)',
                        },
                        p: {
                            lineHeight: 'var(--cmm-line-height-normal)',
                        },
                    },
                },
            }),
            fontFamily: {
                sans: ['Inter Tight'],
            },
            colors: {
                'base-primary': 'var(--cmm-base-color-primary)',
                'base-secondary': 'var(--cmm-base-color-secondary)',
                'base-tertiary': 'var(--cmm-base-color-tertiary)',
                'base-quaternary': 'var(--cmm-base-color-quaternary)',

                'text-one': 'var(--cmm-text-color-one)',
                'text-two': 'var(--cmm-text-color-two)',
                'text-three': 'var(--cmm-text-color-three)',
                'text-four': 'var(--cmm-text-color-four)',

                'text-on-primary': 'var(--cmm-text-on-base-primary)',
                'text-on-secondary': 'var(--cmm-text-on-base-secondary)',
                'text-on-tertiary': 'var(--cmm-text-on-base-tertiary)',
                'text-on-quaternary': 'var(--cmm-text-on-base-quaternary)',

                heading: 'var(--cmm-text-color-heading)',
                'heading-link': 'var(--cmm-text-color-heading-link)',
                link: 'var(--cmm-link-color)',
                'link-hover': 'var(--cmm-link-hover-color)',

                'border-main': 'var(--cmm-border-color-main)',

                'input-bg': 'var(--cmm-input-bg)',
                'input-text': 'var(--cmm-input-color)',
                'input-border': 'var(--cmm-input-border-color)',
                'input-focus-border': 'var(--cmm-input-focus-border-color)',

                btn: 'var(--cmm-btn-color)',
                'btn-hover': 'var(--cmm-btn-hover-color)',
                'btn-border': 'var(--cmm-btn-border-color)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('tailwind-hamburgers'),
        require('@tailwindcss/typography'),
    ],
} satisfies Config
