export interface LoaderProps {
    size?: number;
    status: "loading" | "error" | "success" | null;
}