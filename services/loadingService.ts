type LoadingSubscriber = (isLoading: boolean) => void;

const subscribers = new Set<LoadingSubscriber>();
let loadingCount = 0;

export function subscribeToLoading(callback: LoadingSubscriber) {
  subscribers.add(callback);
}

export function unsubscribeFromLoading(callback: LoadingSubscriber) {
  subscribers.delete(callback);
}

function notifySubscribers() {
  const isLoading = loadingCount > 0;
  for (const callback of subscribers) callback(isLoading);
}

export function startLoading() {
  loadingCount++;
  notifySubscribers();
}

export function stopLoading() {
  if (loadingCount > 0) loadingCount--;
  notifySubscribers();
}

export function resetLoading() {
  loadingCount = 0;
  notifySubscribers();
}
