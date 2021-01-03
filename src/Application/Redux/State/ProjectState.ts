interface IProjectState {
  projectName: string;
  projectDescription: string;
  statusCode: string;
  result: string;
  errors: string[];
}

const projectState: IProjectState = {
  projectName: "",
  projectDescription: "",
  statusCode: "",
  result: "",
  errors: [],
};

export default projectState;
