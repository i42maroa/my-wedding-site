export const GUEST_SESSION_KEY = "wedding_guest_session";

export interface GuestSession {
  familyId: string;
  accessCode: string;
  familyName?: string;
  photosAccess: true;
  createdAt: number;
  users:string[];
}