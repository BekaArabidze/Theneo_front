import { CSSProperties, InputHTMLAttributes, MouseEventHandler, useMemo, cloneElement, PropsWithChildren } from "react";
import c from "./styles/TextInput.module.scss";
import { forwardRef } from 'react';


interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
    padding: number[];
    onHover?: MouseEventHandler;
    bgColor?: string;
    EndIcon?: JSX.Element;
    label?: string;
    helpText?: string;
    style?: CSSProperties,
    name?:string
}



const TextInput = forwardRef<HTMLInputElement, PropsWithChildren<ITextInput>>(({
    placeholder,
    padding,
    disabled,
    className,
    type,
    onChange,
    value,
    defaultValue,
    label,
    helpText,
    EndIcon,
    style,
    name
}, ref: React.Ref<HTMLInputElement | null>,) => {



    const TextInputPropStyles = useMemo((): CSSProperties => {
        return {
            cursor: `${disabled ? 'not-allowed' : 'text'}`,
            padding: `
                    calc(${padding[0]} * .1vw) calc(${padding[1]} * .1vw)
                    calc(${padding[2]} * .11vw) calc(${padding[3]} * .1vw)`,
        };
    }, [padding, disabled]);




    return (
        <>
            <div className={`${c.text_input} ${className}`} style={style}>
                {label
                    &&
                    <p
                        style={{ marginBottom: "0.3rem", opacity: "90%" }}
                        className="f-size-p3 f-weight-500">
                            {label}
                    </p>
                }


                <div className={c.text_input_container}>

                    <input
                    name={name}
                        className={`${c.input} f-size-p4`}
                        style={TextInputPropStyles}
                        placeholder={placeholder}
                        /* @ts-ignore */
                        ref={ref}
                        type={type}
                        value={value}
                        onChange={onChange}
                        defaultValue={defaultValue}
                    />


                    {EndIcon && (
                        <div className={c.icon_bg}>
                            {
                                cloneElement(EndIcon, {
                                    style: {
                                        transform: 'translate(-100%, 25%)',
                                        zIndex: 1,
                                        right: 0,
                                        position: "absolute"
                                    },
                                })
                            }
                        </div>

                    )}
                </div>


                {helpText
                    &&
                    <p
                        style={{ marginTop: "0.3rem", opacity: "70%" }}
                        className="f-size-p6 f-weight-500">
                        {helpText}
                    </p>
                }
            </div>
        </>
    );
});

TextInput.displayName = 'TextInput';

export default TextInput;