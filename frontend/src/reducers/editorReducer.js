const editorReducer = (state = '', action) => {
    switch (action.type) {
        case 'EDIT':
            console.log(action.payload.content)
            return action.payload.content
        case 'COMPILE':
            console.log('Compile placeholder')
            return state
        case 'SEND':
            console.log('Send placeholder')
            return state
        default:
            return state
    }
}

export const editCode = (content) => { return {
    type: 'EDIT',
    payload: { content }
}}

export const sendToCompiler = () => { return {
    type: 'COMPILE'
}}

export const sendToRobot = () => { return {
    type: 'SEND'
}}

export default editorReducer;