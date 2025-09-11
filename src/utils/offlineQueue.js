export function queueWrite(type, data) {
  const key = `offlineQueue_${type}`;
  const queue = JSON.parse(localStorage.getItem(key) || "[]");
  queue.push(data);
  localStorage.setItem(key, JSON.stringify(queue));
}

export function getQueuedWrites(type) {
  const key = `offlineQueue_${type}`;
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function clearQueuedWrites(type) {
  const key = `offlineQueue_${type}`;
  localStorage.removeItem(key);
}
