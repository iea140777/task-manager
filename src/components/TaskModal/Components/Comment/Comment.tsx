import React, { ReactNode, useEffect, useRef, useState } from "react";

import { format } from "date-fns";

import { idGenerator } from "../../../../app/idGenerator";
import { EMPTY_COMMENT } from "../../../../types/constants";
import { CommentType, Id } from "../../../../types/projectTypes";
import { Button } from "../../../../ui/Button/Button";
import { TextEditor } from "../../../TextEditor/TextEditor";

import styles from "./index.module.scss";

interface CommentProps {
  comment: CommentType;
  saveCommentHandler: (comment: CommentType) => void;
  deleteCommentHandler: (id: Id) => void;
  children?: ReactNode;
}

function Comment({
  comment,
  saveCommentHandler,
  deleteCommentHandler,
  children = null,
}: CommentProps): React.ReactElement {
  const [isCommentEditMode, setIsCommentEditMode] = useState<boolean>(false);
  const [isReplyEditMode, setIsReplyEditMode] = useState<boolean>(false);
  useEffect(() => {
    if (comment.id === 0) {
      setIsCommentEditMode(true);
    }
  }, [comment]);

  const { createdOn, text, id } = comment;
  const textRef = useRef<any>(null);
  const replyRef = useRef<any>(null);

  const replyButtonHandler = (): void => {
    setIsReplyEditMode(true);
  };

  const saveReplyButtonHandler = (): void => {
    const replyId = idGenerator(comment.replies);
    const editedComment = {
      ...EMPTY_COMMENT,
      id: replyId,
      createdOn: format(new Date(), "MM/dd/yyyy HH.mm"),
      text: replyRef.current.getContent(),
    };
    saveCommentHandler({
      ...comment,
      replies: [...comment.replies, editedComment],
    });
    setIsReplyEditMode(false);
  };

  return (
    <div className={styles.container}>
      {isCommentEditMode ? (
        <div className="editable">
          <TextEditor initialValue={text} editorRef={textRef} toolbar="" />
          <Button
            onClickHandler={() => {
              saveCommentHandler({
                ...comment,
                text: textRef.current.getContent(),
              });
              setIsCommentEditMode(false);
            }}
            label="Save"
          ></Button>
        </div>
      ) : (
        <>
          <div>{createdOn != null ? createdOn : "-"}</div>
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            onClick={() => setIsCommentEditMode(true)}
          />
        </>
      )}

      {isReplyEditMode && (
        <div className="editable">
          <TextEditor
            initialValue={EMPTY_COMMENT.text}
            editorRef={replyRef}
            toolbar=""
          />
          <Button onClickHandler={saveReplyButtonHandler} label="Save"></Button>
        </div>
      )}
      {!isReplyEditMode && !isCommentEditMode && (
        <div className={styles.buttonContainer}>
          <Button onClickHandler={replyButtonHandler} label="Reply"></Button>
          <Button
            onClickHandler={() => deleteCommentHandler(id)}
            label="Delete"
          ></Button>
        </div>
      )}
      {children}
    </div>
  );
}

export { Comment };
