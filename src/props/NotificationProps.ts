export interface NotificationProps {
    notificationType: 'success' | 'error'
    notificationMessage: string
    autoClose?: number
}
