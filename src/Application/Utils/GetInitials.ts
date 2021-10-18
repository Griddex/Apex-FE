const GetInitials = (text: string) => {
  if (!text) return "";

  const textArray = text.split(" ");
  const Initials = textArray.map((s) => s.charAt(0).toUpperCase());

  return Initials.join();
};

export default GetInitials;
