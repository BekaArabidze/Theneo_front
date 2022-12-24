import { Dispatch, SetStateAction } from 'react';
import TextInput from './textInput/TextInput';

interface ISpecInfoProps {
    setSpecInfo: Dispatch<SetStateAction<{
        version: string;
        title: string;
        url: string;
        description: string;
    }>>;
    specInfo: {
        version: string;
        title: string;
        url: string;
        description: string;
    }
}

const SpecInfo = ({ specInfo, setSpecInfo }: ISpecInfoProps) => {



    return (
        <div className="spec_info">

            <h1 style={{ textAlign: "center" }}>spec info</h1>

            <TextInput
                label='version'
                placeholder='1.0.0'
                padding={[9, 12, 9, 12]}
                value={specInfo.version}
                onChange={({ currentTarget: { value } }) =>
                    setSpecInfo({ ...specInfo, version: value })}
            />

            <TextInput
                label='title'
                placeholder='text here'
                padding={[9, 12, 9, 12]}
                value={specInfo.title}
                onChange={({ currentTarget: { value } }) =>
                    setSpecInfo({ ...specInfo, title: value })}
            />


            <TextInput
                label='URL'
                placeholder='https://beqa.dev'
                padding={[9, 12, 9, 12]}
                value={specInfo.url}
                onChange={({ currentTarget: { value } }) =>
                    setSpecInfo({ ...specInfo, url: value })}
            />

            <TextInput
                label='description'
                placeholder='API documentation'
                padding={[9, 12, 9, 12]}
                value={specInfo.description}
                onChange={({ currentTarget: { value } }) =>
                    setSpecInfo({ ...specInfo, description: value })}
            />

        </div>
    )
}

export default SpecInfo