import React, { ReactNode, useCallback, useEffect, useState } from "react";

import { TaskCard } from "../../components/TaskCard/TaskCard";
import {
  Priority,
  SortingOrder,
  SortingValue,
  Status,
} from "../../types/constants";
import { Task } from "../../types/projectTypes";
import { Button } from "../../ui/Button/Button";
import { Dropdown } from "../../ui/Dropdown/Dropdown";

import styles from "./index.module.scss";

interface TaskColumnProps {
  status: Status;
  tasks: Task[];
  drop: (e: React.DragEvent) => void;
  allowDrop: (e: React.DragEvent) => void;
  onCardClick: (task: Task) => void;
  dragEnter: (e: React.MouseEvent<HTMLElement>, status: Status) => void;
  dragStart: (e: React.DragEvent, id: number) => void;
}

function TaskColumn({
  status,
  tasks,
  drop,
  onCardClick,
  allowDrop,
  dragEnter,
  dragStart,
}: TaskColumnProps): React.ReactElement | null {
  const [sortingOrder, setSortingOrder] = useState<SortingOrder>(
    SortingOrder.ASC
  );

  const [sortingValue, setSortingValue] = useState<SortingValue>(
    SortingValue.PRIORITY
  );

  const sortTasksByDate = useCallback(
    (tasksArray: Task[]): Task[] => {
      const sortedTasks = tasksArray.sort((a, b) =>
        sortingOrder === SortingOrder.ASC
          ? Date.parse(b.createdOn) - Date.parse(a.createdOn)
          : Date.parse(a.createdOn) - Date.parse(b.createdOn)
      );
      return sortedTasks;
    },
    [sortingOrder]
  );

  const sortTasksByPriority = useCallback(
    (tasksArray: Task[]): Task[] => {
      let sortedTasks: Task[] = [];
      Object.values(Priority).map((priorityItem) => {
        const tasksOfPriority = tasksArray.filter(
          (task) => task.priority === priorityItem
        );
        sortedTasks =
          sortingOrder === SortingOrder.ASC
            ? [...sortedTasks, ...tasksOfPriority]
            : [...tasksOfPriority, ...sortedTasks];
        return sortedTasks;
      });
      return sortedTasks;
    },
    [sortingOrder]
  );

  const sortedTasks =
    sortingValue === SortingValue.CREATED_ON
      ? sortTasksByDate(tasks)
      : sortTasksByPriority(tasks);

  const [tasksList, setTasksList] = useState<Task[]>(sortedTasks);

  useEffect(() => {
    if (sortingValue === SortingValue.CREATED_ON) {
      setTasksList(sortTasksByDate(tasks));
    } else {
      setTasksList(sortTasksByPriority(tasks));
    }
  }, [tasks, sortingValue, sortTasksByDate, sortTasksByPriority]);

  const sortingOrderClickHandler = (): void => {
    setSortingOrder((prevSortingOrder) =>
      prevSortingOrder === SortingOrder.DESC
        ? SortingOrder.ASC
        : SortingOrder.DESC
    );
  };

  const renderTasksOfStatus = (): ReactNode => {
    return tasksList.map((task) => (
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
    <div className={styles.columnContainer}>
      <div className={styles.tasksHeaderContainer}>
        <h3>{status}</h3>
        <div className={styles.sortingCriteria}>
          <Dropdown
            values={Object.values(SortingValue)}
            initialValue={sortingValue}
            onChangeValue={(newValue: string) =>
              setSortingValue(newValue as SortingValue)
            }
          />
          <div
            role="button"
            className={styles.orderArrow}
            onClick={sortingOrderClickHandler}
          >
            {sortingOrder}
          </div>
        </div>
      </div>

      <div
        className={styles.tasksColumn}
        onDragEnter={(e) => dragEnter(e, status)}
        onDragOver={allowDrop}
        onDrop={drop}
      >
        {renderTasksOfStatus()}
      </div>
    </div>
  );
}

export { TaskColumn };
