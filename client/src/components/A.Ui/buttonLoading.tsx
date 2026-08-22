import { ButtonLoadingProps } from "@/src/dto"

export const ButtonLoading = ({ isLoading, type, loadingTitle='Loading...', title, onClick }: ButtonLoadingProps) => {
    return (
        <button
            className={isLoading ? 'buttonLoading' : ''}
            type={type as 'button' | 'submit' | 'reset' | undefined}
            disabled={isLoading}
            onClick={onClick}
            >
            {isLoading ? loadingTitle : title}
        </button>
    )
}