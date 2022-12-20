import React, { useEffect, useRef, useState } from "react";

import { format } from "date-fns";

import { Status } from "../../types/constants";
import { SubTask } from "../../types/projectTypes";
import { Button } from "../../ui/Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { TextEditor } from "../TextEditor/TextEditor";

import styles from "./index.module.scss";

interface SubtaskCardProps {
  subtask: SubTask;
  onChangeValue: (subtask: SubTask) => void;
}

function Subtask({
  subtask,
  onChangeValue,
}: SubtaskCardProps): React.ReactElement {
  const { title, number, status, createdOn, completedOn } = subtask;
  const [isEditMode, setIsEditMode] = useState(false);
  const titleRef = useRef<any>(null);
  const numberRef = useRef<any>(null);

  useEffect(() => {
    if (subtask.id === 0) {
      setIsEditMode(true);
    }
  }, [subtask.id]);

  const saveSubtaskHandler = (): void => {
    const editedSubtask = {
      ...subtask,
      number: numberRef.current.getContent(),
      createdOn: format(new Date(), "MM/dd/yyyy HH.mm"),
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
            <TextEditor
              initialValue={number}
              editorRef={numberRef}
              toolbar=""
            />
          </div>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: number }}></span>
        )}
      </div>

      <Dropdown
        initialValue={status}
        values={Object.values(Status)}
        // onChangeValue={(newStatus: string) =>
        //   onChangeValue({ ...subtask, status: newStatus as Status })
        // }
        onChangeValue={() => {}}
      />
      <div onClick={() => setIsEditMode(true)}>
        {isEditMode ? (
          <div className="editable">
            <TextEditor initialValue={title} editorRef={titleRef} toolbar="" />
          </div>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: title }}></span>
        )}
      </div>
      <span>{createdOn}</span>
      <span>{completedOn}</span>
      {isEditMode && (
        <Button label="Save" onClickHandler={saveSubtaskHandler} />
      )}
    </div>
  );
}

export { Subtask };
