export const getDummyPicture = (
  keyword: string,
  category: string = "initials"
) => {
  return `https://avatars.dicebear.com/api/${category}/${encodeURI(
    keyword
  )}.svg`;
};
