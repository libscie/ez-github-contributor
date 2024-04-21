import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';

import {
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown';

import ExampleTheme from './ExampleTheme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { useState } from 'react';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
    namespace: 'Easy GitHub Contributor',
    nodes: [
      HorizontalRuleNode,
      CodeNode,
      LinkNode,
      ListNode,
      ListItemNode,
      HeadingNode,
      QuoteNode,
    ],
    // Handling of errors during update
    onError(error: Error) {
      throw error;
    },
    // The editor theme
    theme: ExampleTheme,
  };
  

  
  function Editor() {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [contact, setContact] = useState("")
    const onChange = (editorState: any) => {
        editorState.read(() => {
            const markdown = $convertToMarkdownString(TRANSFORMERS);
            setBody(markdown);
        });
    }
  
  return (
    <form>
      <label htmlFor="titleInput">Title</label>
      <input id="titleInput" type="text" value={title} onChange={(event) => {setTitle(event.target.value)}} required/>
    <LexicalComposer initialConfig={editorConfig}>
    <div className="editor-container">
      <ToolbarPlugin />
      <div className="editor-inner">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
          />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <OnChangePlugin onChange={onChange} />
      </div>
    </div>
    <label htmlFor="contactInput">Contact information</label>
    <p>For clarifications or follow up.</p>
    <input id="contactInput" type="email" value={contact} onChange={(event) => {setContact(event.target.value)}} placeholder='email@example.com'/>
    <button
        type="submit"
        className="rounded bg-indigo-600 px-2 py-1 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          alert(`${title}
          ${body}
          `)
        }}

        >
        Submit
      </button>
  </LexicalComposer>
        </form>
  );
}

export default Editor