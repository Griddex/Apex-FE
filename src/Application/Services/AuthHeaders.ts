const authHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Accept-Language": "en-US, en;q=0.8",
    "X-Access-Token": sessionStorage.getItem("token") as string,
  };
};

export default authHeaders;
