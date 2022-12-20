import { Priority, Status } from "./constants";

type Id = number;
interface CommentType {
  id: number;
  createdOn: string;
  text: string;
  replies: CommentType[];
}

interface Task {
  id: Id;
  title: string;
  number: string;
  status: Status;
  createdOn: string;
  completedOn: string;
  description: string;
  priority: Priority;
  subtasks: SubTask[];
  comments: CommentType[];
}

type SubTask = Omit<Task, "priority" | "subtasks" | "comments" | "description">;

interface Project {
  id: Id;
  title: string;
  description: string;
  tasks: Task[];
}

export type { CommentType, SubTask, Task, Project, Id };
