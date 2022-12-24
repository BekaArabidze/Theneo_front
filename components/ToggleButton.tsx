
interface IToggleButtonProps {
    changeFormat: () => void;
    isJson: boolean;
}


const ToggleButton = ({ changeFormat, isJson }: IToggleButtonProps) => {
    return (
        <>
            <div className="toggle" >
                <span style={isJson ? { color: "var(--blue--blue)" } :
                    { color: "var(--black--black)" }}>
                    <p>JSON</p>
                </span>

                <input
                    type="checkbox" id="switch"
                    checked={!isJson}
                    onChange={changeFormat}
                />

                <label
                    htmlFor={"switch"}
                    className="toggle_label">
                    Toggle
                </label>

                <span style={isJson ? { color: "var(--black--black)" } :
                    { color: "var(--yellow--yellow)" }}>
                    <p>YAML</p>
                </span>




                <style>
                    {`
                        input[type="checkbox"] {
                            height: 0;
                            width: 0;
                            visibility: hidden;
                        }

                        .toggle_label {
                            cursor: pointer;
                            text-indent: -9999px;
                            width: 40px;
                            height: 20px;
                            background-color: 
                            ${isJson ? "var(--blue--blue)" : "var(--yellow--yellow)"};
                            display: block;
                            border-radius: 100px;
                            position: relative;
                        }

                        .toggle_label:after {
                            content: "";
                            position: absolute;
                            top: 5px;
                            left: 5px;
                            width: 10px;
                            height: 10px;
                            background: #fff;
                            border-radius: 90px;
                            transition: 0.3s;
                        }

                        input:checked + .toggle_label {
                            background-color:
                            ${isJson ? "var(--blue--blue)" : "var(--yellow--yellow)"};
                        }

                        input:checked + .toggle_label:after {
                            left: calc(50% - 5px);
                            transform: translateX(100%);
                        }

                        .toggle_label:active:after {
                            width: 20px;
                        }
                    `}

                </style>
            </div>
        </>
    )
}

export default ToggleButton