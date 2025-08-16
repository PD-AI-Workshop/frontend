export function formatTime(dateString: string): string {
    const date = new Date(dateString)

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString().slice(-2)

    return `${day}.${month}.${year}`
}

export function formatDate(dateInString: string | undefined): string {
    if (dateInString === undefined) {
        throw new Error('Неверный формат даты')
    }

    const date = new Date(dateInString)
    const day = date.getDate()
    const monthNames: string[] = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ]
    const month = monthNames[date.getMonth()]

    return `${day} ${month}`
}
