import React, { useEffect, useState } from "react";

import { Task } from "../../types/projectTypes";
import { Button } from "../../ui/Button/Button";
import { TextEditor } from "../TextEditor/TextEditor";

import styles from "./index.module.scss";

interface TaskCardProps {
  currentTask: Task;
  isTaskModalOpen: boolean;
  isNewTask: boolean;
  handleClosemodal: () => void;
  updateTaskHandler: () => void;
}

function TaskModal({
  currentTask,
  isTaskModalOpen,
  isNewTask,
  handleClosemodal,
  updateTaskHandler,
}: TaskCardProps): React.ReactElement | null {
  const [isEditMode, setIsEditMode] = useState(false);
  const [task, setTask] = useState<Task>(currentTask);
  useEffect(() => {
    if (isNewTask) {
      setIsEditMode(true);
    }
  }, [isNewTask]);

  if (!isTaskModalOpen || task === undefined) {
    return null;
  }

  const {
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

  const editChangesHandler = (): void => {
    setIsEditMode(true);
  };
  const cancelChangesHandler = (): void => {
    setIsEditMode(false);
    setTask(currentTask);
  };
  const saveChangesHandler = (): void => {
    setIsEditMode(false);
    updateTaskHandler();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <span>{number}</span>
          <span>{title}</span>

          <Button
            className={styles.closeButton}
            onClickHandler={() => handleClosemodal()}
            label="x"
          />
        </div>
        <div className={styles.body}>
          <span>{status}</span>
          <span>{priority}</span>
          <p>{description}</p>

          <p>{subtasks.length} subtasks</p>
          <p>{comments.length} comments</p>
        </div>
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
            <Button onClickHandler={editChangesHandler} label="Edit Task" />
          )}
        </div>
      </div>
    </div>
  );
}

export { TaskModal };
