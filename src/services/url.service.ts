import { format } from "url";

export const validateURLFormat = (url: string): boolean => {
  const regex = /^(http(?:s)?\:\/\/[a-zA-Z0-9]+(?:(?:\.|\-)[a-zA-Z0-9]+)+(?:\:\d+)?(?:\/[\w\-]+)*(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$/;
  if (!regex.test(url)) throw new Error("Error on URL format");
  return true;
};
export const urlParams = (url: string, params?: object): string => {
  return params ? url + format(params) : url;
};
