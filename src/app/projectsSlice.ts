import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Project } from "../types/projectTypes";

// interface ProjectsState {
//   projects: Project[];
// }

const initialState: Project[] = [] as Project[];

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      return action.payload;
    },
    updateProjects: (state, action: PayloadAction<Project>) => {
      if (action.payload.id === 0) {
        const newProject = {
          ...action.payload,
          id: 1 + state.length,
        };
        state.push(newProject);
      } else {
        const updatedProjectIndex = state.findIndex(
          (project) => project.id === action.payload.id
        );
        state[updatedProjectIndex] = action.payload;
      }
      document.cookie = `projects=${JSON.stringify(state)}`;
    },
  },
});

const { updateProjects, setProjects } = projectsSlice.actions;

export default projectsSlice.reducer;

export { projectsSlice, updateProjects, setProjects };
