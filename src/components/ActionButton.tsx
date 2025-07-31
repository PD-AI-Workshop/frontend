import { ActionButtonProps } from '@/props/ActionButtonProps'

const ActionButton = ({ children, onClick, color }: ActionButtonProps) => {
    const colorClasses = {
        primary: 'bg-indigo-600 hover:bg-indigo-700',
        secondary: 'bg-neutral-600 hover:bg-neutral-700',
        danger: 'bg-red-600 hover:bg-red-700',
    }

    return (
        <button
            onClick={onClick}
            className={`w-full p-3 text-white mt-4 text-xl rounded-3xl transition-colors ${colorClasses[color]}`}
        >
            {children}
        </button>
    )
}

export default ActionButton
