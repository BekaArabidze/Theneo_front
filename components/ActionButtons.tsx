import { ArrowRightCircle, Info, X } from "react-feather"
import Button from "./button/Button"





const ActionButtons = ({
    cancel, handleSubmit, isSubmitVisible, isElementVisible }) => {
    return (
        <>
            <div className='action_buttons'>
                <Button
                    className='spec_submit_btn'
                    style={isSubmitVisible ?
                        { opacity: 1, width: '100%' } :
                        { opacity: 0.5, pointerEvents: 'none', width: '100%' }}
                    type="submit"
                    onClick={handleSubmit}
                    padding={[5, 13, 5.5, 13]}
                    theme="blue"
                    EndIcon={<ArrowRightCircle color={'var(--white--white)'} />}
                >
                    <p style={{ color: "var(--white--white)" }}>
                        submit
                    </p>
                </Button>


                <Button
                    onClick={cancel}
                    className='spec_cancel_btn'
                    style={isElementVisible ?
                        { opacity: 1, width: '100%' } :
                        { display: "none", opacity: 0.5, pointerEvents: 'none' }}
                    padding={[5, 13, 5.5, 13]}
                    theme="red"
                    EndIcon={<X color={'var(--white--white)'} />}>
                    <p style={{ color: "var(--white--white)" }}>
                        cancel
                    </p>
                </Button>
            </div>
        </>
    )
}

export default ActionButtons