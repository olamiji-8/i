import React from 'react'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'

export default function MyEditor({ valueState, setvalueState }) {

  const onEditorStateChange = (editorState) => {
    setvalueState(editorState);
    // console.log(editorState, 'editorstate')
  }

  return (
    <Editor
      editorState={valueState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: ['inline', 'fontSize', 'list', 'link', 'textAlign'],
        // options: ['inline', 'fontSize', 'list','link', 'textAlign', 'history'],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        link: {

          // inDropdown: false
          inDropdown: false,
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          dropdownClassName: undefined,
          showOpenOptionOnHover: true,
          defaultTargetOption: '_self',
          options: ['link', 'unlink'],
          // link: { icon: link, className: undefined },
          // unlink: { icon: unlink, className: undefined },
          linkCallback: undefined

        },
        history: { inDropdown: true },
      }}
    />
  )
}