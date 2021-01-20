const getBaseUrl = (url: string) => {
  if (url) return url.substring(0, url.lastIndexOf("/"));
};

export default getBaseUrl;
