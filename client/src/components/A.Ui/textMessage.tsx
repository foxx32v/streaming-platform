import { MessageTextProps } from "@/src/dto"

export const TextMessage = ({message}: MessageTextProps) => {
    return (
        <p className="textMessage">
            {message}
        </p>
    )
}