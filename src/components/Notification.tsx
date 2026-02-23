import { NotificationType } from '@/types/NotificationType'
import clsx from 'clsx'
import { CircleCheckBig, CirclePlus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const Notification = ({ type, message, autoClose = 5000 }: NotificationType) => {
    const [isVisible, setIsVisible] = useState(true)
    const [isClosing, setIsClosing] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => setIsVisible(false), 300)
    }

    useEffect(() => {
        if (autoClose > 0) timerRef.current = setTimeout(handleClose, autoClose)

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [autoClose])

    useEffect(() => {
        if (isClosing && timerRef.current) clearTimeout(timerRef.current)
    }, [isClosing])

    if (!isVisible) return null

    return (
        <div
            className={clsx('fixed top-30 right-4 z-50 flex items-start p-4 rounded-md shadow-lg transform transition-transform duration-300 overflow-hidden max-w-xs',
                {
                    'bg-green-100 text-green-800 border border-green-200': type === 'success',
                    'bg-red-100 text-red-800 border border-red-200': type !== 'success'
                },
                {
                    'animate-fadeOut': isClosing,
                    'animate-fadeIn': !isClosing
                }
            )}
        >
            <div className="text-xl mr-2 mt-0.5">
                {type === 'success' ? <CircleCheckBig /> : <CirclePlus className="rotate-45" />}
            </div>

            <div className="flex-1" data-testid="notification-message">{message}</div>

            <button
                onClick={handleClose}
                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Закрыть уведомление"
            >
                <X />
            </button>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-current opacity-20"></div>
            <div
                className={clsx('absolute bottom-0 right-0 h-1 w-full bg-current opacity-70 origin-right',
                    {
                        'animate-progress': !isClosing,
                    }
                )}
            ></div>
        </div>
    )
}

export default Notification
