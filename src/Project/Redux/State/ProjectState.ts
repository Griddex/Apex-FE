import { IProjectState } from "./ProjectStateTypes";

const projectState: IProjectState = {
  projectId: "",
  projectTitle: "",
  projectDescription: "",

  selectedProjectId: "",
  selectedProjectTitle: "",
  selectedProjectDescription: "",

  pressureAddend: 14.7,
  recentProjects: [],
  existingProjects: [],
};

export default projectState;
