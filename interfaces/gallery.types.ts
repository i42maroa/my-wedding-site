
export type AlbumType = "preboda" | "boda";
export type ReactionKey = "❤️" | "😂" | "😍" | "🥳" | "🔥";

export interface AlbumInterface {
  id: AlbumType;
  name: string;
  description: string;
  isVisible: boolean;
  isUnlocked: boolean;
  guestUploadsEnabled: boolean;
  maxUploadsPerFamily: number;
  unlockAt?: string | null;
}

export interface PhotoInterface {
  albumType: AlbumType;
  familyId: string | null;
  thumbUrl: string;
  displayUrl: string;
  alt: string;
  uploadedByType: "guest" | "admin";
  createdAt?: unknown;
  reactionsCount: Record<ReactionKey, number>;
  status: "published" | "hidden" | "rejected";
}

export interface PhotoEntity extends PhotoInterface{
  id: string;
}

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp"
];

export const ALBUMS:AlbumInterface[] = [ 
  {
    id:'preboda',
    name:'Preboda',
    description:'Queremos que compartáis fotografías con nosostros o',
    isVisible:true,
    isUnlocked:true,
    guestUploadsEnabled:true,
    maxUploadsPerFamily:5
  },
  {
    id:'boda',
    name:'Fotos boda',
    description:'',
    isVisible:true,
    isUnlocked:false,
    guestUploadsEnabled:false,
    maxUploadsPerFamily:5
  }
] 