const GetInitials = (text: string) => {
  const textArray = text.split(" ");
  const Initials = textArray.map((s) => s.charAt(0));
  return Initials.join();
};

export default GetInitials;
