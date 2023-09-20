import PropTypes from 'prop-types';
import Editor from "./editor";
import Button from "./button";

const EditorView = (props) => {
    return (
        <div id='editorview'>
            <header className="App-header">
                <h1>Koodieditori</h1>
                <p>{props.data.date}</p>
                <p>Kirjoita koodia:</p>
            </header>
            <Editor doc={String.raw`\tekstiä tähän`}/>
            <Button function={'COMPILE'} text={'Lähetä koodi kääntäjälle'} />
            <Button function={'SEND'} text={'Lähetä koodi robotille'} />
        </div>
    )
}

EditorView.propTypes = {
    data: PropTypes.shape({
        date: PropTypes.string.isRequired
    }).isRequired
}

export default EditorView;
