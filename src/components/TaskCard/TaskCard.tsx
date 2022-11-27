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
    description,
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
      <p>{title}</p>
      <p>{number}</p>
      <p>{status}</p>
      <p>{priority}</p>
      {/* <p>{createdOn}</p> */}
      <p>{subtasks.length} subtasks</p>
      <p>{comments.length} comments</p>
    </div>
  );
}

export { TaskCard };
