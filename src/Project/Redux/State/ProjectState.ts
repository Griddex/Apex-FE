import { IProjectState } from "./ProjectStateTypes";

const projectState: IProjectState = {
  projectId: "",
  projectTitle: "",
  projectDescription: "",

  selectedProjectId: "",
  selectedProjectTitle: "",
  selectedProjectDescription: "",

  currentProjectId: "",
  currentProjectTitle: "",
  currentProjectDescription: "",

  pressureAddend: 14.7,
  storedProjects: [],
};

export default projectState;
