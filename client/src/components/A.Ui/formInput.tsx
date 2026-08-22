import { FormInputProps } from "@/src/dto";

export const FormInput = ({ name, label, type = "text", register, error }: FormInputProps) => (
    <div className='formInput'>
        <label>{label}</label>
        <input {...register(name)} type={type} placeholder={label} />
        {error && <p>{error.message}</p>}
    </div>
)