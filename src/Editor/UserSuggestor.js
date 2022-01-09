import React from "react";

import { useEffect, useState } from "react";
import { cx } from "remirror";

import { FloatingWrapper, useMention } from "@remirror/react";

function UserSuggestor({ allUsers, ...props }) {
  // console.log(allUsers);
  const [users, setUsers] = useState([]);
  const {
    state,
    getMenuProps,
    getItemProps,
    indexIsHovered,
    indexIsSelected
  } = useMention({
    items: users
  });

  useEffect(() => {
    if (!state) {
      return;
    }

    const searchTerm = state.query.full.toLowerCase();
    const filteredUsers = allUsers
      .filter((user) => user.label.toLowerCase().includes(searchTerm))
      .sort()
      .slice(0, 5);
    setUsers(filteredUsers);
  }, [state, allUsers]);

  const enabled = !!state;

  const handleGetChildren = (user, index, getItemProps) => {
    // const isHighlighted = indexIsSelected(index);
    // const isHovered = indexIsHovered(index);
    return (
      <>
        <div>
          {user.items.map((child, idx) => {
            if (child.items) {
              return (
                <div
                  key={user?.id}
                  className={cx(
                    "suggestion"
                    // isHighlighted && 'highlighted',
                    // isHovered && 'hovered'
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("prevent child ");
                    return;
                  }}
                >
                  <span className="txt-hasicon">
                    <span className="txt-suggest">{user?.label}</span>
                    {user?.items ? ">" : null}
                  </span>
                  {handleGetChildren(child, idx, getItemProps)}
                </div>
              );
            }
            return (
              <div
                key={`${index}-${idx}`}
                {...getItemProps({ item: child, index: idx })}
              >
                <span className="txt-suggest">{child?.label}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <FloatingWrapper
      positioner="cursor"
      enabled={enabled}
      placement="bottom-start"
    >
      <div {...getMenuProps()} className="suggestions">
        {enabled &&
          users.map((user, index) => {
            const isHighlighted = indexIsSelected(index);
            const isHovered = indexIsHovered(index);
            // if (user?.items) {
            //   return (
            //     <div
            //       key={user?.id}
            //       className={cx(
            //         "suggestion",
            //         isHighlighted && "highlighted",
            //         isHovered && "hovered"
            //       )}
            //       onClick={(e) => {
            //         e.preventDefault();
            //         console.log("prevent child");
            //         return;
            //       }}
            //     >
            //       <span className="txt-hasicon">
            //         <span className="txt-suggest">{user?.label}</span>
            //         '>'
            //       </span>
            //       {handleGetChildren(user, index, getItemProps)}
            //     </div>
            //   );
            //   // return handleGetChildren(user, index, getItemProps);
            // }
            return (
              <div
                key={user.id}
                className={cx(
                  "suggestion",
                  isHighlighted && "highlighted",
                  isHovered && "hovered"
                )}
                {...getItemProps({ item: user, index })}
              >
                {user.label}
                {/* <span className="txt-suggest"></span> */}
              </div>
            );
          })}
      </div>
    </FloatingWrapper>
  );

  // return (
  //   <FloatingWrapper
  //     positioner="cursor"
  //     enabled={enabled}
  //     placement="bottom-start"
  //   >
  //     <div {...getMenuProps()} className="suggestions">
  //       {enabled &&
  //         users.map((user, index) => {
  //           const isHighlighted = indexIsSelected(index);
  //           const isHovered = indexIsHovered(index);
  //           if (user.items) {
  //             return (
  //               <div
  //                 key={user.id}
  //                 className={cx(
  //                   "suggestion",
  //                   isHighlighted && "highlighted",
  //                   isHovered && "hovered"
  //                 )}
  //                 onClick={(e) => {
  //                   e.preventDefault();
  //                   return;
  //                 }}
  //               >
  //                 {user.label}
  //                 <ul>
  //                   {user.items.map((c, idx) => (
  //                     <li
  //                       {...getItemProps({
  //                         item: c,
  //                         index: idx
  //                       })}
  //                     >
  //                       {c.label}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </div>
  //             );
  //           }
  //           return (
  //             <div
  //               key={user.id}
  //               className={cx(
  //                 "suggestion",
  //                 isHighlighted && "highlighted",
  //                 isHovered && "hovered"
  //               )}
  //               {...getItemProps({
  //                 item: user,
  //                 index
  //               })}
  //             >
  //               {user.label}
  //             </div>
  //           );
  //         })}
  //     </div>
  //   </FloatingWrapper>
  // );
}

export default UserSuggestor;
