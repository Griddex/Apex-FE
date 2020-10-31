import MSExcel from "../Images/MSExcel.svg";

const FileSizeService = (fileType) => {
  switch (fileType) {
    case ".xls":
      return MSExcel;

    default:
      return;
  }
};

export default FileSizeService;
