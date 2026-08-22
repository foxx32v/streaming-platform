import { LoaderProps } from "@/src/dto";

export const Loader = ({ size = 40, status = 'loading' }: LoaderProps) => {
    return (
        <div className="loader" style={{ width: size, height: size }}>
            {status === 'loading' && <div className="loaderSpinner" />}
            {status === 'error' && <div className="loaderError">!</div>}
            {status === 'success' && <div className="loaderSuccess">✓</div>}
        </div>
    )
}