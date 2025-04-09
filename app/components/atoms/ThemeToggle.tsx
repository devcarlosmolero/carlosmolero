import { useNavigate } from '@remix-run/react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
    const navigate = useNavigate()
    function switchTheme() {
        const search = window.location.search
        navigate(
            `${window.location.pathname}${search}${search.length > 0 ? '&' : '?'}action=switch_theme`,
            {
                replace: true,
                preventScrollReset: true,
            }
        )
    }

    return (
        <button
            className="group flex h-[32px] min-h-[32px] w-[32px] min-w-[32px] items-center justify-center rounded-full border border-border-main p-2 lg:h-[50px] lg:min-h-[50px] lg:w-[50px] lg:min-w-[50px]"
            onClick={() => switchTheme()}
        >
            <Sun className="hidden size-4 text-text-two dark:block" />
            <Moon className="size-4 dark:hidden" />
        </button>
    )
}
