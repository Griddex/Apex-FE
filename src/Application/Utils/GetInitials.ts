const GetInitials = (text: string) => {
  if (text === undefined) return "";

  const textArray = text.split(" ");
  const Initials = textArray.map((s) => s.charAt(0));

  return Initials.join();
};

export default GetInitials;
