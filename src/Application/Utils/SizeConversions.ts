const sizeConversions = (fileSize: number) => {
  if (fileSize <= 1024) return `${fileSize.toFixed(0)}Bytes of 10MB`;
  else if (fileSize > 1024 && fileSize <= 1024 * 1024)
    return `${(fileSize / 1024).toFixed(0)}KB of 10MB`;
  else if (fileSize > 1024 * 1024 && fileSize <= 1024 * 1024 * 1024)
    return `${(fileSize / (1024 * 1024)).toFixed(1)}MB of 10MB`;
  else if (fileSize > 1024 * 1024 * 1024)
    return `${(fileSize / (1024 * 1024 * 1024)).toFixed(0)}GB of 10MB`;
};

export default sizeConversions;
