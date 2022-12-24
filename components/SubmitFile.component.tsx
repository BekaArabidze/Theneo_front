"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from 'react'
import YAML from "js-yaml";
import { Upload } from 'react-feather';
import { fileContentReader } from "../utils/FileContentReader";
import { handleFetchData } from 'utils/HandleFetchData';
import Editor from "@monaco-editor/react";
import ToggleButton from './ToggleButton';
import DownloadButton from './DownloadButton';
import SpecInfo from './SpecInfo';
import ActionButtons from "./ActionButtons";


const SubmitFile = () => {
    const router = useRouter();
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const [specInfo, setSpecInfo] = useState(
        { version: "1.0.0", title: "API documentation", url: "beqa.dev", description: "API documentation" })
    const [isJson, setIsJson] = useState(true);
    const [blobUrl, setBlobUrl] = useState(null);
    const [resolved, setResolved] = useState({ json: "", yaml: "" })

    const [isSubmitVisible, setIsSubmitVisible] = useState(false)
    const [isElementVisible, setIsElementVisible] = useState(false)


    const createsBlobFile = (input: string | File) => {
        const blob = new Blob([input], { type: 'text/plain' });
        const fileOfBlob = new File([blob], `code.js`);
        return fileOfBlob
    }


    const handleSubmit = async () => {
        const input = inputRef.current.getValue("javascript");
        const formData = new FormData();
        const fileOfBlob = createsBlobFile(input)

        formData.append('file', fileOfBlob);
        formData.append('version', specInfo.version);
        formData.append('title', specInfo.title);
        formData.append('url', specInfo.url);
        formData.append('description', specInfo.description);


        const res = await handleFetchData(formData);
        const response = await res.json();

        const str = JSON.stringify(response, null, 2);
        const bytes = new TextEncoder().encode(str);

        const jsonBlob = new Blob([bytes], { type: "application/json;charset=utf-8" });
        const yamlBlob = new Blob([YAML.dump(response)], { type: 'text/yaml;charset=utf-8' });
        const json = URL.createObjectURL(new Blob([jsonBlob]));
        const yaml = URL.createObjectURL(new Blob([yamlBlob]));

        setIsSubmitVisible(false)
        setIsElementVisible(true)
        setResolved({ ...resolved, json: JSON.stringify(response, null, 2), yaml: YAML.dump(response) })
        setBlobUrl({ json, yaml })
        outputRef.current.setValue(resolved.json);
    };


    const changeFormat = () => {
        outputRef.current.setValue(isJson ? resolved.yaml : resolved.json)
        outputRef.current.getAction('editor.action.formatDocument').run();
        setIsJson((prev) => !prev);
    }

    const addFile = async (event: any) => {
        const text = await fileContentReader(event)
        inputRef.current.setValue(text);
    }


    const outputOnDidMount = (editor: any) => {
        outputRef.current = editor;
        outputRef.current.setValue(resolved.json);
        outputRef.current.getAction('editor.action.formatDocument').run();
        setIsJson(true)
    }

    const cancel = () => {
        setIsSubmitVisible(false)
        setIsElementVisible(false)
        setResolved({ json: "", yaml: "" })
        setBlobUrl(null)
        router.refresh();
    }

    return (
        <div className='form_container'>
            <div className='editor_container'>
                <div className='input-code-wrapper' >

                    <input id="upload" type="file" onChange={addFile} />
                    <label htmlFor="upload">
                        <Upload color={'var(--white--white)'} />
                        <span> choose a file</span>
                    </label>


                    <div className="input-editor base_editor_container">
                        <Editor
                            height="100%"
                            defaultLanguage="javascript"
                            onMount={(editor) => inputRef.current = editor}
                            className="input_editor"
                            onChange={() => setIsSubmitVisible(true)}
                        />
                    </div>

                </div>





                <ActionButtons
                    handleSubmit={handleSubmit}
                    cancel={cancel}
                    isSubmitVisible={isSubmitVisible}
                    isElementVisible={isElementVisible}
                />




                <div className='output-code-wrapper' >
                    <div className='download'>
                        {isElementVisible &&
                            <>
                                <ToggleButton isJson={isJson} changeFormat={changeFormat} />

                                <DownloadButton link={isJson ? blobUrl?.json : blobUrl?.yaml} fileName={`spec.${isJson ? 'json' : 'yaml'}`} />
                            </>
                        }

                    </div>


                    <div className="output-editor base_editor_container">
                        <Editor
                            height="100%"
                            language={isJson ? 'json' : 'yaml'}
                            value={isJson ? resolved.json : resolved.yaml}
                            onMount={(editor) => outputOnDidMount(editor)}
                            className="output_editor"
                        />
                        {isSubmitVisible &&
                            <>
                                <SpecInfo
                                    specInfo={specInfo}
                                    setSpecInfo={setSpecInfo}
                                />

                                <div style={{ zIndex: "1" }}
                                    className='blur' />
                            </>
                        }
                    </div>

                </div>
            </div>


        </div>
    )
}

export default SubmitFile