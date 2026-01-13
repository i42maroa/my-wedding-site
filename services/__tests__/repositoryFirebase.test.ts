import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createDocument,
  updateDocument,
  getDocument,
  getCollection,
  getCollectionByFilter,
  getDocumentByField
} from "../repositoryFirebase";
import { ASISTENCIAS_COLLECTION } from "@/firebase/config";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  where,
  DocumentReference,
  CollectionReference,
  DocumentSnapshot,
  QuerySnapshot,
  Query,
  query,
  DocumentData,
  QueryFieldFilterConstraint
} from "firebase/firestore";
import { FamilyInterface } from "@/interfaces/formTypes";

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(() => "SERVER_TIMESTAMP"),
  doc: vi.fn(),
  updateDoc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
}));

vi.mock("@/firebase/config", () => ({
  ASISTENCIAS_COLLECTION: "asistencias",
  db: {},
}));

const mockedQuery = vi.mocked(query);
const mockedCollection = vi.mocked(collection);
const mockedDoc = vi.mocked(doc);
const mockedAddDoc = vi.mocked(addDoc);
const mockedGetDoc = vi.mocked(getDoc);
const mockedGetDocs = vi.mocked(getDocs);
const mockedUpdateDoc = vi.mocked(updateDoc);
const mockedWhere = vi.mocked(where);


const DOCUMENT_ID =  "doc123";
const mockColRef = { id: ASISTENCIAS_COLLECTION } as CollectionReference;
const mockDocRef = { id: DOCUMENT_ID } as DocumentReference;

const FAMILY_TEST:FamilyInterface = {
    id: DOCUMENT_ID,
    name: "Familia Marín",
    mesa: 4,
    users: ["Antonio", "Sheila"],
    assistanceConfirm: false,
    accessCode: "AS24",
}

describe("repositoryFirebase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createDocument crea un documento y devuelve el id", async () => {
    mockedCollection.mockReturnValue(mockColRef);
    mockedAddDoc.mockResolvedValue(mockDocRef);

    const result = await createDocument(FAMILY_TEST);

    expect(collection).toHaveBeenCalledWith(expect.anything(), ASISTENCIAS_COLLECTION);
    expect(addDoc).toHaveBeenCalledWith(
      mockColRef,
      expect.objectContaining({
        updatedAt: "SERVER_TIMESTAMP",
        ...FAMILY_TEST
      })
    );
    expect(result).toBe(DOCUMENT_ID);
  });

  it("createDocument error al crear el documento", async () => {
    const errorSimulado = new Error("FirebaseError: [firestore/permission-denied]");

    mockedCollection.mockReturnValue(mockColRef);
    mockedAddDoc.mockRejectedValue(errorSimulado);

    await expect(
      createDocument(FAMILY_TEST)
    ).rejects.toThrow("firestore/permission-denied");

    expect(collection).toHaveBeenCalledWith(expect.anything(), ASISTENCIAS_COLLECTION);
    expect(addDoc).toHaveBeenCalled();
  });

  it("updateDocument actualiza un documento", async () => {
    mockedDoc.mockReturnValue(mockDocRef);
    mockedUpdateDoc.mockResolvedValue();

    await updateDocument(DOCUMENT_ID, { asistencia: true });

    expect(doc).toHaveBeenCalledWith(expect.anything(), ASISTENCIAS_COLLECTION, DOCUMENT_ID);
    expect(updateDoc).toHaveBeenCalledWith(
      mockDocRef,
      expect.objectContaining({
        asistencia: true,
        updatedAt: "SERVER_TIMESTAMP",
      })
    );
  });

  it("updateDocument documento no encontrado", async () => {
    const mockDocRef = { id: "non-existent-id" } as DocumentReference;
    const firebaseError = new Error("FirebaseError: [auth/network-request-failed]");

    mockedDoc.mockReturnValue(mockDocRef);
    mockedUpdateDoc.mockRejectedValue(firebaseError);

    await expect(
      updateDocument("non-existent-id", { asistencia: true })
    ).rejects.toThrow("FirebaseError");

    expect(doc).toHaveBeenCalledWith(expect.anything(), ASISTENCIAS_COLLECTION, "non-existent-id");
  });

  it("getDocument devuelve null si no existe", async () => {
    const mockSnapshot = {  
      exists: () => false,
      data: () => undefined} as DocumentSnapshot;

    mockedDoc.mockReturnValue(mockDocRef);
    mockedGetDoc.mockResolvedValue(mockSnapshot);

    const result = await getDocument(DOCUMENT_ID);

    expect(doc).toHaveBeenCalledWith(expect.anything(), ASISTENCIAS_COLLECTION, DOCUMENT_ID);
    expect(getDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toBeNull();
  });

  it("getDocument devuelve el documento si existe", async () => {
    const mockSnapshot = {
      exists: () => true,
      id: DOCUMENT_ID,
      data: () => FAMILY_TEST,
    } as DocumentSnapshot<FamilyInterface>;

    mockedGetDoc.mockResolvedValue(mockSnapshot);

    const result = await getDocument<FamilyInterface>(DOCUMENT_ID);

    expect(result).toEqual({
       ...FAMILY_TEST, id: DOCUMENT_ID
    });
  });

  it("getCollection devuelve una lista de documentos", async () => {
    const mockQuerySnapshot = { 
      docs:[
        {
          id: "1",
          data: () => ({ name: "Family A" }),
        },
        {
          id: "2",
          data: () => ({ name: "Family B" }),
        }
      ]
    } as QuerySnapshot<FamilyInterface>;

    mockedGetDocs.mockResolvedValue(mockQuerySnapshot);

    const result = await getCollection<{ name: string }>();

    expect(result).toEqual([
      { id: "1", name: "Family A" },
      { id: "2", name: "Family B" }
    ]);
  });

  it("getCollection no encuentra documentos", async () => {
    const mockQuerySnapshot = { 
      docs:[]
    } as unknown as QuerySnapshot<FamilyInterface>;

    mockedGetDocs.mockResolvedValue(mockQuerySnapshot);

    const result = await getCollection<{ name: string }>();

    expect(result).toEqual([]);
  });


  it("getCollectionByFilter filtra correctamente", async () => {
    const mockQueryConstraint = { type: "where" } as QueryFieldFilterConstraint;
    const mockQuery = { type: "query"} as Query<DocumentData>;

    const mockQuerySnapshot = { 
      docs: [
          {
            id: "1",
            data: () => ({ name:"Familia A", assistanceConfirm: true }),
          }
        ] 
    } as QuerySnapshot<FamilyInterface>;

    mockedWhere.mockReturnValue(mockQueryConstraint);
    mockedQuery.mockReturnValue(mockQuery);
    mockedGetDocs.mockResolvedValue(mockQuerySnapshot);

      const result = await getCollectionByFilter<FamilyInterface,"assistanceConfirm">
        ("assistanceConfirm", true);

      expect(where).toHaveBeenCalledWith("assistanceConfirm", "==", true);
      expect(query).toHaveBeenCalledWith(expect.anything(), mockQueryConstraint);
      expect(result).toEqual([{ id: "1", name:"Familia A", assistanceConfirm: true  }]);
  });

  it("getCollectionByFilter no encuentra ningún elemento", async () => {
    const mockQueryConstraint = { type: "where" } as QueryFieldFilterConstraint;
    const mockQuery = { type: "query"} as Query<DocumentData>;

    const mockQuerySnapshot = { 
      empty: true,
      docs: [] 
    } as unknown as QuerySnapshot<FamilyInterface>;

    mockedWhere.mockReturnValue(mockQueryConstraint);
    mockedQuery.mockReturnValue(mockQuery);
    mockedGetDocs.mockResolvedValue(mockQuerySnapshot);

      const result = await getCollectionByFilter<FamilyInterface,"assistanceConfirm">("assistanceConfirm", true);

      expect(where).toHaveBeenCalledWith("assistanceConfirm", "==", true);
      expect(query).toHaveBeenCalledWith(expect.anything(), mockQueryConstraint);
      expect(result).toEqual([]);
  });

  it("getDocumentByField devuelve el primer documento", async () => {
    const mockConstraint = { type: "where" } as QueryFieldFilterConstraint;
    const mockQuery = { type: "query"} as Query<DocumentData>;

    const mockSnapshot = {
        empty: false,
        docs: [
          {
            id: DOCUMENT_ID,
            data: () => ({ accessCode: "ABC" })
          }
        ]
      } as QuerySnapshot<FamilyInterface>;

    mockedWhere.mockReturnValue(mockConstraint);
    mockedQuery.mockReturnValue(mockQuery);
    mockedGetDocs.mockResolvedValue(mockSnapshot);

    const result = await getDocumentByField<FamilyInterface, "accessCode">("accessCode", "ABC");

    expect(result).toEqual({  id: DOCUMENT_ID, accessCode: "ABC"});
  });

  it("getDocumentByField devuelve null si no hay resultados", async () => {
    const mockSnapshot = {
        empty: true,
        docs: []
      } as unknown as QuerySnapshot<FamilyInterface>;
      
    mockedGetDocs.mockResolvedValue(mockSnapshot);
    const result = await getDocumentByField<FamilyInterface,"accessCode">("accessCode", "ABC");

    expect(result).toBeNull();
  });
});
