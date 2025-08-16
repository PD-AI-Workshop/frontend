import { useStores } from '@/hooks/useStores'
import { useTheme } from '@/hooks/useTheme'
import { Moon, Sun } from 'lucide-react'

const ThemeToggleButton = () => {
    const { themeStore } = useStores()
    const isDarkMode = useTheme()

    return (
        <div className="flex justify-center mb-3">
            <div
                onClick={() => themeStore.toggleTheme()}
                className={`relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer border-1
                transition-colors duration-300 ${isDarkMode ? 'bg-black border-gray-500' : 'bg-gray-200 border-amber-300'}`}
            >
                <div
                    className={`absolute left-2 transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
                >
                    <Sun className="h-4 w-4 text-yellow-500" />
                </div>

                <div
                    className={`absolute right-2 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
                >
                    <Moon className="h-4 w-4 text-gray-300" />
                </div>
            </div>
        </div>
    )
}

export default ThemeToggleButton
