import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteTask, updateTask } from "../../app/projectsSlice";
import { TaskCard } from "../../components/TaskCard/TaskCard";
import { TaskModal } from "../../components/TaskModal/TaskModal";
import { EMPTY_TASK, Status } from "../../types/constants";
import { Task } from "../../types/projectTypes";
import { Button } from "../../ui/Button/Button";

import styles from "./index.module.scss";

function Project(): React.ReactElement | null {
  const { id: projectIdParams } = useParams<{ id: string }>();

  const project = useAppSelector((state) =>
    state.projects.find((item) => item.id === Number(projectIdParams))
  );
  const dispatch = useAppDispatch();

  const [currentTask, setCurrentTask] = useState<Task | undefined>();

  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);

  const dragItem = useRef<any>();
  const dragOverItem = useRef<any>();

  useEffect(() => {
    if (currentTask === undefined) {
      setTaskModalOpen(false);
    } else {
      setTaskModalOpen(true);
    }
  }, [currentTask, setTaskModalOpen]);

  if (project === undefined) {
    return null;
  }
  const { id: projectId, title, description, tasks } = project;

  // Drag and Drop functionality
  // TODO: change typing for id to make it related to Task interface
  const dragStart = (e: React.DragEvent, id: number): void => {
    e.dataTransfer.effectAllowed = "move";
    dragItem.current = id;
  };
  const dragEnter = (
    e: React.MouseEvent<HTMLElement>,
    status: Status
  ): void => {
    e.preventDefault();
    dragOverItem.current = status;
  };
  const allowDrop = (e: React.DragEvent): void => {
    e.preventDefault();
  };
  const drop = (e: React.DragEvent): void => {
    e.preventDefault();
    const taskToMove = tasks.find((task) => task.id === dragItem.current);
    if (
      taskToMove !== undefined &&
      dragOverItem.current !== undefined &&
      dragOverItem.current !== taskToMove.status
    ) {
      const updatedTask: Task = {
        ...taskToMove,
        status: dragOverItem.current,
      };
      dispatch(updateTask({ projectId, task: updatedTask }));
    }
  };

  const onCardClick = (task: Task): void => {
    setCurrentTask(task);
  };

  const updateTaskHandler = (task: Task): void => {
    if (currentTask !== undefined) {
      setCurrentTask(task);
      dispatch(updateTask({ projectId, task }));
    }
  };

  const addTaskHandler = (): void => {
    setCurrentTask(EMPTY_TASK);
  };

  const deleteTaskHandler = (): void => {
    if (currentTask !== undefined) {
      dispatch(deleteTask({ projectId, task: currentTask }));
    }
    setCurrentTask(undefined);
  };

  const handleCloseModal = (): void => {
    setCurrentTask(undefined);
  };

  const renderTasksOfStatus = (status: Status): ReactNode => {
    const tasksOfStatus = tasks.filter((task) => task.status === status);
    if (tasksOfStatus.length === 0) {
      return null;
    }
    return tasksOfStatus.map((task) => (
      <div
        draggable
        onDragStart={(e) => dragStart(e, task.id)}
        key={task.id}
        className={styles.cardContainer}
      >
        <TaskCard task={task} onCardClick={onCardClick} />
      </div>
    ));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
          <Button onClickHandler={addTaskHandler} label="Add new task"></Button>
        </div>
        <div className={styles.tasksContainer}>
          <div
            className={styles.tasksColumn}
            onDragEnter={(e) => dragEnter(e, Status.QUEUE)}
            onDragOver={allowDrop}
            onDrop={drop}
          >
            <h3>{Status.QUEUE}</h3>
            {renderTasksOfStatus(Status.QUEUE)}
          </div>
          <div
            className={styles.tasksColumn}
            onDragEnter={(e) => dragEnter(e, Status.DEVELOPMENT)}
            onDragOver={allowDrop}
            onDrop={drop}
          >
            <h3>{Status.DEVELOPMENT}</h3>
            {renderTasksOfStatus(Status.DEVELOPMENT)}
          </div>
          <div
            className={styles.tasksColumn}
            onDragEnter={(e) => dragEnter(e, Status.DONE)}
            onDragOver={allowDrop}
            onDrop={drop}
          >
            <h3>{Status.DONE}</h3>
            {renderTasksOfStatus(Status.DONE)}
          </div>
        </div>
      </div>
      {currentTask !== undefined && (
        <TaskModal
          currentTask={currentTask}
          isTaskModalOpen={isTaskModalOpen}
          handleClosemodal={handleCloseModal}
          updateTask={updateTaskHandler}
          deleteTaskHandler={deleteTaskHandler}
        />
      )}
    </>
  );
}

export { Project };
