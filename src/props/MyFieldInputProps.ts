export interface MyFieldInputProps {
    value: string
    type: 'text' | 'password'
    placeholder: string
    isTouched: boolean | undefined
    error: string | undefined
    isSmall?: boolean
    isMobile: boolean
}
