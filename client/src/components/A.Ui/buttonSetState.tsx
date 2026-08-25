import { ButtonSetStateProps } from "@/src/dto/"
import { usePageStore } from '@/src/store/';

export const ButtonSetState = ({ page, title, fullWidth }: ButtonSetStateProps) => {
    const { setPage, currentPage } = usePageStore()

    return (
        <button
            className={currentPage === page ? 'buttonActive' : 'button'}
            style={{ width: fullWidth ? '100%' : 'auto' }}
            onClick={() => setPage(page)}>
            {title}
        </button>
    )
}