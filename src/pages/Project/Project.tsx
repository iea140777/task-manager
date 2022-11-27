import React, { ReactNode, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateTask } from "../../app/projectsSlice";
import { TaskCard } from "../../components/TaskCard/TaskCard";
import { TaskModal } from "../../components/TaskModal/TaskModal";
import { EMPTY_TASK, Status } from "../../types/constants";
import { Task } from "../../types/projectTypes";
import { Button } from "../../ui/Button/Button";

import styles from "./index.module.scss";

function Project(): React.ReactElement | null {
  // TODO: add typing
  const { id } = useParams<{ id: string }>();
  console.log(useParams());
  const project = useAppSelector((state) =>
    state.projects.find((item) => item.id === Number(id))
  );
  const dispatch = useAppDispatch();

  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [isNewTask, setIsNewTask] = useState<boolean>(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);

  if (project === undefined) {
    return null;
  }
  const { id: projectId, title, description, tasks } = project;

  const addTaskHandler = (): void => {
    setCurrentTask(EMPTY_TASK);
    setIsNewTask(true);
    setTaskModalOpen(true);
  };

  const updateTaskHandler = (): void => {
    if (currentTask !== undefined) {
      dispatch(updateTask({ projectId, task: currentTask }));
    }
    setIsNewTask(false);
  };
  const onCardClick = (task: Task): void => {
    setCurrentTask(task);
    setTaskModalOpen(true);
  };

  const renderTasksOfStatus = (status: Status): ReactNode => {
    const tasksOfStatus = tasks.filter((task) => task.status === status);
    if (tasksOfStatus.length === 0) {
      return null;
    }
    return tasksOfStatus.map((task) => (
      <TaskCard task={task} key={task.id} onCardClick={onCardClick} />
    ));
  };
  return (
    <div>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
      <Button onClickHandler={addTaskHandler} label="Add new task"></Button>
      <div className={styles.tasksContainer}>
        <div className={styles.tasksColumn}>
          <h3>{Status.QUEUE}</h3>
          {renderTasksOfStatus(Status.QUEUE)}
        </div>
        <div className={styles.divider}></div>
        <div className={styles.tasksColumn}>
          <h3>{Status.DEVELOPMENT}</h3>
          {renderTasksOfStatus(Status.DEVELOPMENT)}
        </div>
        <div className={styles.divider}></div>
        <div className={styles.tasksColumn}>
          <h3>{Status.DONE}</h3>
          {renderTasksOfStatus(Status.DONE)}
        </div>
      </div>
      {currentTask !== undefined && (
        <TaskModal
          currentTask={currentTask}
          isTaskModalOpen={isTaskModalOpen}
          handleClosemodal={() => setTaskModalOpen(false)}
          isNewTask={isNewTask}
          updateTaskHandler={updateTaskHandler}
        />
      )}
    </div>
  );
}

export { Project };
