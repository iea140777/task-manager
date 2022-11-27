import { Priority, Status } from "./constants";

type Id = number;
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
  id: Id;
  title: string;
  number: string;
  status: Status;
  createdOn: Date;
  completedOn: Date | null;
  description: string;
  priority: Priority;
  subtasks: SubTask[];
  comments: Comment[];
}

interface Project {
  id: Id;
  title: string;
  description: string;
  tasks: Task[];
}

export type { Comment, SubTask, Task, Project, Id };
