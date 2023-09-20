const highlightReducer = (state = '', action) => {
    switch (action.type) {
    case 'SETWORD':
        console.log(action.payload.content)
        return action.payload.content
    case 'RESET':
        console.log('RESET')
        return ''
    default:
        return state
    }
}


export const setWord = (content) => { return {
    type: 'SETWORD',
    payload: { content }
}}

export const resetWord = () => { return {
    type: 'RESET',
}}

export default highlightReducer