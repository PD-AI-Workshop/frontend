'use client'

import { useEffect } from 'react'

const ThemeInitializer = () => {
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const initialTheme = savedTheme ? savedTheme === 'dark' : systemPrefersDark

        document.documentElement.classList.toggle('dark', initialTheme)
    }, [])

    return null
}

export default ThemeInitializer
