import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  ContentState,
  EditorState,
  Modifier,
  RichUtils,
  convertFromHTML,
  convertToRaw
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useEffect, useState } from 'react';

interface IPropsEditor {
  content?: any
  setDescription: (value: string) => void
  height?: string
  placeholder?: string
}

export default function FieldEditor(props: IPropsEditor): React.JSX.Element {
  const [editorState, setEditorState] = useState(() => {
    const defaultTemplate = props?.content || '';
    const defaultContent = props?.content || defaultTemplate;

    const blocksFromHTML = convertFromHTML(defaultContent);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  });

  useEffect(() => {
    const defaultTemplate = props?.content || ''

    const blocksFromHTML = convertFromHTML(defaultTemplate);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(contentState))
  }, [props?.content])

  const handleEditorChange = (state: any) => {
    setEditorState((prevState) => { return state });

  };

  useEffect(() => {
    if (props?.setDescription) {
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      if (html === '<p></p>\n') {
        props?.setDescription('');
      } else {
        props?.setDescription(html);
      }
    }
  }, [editorState])

  const handleKeyCommand = ({ command, editorState }: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    if (command === 'tab') {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const newContentState = Modifier.replaceText(
        contentState,
        selectionState
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        'insert-characters'
      );
      setEditorState(newEditorState);
      return 'handled';
    }

    return 'not-handled';
  };


  return (
    <div
      className=""
      style={{
        border: '2px solid #f9f9f9',
        height: '100%',
        width: '100%',
        color: 'black',
        borderRadius: '10px'
      }}
    >
      <Editor
        editorStyle={{ minHeight: `${props?.height}px` || '100%', background: '#FAFAFA', padding: '10px 20px', borderRadius: '10px', scrollbarWidth: 'none' }}
        placeholder={props?.placeholder}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName=""
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  )
}