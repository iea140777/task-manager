import { Project, Task } from "./projectTypes";
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

const EMPTY_TASK: Task = {
  id: 0,
  title: "New task",
  number: "",
  status: Status.QUEUE,
  createdOn: new Date(),
  completedOn: null,
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

export { Status, Priority, EMPTY_PROJECT, EMPTY_TASK };
