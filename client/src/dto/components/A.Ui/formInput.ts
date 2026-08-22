import { FieldError, UseFormRegister } from "react-hook-form"

export interface FormInputProps {
    name: string
    label: string
    type?: string
    register: UseFormRegister<any>
    error?: FieldError
}