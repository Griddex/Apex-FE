import { IApplicationHeaders } from "../Routes/Common/Workflows/MatchHeadersTypes";

const swapTitleToNames = (
  chosenHeaders: string[],
  applicationHeaders: IApplicationHeaders[]
) => {
  const headers = [];
  for (const header of chosenHeaders) {
    for (const appHeader of applicationHeaders) {
      if (header === appHeader.variableTitle) {
        headers.push(appHeader.variableName);
        break;
      }
    }
  }

  return headers;
};

export default swapTitleToNames;
