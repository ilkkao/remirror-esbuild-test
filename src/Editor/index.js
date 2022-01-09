// import "remirror/styles/all.css";
import React, { forwardRef, useImperativeHandle } from "react";
import {
  BoldExtension,
  ImageExtension,
  MentionExtension,
  // TableExtension,
  NodeFormattingExtension,
  BulletListExtension,
  OrderedListExtension
} from "remirror/extensions";
import { TableExtension } from "@remirror/extension-react-tables";
import {
  useCommands,
  useRemirrorContext,
  useChainedCommands,
  useActive
} from "@remirror/react";
import { prosemirrorNodeToHtml } from "remirror";

import { Remirror, useRemirror, ThemeProvider } from "@remirror/react";
import Menu from "./Menu";
import UserSuggestor from "./UserSuggestor";

const allUsers = [
  {
    id: "joe",
    label: "Joe",

    items: [
      { id: "sue1", label: "Sue1" },
      { id: "pat1", label: "Pat1" }
    ]
  },
  { id: "sue", label: "Sue" },
  { id: "pat", label: "Pat" },
  { id: "tom", label: "Tom" },
  { id: "jim", label: "Jim" }
];

const extensions = (hastable) => {
  if (hastable) {
    return [
      new BoldExtension(),

      new ImageExtension({
        enableResizing: true
      }),
      new TableExtension(),
      new MentionExtension({
        extraAttributes: { type: "user" },
        matchers: [{ name: "at", char: "@", appendText: " ", matchOffset: 0 }]
      }),
      new NodeFormattingExtension(),
      new BulletListExtension(),
      new OrderedListExtension()
    ];
  }

  return [
    new BoldExtension(),

    new ImageExtension({
      enableResizing: true
    }),
    new TableExtension(),
    new MentionExtension({
      extraAttributes: { type: "user" },
      matchers: [{ name: "at", char: "@", appendText: " ", matchOffset: 0 }]
    }),
    new NodeFormattingExtension(),
    new BulletListExtension(),
    new OrderedListExtension()
  ];
};
const Editor = forwardRef((_, ref) => {
  const [hastable, setCreateTable] = React.useState(false);

  const { manager, state, onChange, getContext } = useRemirror({
    extensions: () => extensions(hastable),
    content: "",
    stringHandler: "html"
  });

  useImperativeHandle(ref, () => getContext(), [getContext]);
  return (
    <>
      <button onClick={() => setCreateTable(!hastable)}>
        change Extension
      </button>
      <Remirror
        manager={manager}
        initialContent={state}
        autoFocus
        autoRender="end"
        onChange={onChange}
      >
        <Menu state={state} hastable={hastable} />
        <UserSuggestor allUsers={allUsers} />
      </Remirror>
    </>
  );
});

export default Editor;
