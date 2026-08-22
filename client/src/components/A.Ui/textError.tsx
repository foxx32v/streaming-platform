import { ErrorTextProps } from "@/src/dto"

export const TextError = ({error}: ErrorTextProps) => {
    return (
        <p className="textError">
            {error||'Error'}
        </p>
    )
}