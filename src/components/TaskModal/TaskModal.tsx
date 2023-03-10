import React, { ReactNode, useEffect, useRef, useState } from "react";

import classNames from "classnames";
import { format } from "date-fns";

import { idGenerator } from "../../app/idGenerator";
import {
  EMPTY_COMMENT,
  EMPTY_SUBTASK,
  Priority,
  Status,
} from "../../types/constants";
import { CommentType, Id, SubTask, Task } from "../../types/projectTypes";
import { Button } from "../../ui/Button/Button";
import { Dropdown } from "../../ui/Dropdown/Dropdown";
import { TextEditor } from "../TextEditor/TextEditor";
import { Comment } from "./Components/Comment/Comment";
import { Subtask } from "./Components/Subtask/Subtask";

import styles from "./index.module.scss";

interface TaskCardProps {
  currentTask: Task;
  isTaskModalOpen: boolean;

  handleClosemodal: () => void;
  updateTask: (task: Task) => void;
  deleteTaskHandler: () => void;
}

function TaskModal({
  currentTask,
  handleClosemodal,
  updateTask,
  deleteTaskHandler,
}: TaskCardProps): React.ReactElement | null {
  const [isEditMode, setIsEditMode] = useState(currentTask.id === 0);
  const [task, setTask] = useState<Task>(currentTask);

  const titleRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const numberRef = useRef<any>(null);

  const {
    id,
    title,
    number,
    status,
    createdOn,
    completedOn,
    description,
    priority,
    subtasks,
    comments,
  } = task;

  useEffect(() => {
    if (status === Status.DONE && completedOn === "") {
      const updatedTask = {
        ...task,
        completedOn: format(new Date(), "MM/dd/yyyy"),
      };
      setTask(updatedTask);
      if (id !== 0) {
        updateTask(updatedTask);
      }
    } else if (status !== Status.DONE && completedOn !== "") {
      const updatedTask = {
        ...task,
        completedOn: "",
      };
      setTask(updatedTask);
      if (id !== 0) {
        updateTask(updatedTask);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, completedOn, task]);

  const closeButtonHandler = (): void => {
    if (id !== 0) {
      updateTask(task);
    }
    setIsEditMode(false);
    handleClosemodal();
  };

  const editTaskHandler = (): void => {
    setIsEditMode(true);
  };

  const cancelChangesHandler = (): void => {
    setIsEditMode(false);
    setTask(currentTask);
  };

  const changeStatusHandler = (newStatus: string): void => {
    const updatedTask = {
      ...task,
      status: newStatus as Status,
    };
    setTask(updatedTask);
    if (id !== 0) {
      updateTask(updatedTask);
    }
  };

  const changePriorityHandler = (newPriority: string): void => {
    const updatedTask = {
      ...task,
      priority: newPriority as Priority,
    };
    setTask(updatedTask);
    if (id !== 0) {
      updateTask(updatedTask);
    }
  };

  const saveChangesHandler = (): void => {
    const newTask = {
      ...task,
      number: numberRef.current.getContent(),
      title: titleRef.current.getContent(),
      description: descriptionRef.current.getContent(),
    };
    setTask(newTask);
    setIsEditMode(false);
    handleClosemodal();
    updateTask(newTask);
  };
  const clickEditableHandler = (): void => {
    setIsEditMode(true);
  };

  const addSubTaskHandler = (): void => {
    setTask((state) => {
      return {
        ...state,
        subtasks: [...subtasks, EMPTY_SUBTASK],
      };
    });
    setIsEditMode(true);
  };

  const updateSubtaskHandler = (subtask: SubTask): void => {
    let editedSubtask = subtask;
    if (editedSubtask.id === 0) {
      const subtaskId = idGenerator(task.subtasks);
      editedSubtask = {
        ...editedSubtask,
        id: subtaskId,
      };
    }
    setTask((state) => {
      const updatedSubtasks = state.subtasks.map((item) =>
        item.id === subtask.id ? editedSubtask : item
      );

      return {
        ...state,
        subtasks: updatedSubtasks,
      };
    });
  };

  const deleteSubtaskHandler = (subtask: SubTask): void => {
    setTask((state) => {
      const updatedSubtasks = state.subtasks.filter(
        (item) => item.id !== subtask.id
      );

      return {
        ...state,
        subtasks: updatedSubtasks,
      };
    });
  };

  const renderSubtasks = (): ReactNode =>
    subtasks.map((subtask) => (
      <Subtask
        key={subtask.id}
        subtask={subtask}
        deleteHandler={deleteSubtaskHandler}
        onChangeValue={updateSubtaskHandler}
      />
    ));

  const saveCommentHandler = (comment: CommentType): void => {
    let editedComment = comment;

    if (comment.id === 0) {
      const commentId = idGenerator(task.comments);
      editedComment = {
        ...comment,
        createdOn: format(new Date(), "MM/dd/yyyy HH.mm"),
        id: commentId,
      };
    }
    const commentIndex = task.comments.findIndex(
      (item) => item.id === comment.id
    );
    const updatedComments: CommentType[] = task.comments.map((item, index) =>
      index === commentIndex ? editedComment : item
    );
    setTask((prevState) => ({
      ...prevState,
      comments: updatedComments,
    }));
    setIsEditMode(true);
  };

  const deleteCommentHandler = (commentId: Id): void => {
    const updatedComments: CommentType[] = task.comments.filter(
      (item) => item.id !== commentId
    );
    setTask((prevState) => ({
      ...prevState,
      comments: updatedComments,
    }));
  };

  const addCommentHandler = (): void => {
    setTask((prevTask) => ({
      ...prevTask,
      comments: [...task.comments, EMPTY_COMMENT],
    }));
  };

  const renderComments = (commentsList: CommentType[]): ReactNode => {
    return commentsList.map((comment) => (
      <Comment
        comment={comment}
        key={comment.id}
        children={renderComments(comment.replies)}
        saveCommentHandler={saveCommentHandler}
        deleteCommentHandler={deleteCommentHandler}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div onClick={clickEditableHandler} className="editable">
            {isEditMode ? (
              <TextEditor
                initialValue={title}
                editorRef={titleRef}
                toolbar=""
              />
            ) : (
              <h3 dangerouslySetInnerHTML={{ __html: title }} />
            )}
          </div>
          <Button
            className={styles.closeButton}
            onClickHandler={closeButtonHandler}
            label="Close"
          />
        </div>
        <div className={styles.body}>
          <div
            onClick={clickEditableHandler}
            className={classNames(styles.number, "editable")}
          >
            <span className={styles.label}>Task number:</span>
            {isEditMode ? (
              <TextEditor
                initialValue={number}
                editorRef={numberRef}
                toolbar=""
              />
            ) : (
              <span
                className={styles.data}
                dangerouslySetInnerHTML={{ __html: number }}
              />
            )}
          </div>
          <div className={styles.dropdownContainer}>
            <span className={styles.label}>Task status:</span>
            <Dropdown
              values={Object.values(Status)}
              initialValue={status}
              onChangeValue={changeStatusHandler}
            />
          </div>
          <div className={styles.dropdownContainer}>
            <span className={styles.label}>Task priority:</span>
            <Dropdown
              values={Object.values(Priority)}
              initialValue={priority}
              onChangeValue={changePriorityHandler}
            />
          </div>
          <div className={styles.dropdownContainer}>
            <span className={styles.label}>Created on:</span>
            <span className={styles.data}>{createdOn}</span>
          </div>
          {status === Status.DONE && (
            <div className={styles.dropdownContainer}>
              <span className={styles.label}>Completed on:</span>
              <span className={styles.data}>{completedOn}</span>
            </div>
          )}
          <div
            className={classNames(styles.description, "editable")}
            onClick={clickEditableHandler}
          >
            <>
              <span className={styles.label}>Task description:</span>
              {isEditMode ? (
                <TextEditor
                  initialValue={description}
                  editorRef={descriptionRef}
                />
              ) : (
                <span dangerouslySetInnerHTML={{ __html: description }} />
              )}
            </>
          </div>
          <div className={styles.subtasks}>
            <span className={styles.label}>Subtasks:</span>
            {subtasks.length === 0 ? (
              "No subtasks"
            ) : (
              <div className={styles.subtasksList}>{renderSubtasks()}</div>
            )}
            <Button
              onClickHandler={addSubTaskHandler}
              label="Add Subtask"
            ></Button>
          </div>
          <div className={styles.comments}>
            <span className={styles.label}>Comments:</span>
            {comments.length === 0 ? (
              "No comments"
            ) : (
              <div>{renderComments(comments)}</div>
            )}

            <Button
              onClickHandler={addCommentHandler}
              label="Add comment"
            ></Button>
          </div>
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.footer}>
          {isEditMode ? (
            <>
              <Button
                onClickHandler={saveChangesHandler}
                label="Save changes"
              />
              <Button onClickHandler={cancelChangesHandler} label="Cancel" />
            </>
          ) : (
            <>
              <Button onClickHandler={editTaskHandler} label="Edit Task" />
              <Button onClickHandler={deleteTaskHandler} label="Delete Task" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { TaskModal };
