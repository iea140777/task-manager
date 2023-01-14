import { format } from "date-fns";

import { CommentType, Project, SubTask, Task } from "./projectTypes";

enum Status {
  QUEUE = "Queue",
  DEVELOPMENT = "Development",
  DONE = "Done",
}

enum Priority {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}

enum SortingOrder {
  DESC = "\u{1F817}",
  ASC = "\u{1F815}",
}

enum SortingValue {
  PRIORITY = "Priority",
  CREATED_ON = "Created on",
}

const EMPTY_SUBTASK: SubTask = {
  id: 0,
  title: "New Subtask",
  number: "",
  status: Status.QUEUE,
  createdOn: format(new Date(), "MM/dd/yyyy"),
  completedOn: "",
};

const EMPTY_TASK: Task = {
  id: 0,
  title: "New task",
  number: "",
  status: Status.QUEUE,
  createdOn: format(new Date(), "MM/dd/yyyy"),
  completedOn: "",
  description: "",
  priority: Priority.LOW,
  subtasks: [],
  comments: [],
};

const EMPTY_PROJECT: Project = {
  id: 0,
  title: "New Project",
  description: "New Project Description",
  tasks: [],
};

const EMPTY_COMMENT: CommentType = {
  id: 0,
  createdOn: "",
  text: "",
  replies: [],
};

export {
  Status,
  Priority,
  EMPTY_PROJECT,
  EMPTY_TASK,
  EMPTY_SUBTASK,
  EMPTY_COMMENT,
  SortingOrder,
  SortingValue,
};
