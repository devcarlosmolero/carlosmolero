import type { Config } from 'tailwindcss'

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {
            typography: ({ theme }) => ({
                dark: {
                    css: {
                        '--tw-prose-body': 'var(--dtr-text-color-one)',
                        '--tw-prose-invert-body': 'var(--dtr-text-color-one)',

                        '--tw-prose-headings': 'var(--dtr-text-color-heading)',
                        '--tw-prose-invert-headings':
                            'var(--dtr-text-color-heading)',

                        '--tw-prose-lead': 'var(--dtr-text-color-one)',
                        '--tw-prose-invert-lead': 'var(--dtr-text-color-one)',

                        '--tw-prose-links': 'var(--dtr-link-color)',
                        '--tw-prose-invert-links': 'var(--dtr-link-color)',

                        '--tw-prose-bold': 'var(--dtr-text-color-two)',
                        '--tw-prose-invert-bold': 'var(--dtr-text-color-two)',

                        '--tw-prose-counters': 'var(--dtr-text-color-three)',
                        '--tw-prose-invert-counters':
                            'var(--dtr-text-color-three)',

                        '--tw-prose-bullets': 'var(--dtr-text-color-three)',
                        '--tw-prose-invert-bullets':
                            'var(--dtr-text-color-three)',

                        '--tw-prose-hr': 'var(--dtr-border-color-main)',
                        '--tw-prose-invert-hr': 'var(--dtr-border-color-main)',

                        '--tw-prose-quotes': 'var(--dtr-text-color-three)',
                        '--tw-prose-invert-quotes':
                            'var(--dtr-text-color-three)',
                        '--tw-prose-quote-borders':
                            'var(--dtr-border-color-main)',
                        '--tw-prose-invert-quote-borders':
                            'var(--dtr-border-color-main)',

                        blockquote: {
                            backgroundColor: 'var(--dtr-base-color-secondary)',
                            padding: '1rem',
                            borderRadius: 'var(--dtr-radius-rounded-small)',
                        },

                        '--tw-prose-captions': 'var(--dtr-text-color-one)',
                        '--tw-prose-invert-captions':
                            'var(--dtr-text-color-one)',

                        '--tw-prose-code': 'var(--dtr-text-color-two)',
                        '--tw-prose-invert-code': 'var(--dtr-text-color-two)',

                        '--tw-prose-pre-code': 'var(--dtr-text-color-two)',
                        '--tw-prose-pre-bg': 'var(--dtr-base-color-secondary)',
                        '--tw-prose-invert-pre-code':
                            'var(--dtr-text-color-two)',
                        '--tw-prose-invert-pre-bg':
                            'var(--dtr-base-color-secondary)',

                        '--tw-prose-th-borders': 'var(--dtr-border-color-main)',
                        '--tw-prose-td-borders': 'var(--dtr-border-color-main)',
                        '--tw-prose-invert-th-borders':
                            'var(--dtr-border-color-main)',
                        '--tw-prose-invert-td-borders':
                            'var(--dtr-border-color-main)',

                        h1: {
                            fontSize: 'var(--dtr-font-size-h1)',
                            fontWeight: 'var(--dtr-font-weight-heading)',
                            lineHeight: 'var(--dtr-line-height-heading)',
                        },
                        h2: {
                            fontSize: 'var(--dtr-font-size-h2)',
                            fontWeight: 'var(--dtr-font-weight-heading)',
                            lineHeight: 'var(--dtr-line-height-heading)',
                        },
                        h3: {
                            fontSize: 'var(--dtr-font-size-h3)',
                            fontWeight: 'var(--dtr-font-weight-heading)',
                            lineHeight: 'var(--dtr-line-height-heading)',
                        },
                        h4: {
                            fontSize: 'var(--dtr-font-size-h4)',
                            fontWeight: 'var(--dtr-font-weight-heading)',
                            lineHeight: 'var(--dtr-line-height-heading)',
                        },
                        h5: {
                            fontSize: 'var(--dtr-font-size-h5)',
                            fontWeight: 'var(--dtr-font-weight-heading)',
                            lineHeight: 'var(--dtr-line-height-heading)',
                        },
                        h6: {
                            fontSize: 'var(--dtr-font-size-h6)',
                            fontWeight: 'var(--dtr-font-weight-heading)',
                            lineHeight: 'var(--dtr-line-height-heading)',
                        },
                        p: {
                            lineHeight: 'var(--dtr-line-height-normal)',
                        },
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
