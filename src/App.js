import React, { forwardRef, Ref, useImperativeHandle, useRef } from "react";
import Editor from "./Editor";
import { isFunction } from "lodash";

import "remirror/styles/all.css";
import "./styles.css";

export default function App() {
  const editorRef = React.useRef();
  // const { useRemirrorContext, prosemirrorNodeToHtml } = editorRef.current || {};

  return (
    <div className="App">
      <div className="editor-container">
        <div className="remirror-theme">
          <Editor ref={() => editorRef} />
        </div>

        <button
          onClick={() => {
            console.log("click show");
            if (editorRef) {
              console.log(editorRef);
            }
            // if (context && prosemirrorNodeToHtml) {
            //   console.log(editorRef);
            //   const ctx = context();
            //   const { view } = ctx;
            //   const htmlString = prosemirrorNodeToHtml(view.state.doc);
            //   console.log(htmlString);
            // }
          }}
        >
          get context
        </button>
      </div>
    </div>
  );
}
