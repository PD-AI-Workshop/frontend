import { useStores } from './useStores'

export const useTheme = () => {
    const { themeStore } = useStores()
    return themeStore.isDarkMode
}
