type videoStatus =
| 'onAir'
| 'recording'
| 'advertisement'

export interface VideoElementProps {
    title: string;
    date: string;
    status: videoStatus;
    image: ImageBitmap;
    duration: string;
    description: string;
    //доделать профель и тд
}

export const VideoElement = () => {
    return (
        <div>

        </div>
    )
}