import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Id, Project, Task } from "../types/projectTypes";

type ProjectsState = Project[];

interface UpdateProjectProps {
  projectId: Id;
  task: Task;
}

const getUpdatedProjectIndex = (id: Id, state: ProjectsState): number => {
  return state.findIndex((project) => project.id === id);
};
const updateCookies = (state: ProjectsState): void => {
  document.cookie = `projects=${JSON.stringify(state)}`;
};

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
        const projectsLength: number = state.length;
        const newProject = {
          ...action.payload,
          id: 1 + projectsLength,
        };
        state.push(newProject);
      } else {
        const updatedProjectIndex = getUpdatedProjectIndex(projectId, state);

        state[updatedProjectIndex] = action.payload;
      }
      updateCookies(state);
    },
    updateTask: (state, action: PayloadAction<UpdateProjectProps>) => {
      const { projectId, task } = action.payload;
      const updatedProjectIndex = getUpdatedProjectIndex(projectId, state);
      if (task.id === 0) {
        const tasksLength: number = state[updatedProjectIndex].tasks.length;
        const newTask = {
          ...task,
          id: tasksLength + 1,
        };
        state[updatedProjectIndex].tasks.push(newTask);
      } else {
        const updatedTaskIndex = state[updatedProjectIndex].tasks.findIndex(
          (item) => item.id === task.id
        );
        state[updatedProjectIndex].tasks[updatedTaskIndex] = task;
      }
      updateCookies(state);
    },
  },
});

const { updateProjects, setProjects, updateTask } = projectsSlice.actions;

export default projectsSlice.reducer;

export { projectsSlice, updateProjects, setProjects, updateTask };
