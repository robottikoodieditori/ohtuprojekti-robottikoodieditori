import Button from "./button"

const CompileButton = () => {

    const sendToCompiler = () => {
        console.log("Lähetetään koodi kääntäjälle")
    }

    return (
        <Button text="Lähetä koodi kääntäjälle"
                handleClick={sendToCompiler}>
        </Button>
    )
}

export default CompileButton;