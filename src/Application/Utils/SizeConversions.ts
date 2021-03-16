const sizeConversions = (fileSize: number, sizeCategory: "MB" | "GB") => {
  switch (sizeCategory) {
    case "MB":
      return (fileSize / (1024 * 1024)).toFixed(1);
    case "GB":
      return (fileSize / (1024 * 1024 * 1024)).toFixed(0);

    default:
      return fileSize;
  }
};

export default sizeConversions;
