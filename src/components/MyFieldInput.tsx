import { MyFieldInputProps } from "@/props/MyFieldInputProps"
import { ErrorMessage, Field } from "formik"

const MyFieldInput = ({ value, type, placeholder, isTouched, error, isSmall = false, isMobile }: MyFieldInputProps) => {
    return (
        <div className="mt-4">
            <Field
                id={value}
                name={value}
                type={type}
                placeholder={placeholder}
                className={`${!(isSmall <= isMobile) ? 'w-2xs' : 'w-full'} px-4 py-3 rounded-2xl border ${isTouched && error
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    } focus:outline-none focus:ring-2 transition-colors`}
            />
            <ErrorMessage name={value} component="div" className="mt-1.5 text-sm text-red-600" />
        </div>
    )
}

export default MyFieldInput