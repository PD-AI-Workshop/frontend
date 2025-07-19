import { NotificationProps } from "@/props/NotificationProps"
import { FiCheckCircle, FiXCircle } from "react-icons/fi"

const Notification = ({ notificationType, notificationMessage }: NotificationProps) => {
    return (
        <div className={`fixed top-30 right-4 z-50 flex items-center p-4 rounded-md shadow-lg transform transition-transform duration-300 animate-fadeIn overflow-hidden 
            ${notificationType === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'}
        `}>

            <div className="text-xl mr-2">
                {notificationType === 'success'
                    ? <FiCheckCircle />
                    : <FiXCircle />}
            </div>

            <span>{notificationMessage}</span>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-current opacity-20"></div>
            <div className="absolute bottom-0 right-0 h-1 w-full bg-current opacity-70 origin-right animate-progress"></div>
        </div>
    )
}

export default Notification