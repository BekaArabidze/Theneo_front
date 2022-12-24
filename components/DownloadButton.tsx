import { Download, Clipboard } from 'react-feather';


interface IButtonProps {
    link: string
    fileName: string
}

const DownloadButton = ({ link, fileName }: IButtonProps) => {
    return (
        <>
            <a className='download_btn' href={link} target="_blank" download={fileName}>
                <Download color={'var(--white--white)'} />
                <p>download</p>
            </a>
        </>
    )
}

export default DownloadButton