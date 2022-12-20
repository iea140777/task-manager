import React from "react";

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
        <span dangerouslySetInnerHTML={{ __html: title }} />
        <span dangerouslySetInnerHTML={{ __html: `# ${number}` }} />
      </div>
      <div className={styles.body}>
        <span>Priority: {priority}</span>
        <span>Status: {status}</span>
        <span>Created on: {createdOn != null ? createdOn : "-"}</span>
      </div>
      <div className={styles.footer}>
        <span>{subtasks.length} subtasks</span>
        <span>{comments.length} comments</span>
      </div>
    </div>
  );
}

export { TaskCard };
