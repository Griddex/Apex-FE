import MSExcel from "../Images/MSExcel.svg";
import Notepad from "../Images/Notepad.svg";

const fileIconService = (fileType: string) => {
  switch (fileType) {
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return MSExcel;
    case "text/plain":
      return Notepad;

    default:
      break;
  }
};

export default fileIconService;
