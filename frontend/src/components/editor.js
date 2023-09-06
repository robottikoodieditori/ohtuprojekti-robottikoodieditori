import CodeMirror from '@uiw/react-codemirror'; 

const Editor = (props) => {
    return (
        <div>
            <CodeMirror
            onChange={props.eventHandler}
            />
        </div>
    )
}

export default Editor;