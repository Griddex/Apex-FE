import MSExcel from "../Images/MSExcel.svg";

const fileSizeService = (fileType: string) => {
  switch (fileType) {
    case ".xls":
      return MSExcel;

    default:
      return;
  }
};

export default fileSizeService;
