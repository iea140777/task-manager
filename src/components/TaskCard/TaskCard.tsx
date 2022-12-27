import React from "react";

import { Status } from "../../types/constants";
import { Task } from "../../types/projectTypes";

import styles from "./index.module.scss";

interface TaskCardProps {
  task: Task;
  onCardClick: (task: Task) => void;
}

function TaskCard({ task, onCardClick }: TaskCardProps): React.ReactElement {
  const {
    title,
    number,
    status,
    createdOn,
    completedOn,
    priority,
    subtasks,
    comments,
  } = task;

  return (
    <div
      className={styles.container}
      role="button"
      onClick={() => onCardClick(task)}
    >
      <div className={styles.header}>
        <span
          className={styles.number}
          dangerouslySetInnerHTML={{ __html: `${number}` }}
        />
        <span
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyItem}>
          <span className={styles.label}>Priority:</span>
          <span className={styles.data}>{priority}</span>
        </div>
        <div className={styles.bodyItem}>
          <span className={styles.label}>Status:</span>
          <span className={styles.data}>{status}</span>
        </div>
        <div className={styles.bodyItem}>
          <span className={styles.label}>Created on:</span>
          <span className={styles.data}>
            {createdOn != null ? createdOn : "-"}
          </span>
        </div>
        {completedOn !== "" && (
          <div className={styles.bodyItem}>
            <span className={styles.label}>Completed on:</span>
            <span className={styles.data}>{completedOn}</span>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <span>
          {subtasks.length} subtask{subtasks.length !== 1 && "s"}
        </span>
        <span>
          {comments.length} comment{comments.length !== 1 && "s"}
        </span>
      </div>
    </div>
  );
}

export { TaskCard };
