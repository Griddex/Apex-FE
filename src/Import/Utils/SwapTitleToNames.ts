import { IApplicationHeaders } from "../Routes/Common/Workflows/MatchHeadersTypes";

const swapTitleToNames = (
  chosenHeaders: string[],
  applicationHeaders: IApplicationHeaders[]
) => {
  console.log(
    "Logged output --> ~ file: SwapTitleToNames.ts ~ line 7 ~ applicationHeaders",
    applicationHeaders
  );
  console.log(
    "Logged output --> ~ file: SwapTitleToNames.ts ~ line 7 ~ chosenHeaders",
    chosenHeaders
  );
  const headers = [];
  for (const header of chosenHeaders) {
    for (const appHeader of applicationHeaders) {
      if (header === appHeader.variableTitle) {
        headers.push(appHeader.variableName);
        break;
      }
    }
  }

  console.log(
    "Logged output --> ~ file: SwapTitleToNames.ts ~ line 18 ~ headers",
    headers
  );
  return headers;
};

export default swapTitleToNames;
