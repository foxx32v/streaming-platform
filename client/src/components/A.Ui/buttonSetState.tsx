import { ButtonSetStateProps } from "@/src/dto/"
import { usePageStore } from '@/src/store/';

export const ButtonSetState = ({ page, title }: ButtonSetStateProps) => {
    const { setPage, currentPage } = usePageStore()

    return (
        <button
            className={currentPage === page ? 'buttonActive' : 'button'}
            onClick={() => setPage(page)}>
            {title}
        </button>
    )
}