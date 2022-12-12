export const getDummyPicture = (
  keyword: string,
  category: string = "initials"
) => {
  return `https://avatars.dicebear.com/api/${category}/${encodeURI(
    keyword
  )}.svg`;
};

import { Web3Storage } from "web3.storage";

export const web3Client = () =>
  new Web3Storage({
    token: process.env.WEB3_STORAGE_TOKEN!,
  });
