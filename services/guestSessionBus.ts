import { GuestSession } from "@/interfaces/guest.interface";

type GuestSessionSubscriber = () => void;

const subscribers = new Set<GuestSessionSubscriber>();

let currentSession: GuestSession | null = null;

function notifySubscribers() {
  for (const callback of subscribers) {
    callback();
  }
}

export function subscribeToGuestSession(callback: GuestSessionSubscriber) {
  subscribers.add(callback);

  return () => subscribers.delete(callback);
}

export function getGuestSessionSnapshot(): GuestSession | null {
  return currentSession;
}

export function setGuestSession(session: GuestSession | null) {
  currentSession = session;
  notifySubscribers();
}

export function clearGuestSession() {
  currentSession = null;
  notifySubscribers();
}

export function initGuestSessionFromStorage(session: GuestSession | null) {
  currentSession = session;
  notifySubscribers();
}