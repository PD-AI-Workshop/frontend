import { useTheme } from "@/hooks/useTheme"
import clsx from "clsx"

const Spinner = () => {
    const isDarkMode = useTheme()

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className={clsx('animate-spin inline-block size-6 border-[3px] border-current border-t-transparent rounded-full',
                {
                    'text-white': isDarkMode,
                    'text-black': !isDarkMode
                }
            )} role="status" aria-label="loading">
                <span className="sr-only">Загрузка...</span>
            </div>
        </div>
    )
}

export default Spinner