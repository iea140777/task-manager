import { Priority, Status } from "./constants";

interface Comment {
  createdOn: string;
  text: string;
  replies: Comment[];
}

interface SubTask {
  title: string;
  status: Status;
  description: string;
  comments: Comment[];
}

interface Task {
  title: string;
  number: number;
  status: Status;
  createdOn: string;
  completedOn: string;
  description: string;
  priority: Priority;
  subtasks: SubTask[];
  comments: Comment[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  tasks: Task[];
}

export type { Comment, SubTask, Task, Project };
