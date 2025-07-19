import { Moon, Sun } from "lucide-react"
import { useState } from "react"

const ThemeToggleButton = () => {
    const [isToggled, setIsToggled] = useState(false)

    const handleToggle = () => {
        setIsToggled(!isToggled)
    }


    return (
        <div className="flex justify-center mb-3">
            <div
                onClick={handleToggle}
                className={`
                                relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer 
                                transition-colors duration-300 ${isToggled ? 'bg-black' : 'bg-gray-200'}
                            `}
            >
                <div className={`absolute left-2 transition-opacity duration-300 ${isToggled ? 'opacity-0' : 'opacity-100'}`}>
                    <Sun className="h-4 w-4 text-yellow-500" />
                </div>

                <div className={`absolute right-2 transition-opacity duration-300 ${isToggled ? 'opacity-100' : 'opacity-0'}`}>
                    <Moon className="h-4 w-4 text-gray-300" />
                </div>
            </div>
        </div>
    )
}

export default ThemeToggleButton