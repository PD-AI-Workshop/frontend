import { useStores } from '@/hooks/useStores'
import { useTheme } from '@/hooks/useTheme'
import clsx from 'clsx'
import { Moon, Sun } from 'lucide-react'

const ThemeToggleButton = () => {
    const { themeStore } = useStores()
    const isDarkMode = useTheme()

    return (
        <div className="flex justify-center mb-3">
            <div
                onClick={() => themeStore.toggleTheme()}
                className={clsx('relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer border-1 transition-colors duration-300',
                    {
                        'bg-black border-gray-500': isDarkMode,
                        'bg-gray-200 border-amber-300': !isDarkMode
                    }
                )}>
                <div
                    className={clsx('absolute left-2 transition-opacity duration-300',
                        {
                            'opacity-0': isDarkMode,
                            'opacity-100': !isDarkMode
                        }
                    )}>
                    <Sun className="h-4 w-4 text-yellow-500" />
                </div>

                <div
                    className={clsx('absolute right-2 transition-opacity duration-300',
                        {
                            'opacity-100': isDarkMode,
                            'opacity-0': !isDarkMode
                        }
                    )}>
                    <Moon className="h-4 w-4 text-gray-300" />
                </div>
            </div>
        </div>
    )
}

export default ThemeToggleButton
