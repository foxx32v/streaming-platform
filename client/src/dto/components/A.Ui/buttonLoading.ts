export interface ButtonLoadingProps {
    isLoading: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined
    loadingTitle?: string|undefined;
    title: string|undefined;
    onClick?: () => void;
}