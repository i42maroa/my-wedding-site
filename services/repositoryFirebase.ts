
import { collection, addDoc, serverTimestamp, doc, updateDoc, query, where, getDocs, DocumentData, getDoc, QueryConstraint, deleteDoc, orderBy, startAfter, limit, QueryDocumentSnapshot } from "firebase/firestore";
import { ASISTENCIAS_COLLECTION, db } from "@/firebase/config";

export interface  PageableInterface<T> {
  documents:T[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null
  hasMore:boolean 
}


export const createDocument = async <T extends DocumentData>(data: T, collectionName: string = ASISTENCIAS_COLLECTION): Promise<string> => {
  const colRef = collection(db, collectionName);
  const dataWithDateChange = {...data, updatedAt: serverTimestamp()}
  const docRef = await addDoc(colRef, dataWithDateChange);
  return docRef.id;
};

export const updateDocument = async<T> (docId: string, data: T, collectionName:string = ASISTENCIAS_COLLECTION): Promise<void> => {
  const ref = doc(db, collectionName, docId);
  const dataWithDateChange = {...data, updatedAt: serverTimestamp()}
  await updateDoc(ref, dataWithDateChange);
};

export const deleteDocument = async (docId: string,collectionName: string): Promise<void> => {
  const ref = doc(db, collectionName, docId);
  await deleteDoc(ref);
};

export const getDocument = async <T extends DocumentData>( docId: string, collectionName: string = ASISTENCIAS_COLLECTION): Promise<T | null> => {
  const ref = doc(db, collectionName, docId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {id: snap.id, ...(snap.data() as T)};
};

export const getCollection = async <T extends DocumentData>(collectionName: string = ASISTENCIAS_COLLECTION): Promise<Array<T>> => {
  const colRef = collection(db, collectionName);

  const snap = await getDocs(colRef);

  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T)}));
};

export const getCollectionByFilter = async <T extends DocumentData, K extends keyof T>(field: K, value: T[K],collectionName: string = ASISTENCIAS_COLLECTION): Promise<Array<T>> => {
  const colRef = collection(db, collectionName);
  const qRef = query(colRef, where(field as string, "==", value));

  const snap = await getDocs(qRef);

  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T)}));
};

export const getCollectionPageByFilter = async <T extends DocumentData, K extends keyof T>(field: K, value: T[K], collectionName: string = ASISTENCIAS_COLLECTION, lim:number = 0, lastDoc?: QueryDocumentSnapshot<DocumentData> | null): Promise<PageableInterface<T>> => {
  const colRef = collection(db, collectionName);

  let qRef;
  if(lastDoc){
    qRef = query(colRef, where(field as string, "==", value),
                                  orderBy("createdAt", "desc"),
                                  startAfter(lastDoc),
                                  limit(lim))
  }
  else {
    qRef = query(colRef, where(field as string, "==", value),
                                  orderBy("createdAt", "desc"),
                                  limit(lim))
  }

  const snap = await getDocs(qRef);

  const documents = snap.docs.map((d) => ({ id: d.id, ...(d.data() as T)}));
  
  return {
      documents,
      lastDoc: snap.docs.length ? snap.docs[snap.docs.length - 1] : null,
      hasMore: snap.docs.length === lim,
    };
};

export const getDocumentByField = async <T extends DocumentData, K extends keyof T>( 
    field: K, value: T[K], collectionName: string = ASISTENCIAS_COLLECTION): Promise<T | null> => {
  
  const colRef = collection(db, collectionName);
  const qRef = query(colRef, where(field as string, "==", value));
  const snap = await getDocs(qRef);

  if (snap.empty) return null;

  const docSnap = snap.docs[0];

  return { id: docSnap.id,...(docSnap.data() as T)};
};