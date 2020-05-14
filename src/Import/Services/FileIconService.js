import MSExcel from "../Images/MSExcel.svg";
import Notepad from "../Images/Notepad.svg";

const FileIconService = (fileType) => {
  switch (fileType) {
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return MSExcel;
    case "text/plain":
      return Notepad;

    default:
      break;
  }
};

export default FileIconService;
