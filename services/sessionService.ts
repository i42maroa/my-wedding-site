import { GUEST_SESSION_KEY, GuestSession } from "@/interfaces/guest.interface";
import { getFamilyByAccessCode } from "./dbService";
import { auth } from "@/firebase/config";
import { signInAnonymously, signOut } from "firebase/auth";
import { loadItemFromLocalStorage, removeLocalStorage, saveItemInLocalStorage } from "./localStorageService";
import { clearGuestSession, setGuestSession } from "./guestSessionBus";


export async function loginGuestSession(accessCode: string): Promise<GuestSession> {
  return getFamilyByAccessCode(accessCode)
    .then(family => {
      if (!family?.id) {
          throw new Error("Código de acceso no válido");
        }

        const session: GuestSession = {
          familyId: family.id,
          accessCode,
          familyName: family.name,
          photosAccess: true,
          createdAt: Date.now(),
          users:[...family.users]
        };
        saveItemInLocalStorage<GuestSession>(session, GUEST_SESSION_KEY);       
        
      return signInAnonymously(auth)
        .then(() => {
          setGuestSession(session);
          return session;
        });
    }); 
}

export function getGuestSession(): GuestSession | null {
  if (typeof window === "undefined") return null;

  try {
    return loadItemFromLocalStorage<GuestSession>(GUEST_SESSION_KEY);
  } catch {
    removeLocalStorage(GUEST_SESSION_KEY);
    return null;
  }
}

export function logoutGuestSession(): void {
  if (typeof window !== "undefined") {
    removeLocalStorage(GUEST_SESSION_KEY);
  }
  signOut(auth).catch(() => {})
  clearGuestSession();
}