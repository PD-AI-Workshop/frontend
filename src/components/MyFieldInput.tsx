import { MyFieldInputPropsType } from '@/types/MyFieldInputPropsType'
import clsx from 'clsx'
import { ErrorMessage, Field } from 'formik'

const MyFieldInput = ({ value, type, placeholder, isTouched, error, isSmall = false, isMobile }: MyFieldInputPropsType) => {
    return (
        <div className="mt-4">
            <Field
                id={value}
                name={value}
                type={type}
                placeholder={placeholder}
                className={clsx(
                    "px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 transition-colors",
                    {
                        'w-2xs': !(isSmall <= isMobile),
                        'w-full': isSmall <= isMobile,
                    },
                    {
                        'border-red-500 focus:ring-red-500 focus:border-red-500': isTouched && error,
                        'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !(isTouched && error),
                    }
                )}
            />
            <ErrorMessage name={value} component="div" className="mt-1.5 text-sm text-red-600" />
        </div>
    )
}

export default MyFieldInput
