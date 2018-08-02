export const randomNonce = () => Math.floor(Math.random() * 1000000);
export const randomNum = () => Math.floor(Math.random() * 1000000);
export function addToAccess(obj, count, newItem) {
  const size = Object.keys(obj).length;
  if (size < count) {
    obj.push(newItem);
  } else {
    // arr.splice(indexToRemove, numToRemove)
    obj.splice(0, 1);
    obj.push(newItem);
  }
  return obj;
}

export function getClientAccess(req) {
  const ipAddress = req.ip || req._remoteAddress;
  // const lang = req.get("accept-language");
  const accessDate = req._startTime || "";
  return { accessDate, ipAddress };
}
