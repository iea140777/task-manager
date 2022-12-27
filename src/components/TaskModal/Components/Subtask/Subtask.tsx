import React, { useEffect, useRef, useState } from "react";

import { format } from "date-fns";

import { Status } from "../../../../types/constants";
import { SubTask } from "../../../../types/projectTypes";
import { Button } from "../../../../ui/Button/Button";
import { Dropdown } from "../../../../ui/Dropdown/Dropdown";
import { TextEditor } from "../../../TextEditor/TextEditor";

import styles from "./index.module.scss";

interface SubtaskCardProps {
  subtask: SubTask;
  deleteHandler: (subtask: SubTask) => void;
  onChangeValue: (subtask: SubTask) => void;
}

function Subtask({
  subtask,
  deleteHandler,
  onChangeValue,
}: SubtaskCardProps): React.ReactElement {
  const [currentSubtask, setCurrentSubtask] = useState(subtask);
  const { title, status, createdOn, completedOn, id } = currentSubtask;
  const [isEditMode, setIsEditMode] = useState(false);
  const titleRef = useRef<any>(null);

  useEffect(() => {
    if (id === 0) {
      setIsEditMode(true);
    }
  }, [id]);

  useEffect(() => {
    if (status === Status.DONE && completedOn === "") {
      setCurrentSubtask((prevState) => ({
        ...prevState,
        completedOn: format(new Date(), "MM/dd/yyyy"),
      }));
    } else if (status !== Status.DONE && completedOn !== "") {
      setCurrentSubtask((prevState) => ({
        ...prevState,
        completedOn: "",
      }));
    }
  }, [status, completedOn]);

  const saveSubtaskHandler = (): void => {
    const editedSubtask = {
      ...currentSubtask,
      title: titleRef.current.getContent(),
    };
    onChangeValue(editedSubtask);
    setIsEditMode(false);
  };

  return (
    <div className={styles.container}>
      <div onClick={() => setIsEditMode(true)}>
        {isEditMode ? (
          <div className="editable">
            <TextEditor initialValue={title} editorRef={titleRef} toolbar="" />
          </div>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: title }}></span>
        )}
      </div>
      <div className={styles.itemContainer}>
        <span className={styles.label}>Status:</span>
        <Dropdown
          initialValue={status}
          values={Object.values(Status)}
          onChangeValue={(newStatus: string) =>
            setCurrentSubtask((prevState) => ({
              ...prevState,
              status: newStatus as Status,
            }))
          }
        />
      </div>
      <div className={styles.itemContainer}>
        <span className={styles.label}>Created on:</span>
        <span>{createdOn}</span>
      </div>
      {status === Status.DONE && (
        <div className={styles.itemContainer}>
          <span className={styles.label}>Completed on:</span>
          <span>{completedOn}</span>
        </div>
      )}
      {isEditMode && (
        <Button label="Save" onClickHandler={saveSubtaskHandler} />
      )}
      {!isEditMode && (
        <Button
          onClickHandler={() => deleteHandler(subtask)}
          label="Delete"
          className={styles.deleteButton}
        />
      )}
    </div>
  );
}

export { Subtask };
