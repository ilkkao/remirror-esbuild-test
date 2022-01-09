import React from "react";
import {
  useCommands,
  useRemirrorContext,
  useChainedCommands
} from "@remirror/react";
import { prosemirrorNodeToHtml } from "remirror";

const Menu = ({ state, hastable, ...props }) => {
  const chain = useChainedCommands();
  const commands = useCommands();

  const { commands: commandsCtx } = useRemirrorContext();

  const handleInsertImg = () => {
    // commandsCtx.i
    // useChain.
    chain
      .insertImage({
        src:
          "https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg",
        alt: "insert img",
        width: "500px",
        height: "350px",
        title: "hi hi"
      })
      .run();
  };
  return (
    <>
      <button onClick={() => chain.toggleBold().focus().run()}>B</button>
      <button onClick={() => chain.toggleBulletList().focus().run()}>
        bullet
      </button>
      <button onClick={() => chain.toggleOrderedList().focus().run()}>
        orderede
      </button>
      <button onClick={() => commands.increaseIndent()}>indent</button>
      <button onClick={() => commands.decreaseIndent()}>outdent</button>
      <button onClick={handleInsertImg}>insert img</button>
      <button
        onClick={() =>
          commandsCtx.createTable({
            rowsCount: 4,
            columnsCount: 4,
            withHeaderRow: false
          })
        }
      >
        create a 4*4 table without headers
      </button>
      {hastable ? (
        <button
          onClick={() => {
            commandsCtx.createTable({
              columnsCount: 5,
              rowsCount: 3,
              withHeaderRow: false
            });
          }}
        >
          create Table
        </button>
      ) : null}
    </>
  );
};

export default Menu;
