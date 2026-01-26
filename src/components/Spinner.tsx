import { useTheme } from "@/hooks/useTheme"

const Spinner = () => {
    const isDarkMode = useTheme()

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className={`animate-spin inline-block size-6 border-[3px] border-current border-t-transparent rounded-full ${isDarkMode ? 'text-white' : 'text-black'}`} role="status" aria-label="loading">
                <span className="sr-only">Загрузка...</span>
            </div>
        </div>
    )
}

export default Spinner