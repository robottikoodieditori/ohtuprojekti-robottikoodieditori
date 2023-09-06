import Button from "./button"

const RobotButton = () => {

    const sendToRobot = () => {
        console.log("Lähetetään koodi robotille")
    }

    return (
        <Button text="Lähetä koodi robotille"
                handleClick={sendToRobot}>
        </Button>
    )
}

export default RobotButton;