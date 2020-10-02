interface Dictionary<T> {
  [Key: string]: T;
}
export const messages: Dictionary<string> = {
  uploadError: "Errow while uploading",
  greeting: "Image Processing web API build by Szymon Rucinski",
};
