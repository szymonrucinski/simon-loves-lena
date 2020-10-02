interface Dictionary<T> {
  [Key: string]: T;
}
const messages: Dictionary<string> = {
  uploadError: "Errow while uploading",
  greeting: "Image Processing web API build by Szymon Rucinski",
};
export default messages;
