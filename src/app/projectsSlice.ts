import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Id, Project, Task } from "../types/projectTypes";
import { idGenerator } from "./idGenerator";

type ProjectsState = Project[];

interface UpdateProjectProps {
  projectId: Id;
  task: Task;
}

const getUpdatedProjectIndex = (id: Id, state: ProjectsState): number => {
  return state.findIndex((project) => project.id === id);
};

const updateLocalStorage = (state: ProjectsState): void =>
  localStorage.setItem("projects", JSON.stringify(state));

const initialState: ProjectsState = [] as ProjectsState;

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ProjectsState>) => {
      return action.payload;
    },
    updateProjects: (state, action: PayloadAction<Project>) => {
      const projectId = action.payload.id;
      if (projectId === 0) {
        const newProjectId = idGenerator(state);
        const newProject = {
          ...action.payload,
          id: newProjectId,
        };
        state.push(newProject);
      } else {
        const updatedProjectIndex = getUpdatedProjectIndex(projectId, state);
        state[updatedProjectIndex] = action.payload;
      }
      updateLocalStorage(state);
    },
    updateTask: (state, action: PayloadAction<UpdateProjectProps>) => {
      const { projectId, task } = action.payload;
      const updatedProjectIndex = getUpdatedProjectIndex(projectId, state);
      if (task.id === 0) {
        const newTaskId = idGenerator(state[updatedProjectIndex].tasks);
        const newTask = {
          ...task,
          id: newTaskId,
        };
        state[updatedProjectIndex].tasks.push(newTask);
      } else {
        const updatedTaskIndex = state[updatedProjectIndex].tasks.findIndex(
          (item) => item.id === task.id
        );
        state[updatedProjectIndex].tasks[updatedTaskIndex] = task;
      }
      updateLocalStorage(state);
    },
    deleteTask: (state, action: PayloadAction<UpdateProjectProps>) => {
      const { projectId, task } = action.payload;
      const updatedProjectIndex = getUpdatedProjectIndex(projectId, state);

      const deletedTaskIndex = state[updatedProjectIndex].tasks.findIndex(
        (item) => item.id === task.id
      );
      state[updatedProjectIndex].tasks.splice(deletedTaskIndex, 1);
      updateLocalStorage(state);
    },
  },
});

const { updateProjects, setProjects, updateTask, deleteTask } =
  projectsSlice.actions;

export default projectsSlice.reducer;

export { projectsSlice, updateProjects, setProjects, updateTask, deleteTask };
