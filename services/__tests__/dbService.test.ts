import { describe, test, expect, vi, beforeEach } from "vitest";
import {
  getFamilyById,
  getFamilyByAccessCode,
  getAllFamilies,
  getAllFamiliesByAssistence,
  createNewFamily,
  updateAsistencia,
} from "../dbService";

import {
  getDocument,
  getDocumentByField,
  getCollection,
  getCollectionByFilter,
  createDocument,
  updateDocument,
} from "../repositoryFirebase";

import { AppError, mapFirebaseError } from "@/helper/mapFirebaseError";
import { FamilyInterface, FormDataAdmin, FormDataAsistencia } from "@/interfaces/formTypes";

vi.mock("../repositoryFirebase", () => ({
  getDocument: vi.fn(),
  getDocumentByField: vi.fn(),
  getCollection: vi.fn(),
  getCollectionByFilter: vi.fn(),
  createDocument: vi.fn(),
  updateDocument: vi.fn(),
}));

vi.mock("@/helper/mapFirebaseError", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/helper/mapFirebaseError")>();

  return {
    ...actual,          
    mapFirebaseError: vi.fn()
  };
});

const MOCKED_FAMILY :FamilyInterface = {
    id:"1234",
    mesa:1,
    users:["Antonio", "Sheila"],
    name:"Familia Marín",
    assistanceConfirm:false,
    accessCode:"AS21"
}

describe("localStorageService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("getFamilyById devuelve una familia", async () => {
        vi.mocked(getDocument).mockResolvedValue(MOCKED_FAMILY);

        const result = await getFamilyById("1");

        expect(getDocument).toHaveBeenCalledWith("1");
        expect(result).toEqual(MOCKED_FAMILY);
    });

    test("getFamilyByAccessCode devuelve una familia", async () => {
        vi.mocked(getDocumentByField).mockResolvedValue(MOCKED_FAMILY);

        const result = await getFamilyByAccessCode("AS21");

        expect(getDocumentByField).toHaveBeenCalledWith("accessCode", "AS21");
        expect(result).toEqual(MOCKED_FAMILY);
    });

    test("getAllFamilies devuelve listado", async () => {
        const families = [MOCKED_FAMILY];
        vi.mocked(getCollection).mockResolvedValue(families);

        const result = await getAllFamilies();

        expect(result).toEqual(families);
    });

    test("getAllFamiliesByAssistence filtra por asistencia", async () => {
        const confirmedFamily:FamilyInterface[] = [{...MOCKED_FAMILY, assistanceConfirm:true}]
        vi.mocked(getCollectionByFilter).mockResolvedValue(confirmedFamily);

        const result = await getAllFamiliesByAssistence(true);

        expect(getCollectionByFilter).toHaveBeenCalledWith("assistanceConfirm", true);
        expect(result).toEqual(confirmedFamily);
    });

    test("createNewFamily crea una familia y devuelve id", async () => {
        vi.mocked(createDocument).mockResolvedValue("family-id");

        const data = { name: "Familia", mesa: 1, users: ["Ana"] } as FormDataAdmin;
        const result = await createNewFamily(data);

        expect(createDocument).toHaveBeenCalledWith(data);
        expect(result).toBe("family-id");
    });

    test("updateAsistencia actualiza la asistencia y limpia localStorage", async () => {
        const removeSpy = vi.spyOn(Storage.prototype, "removeItem");

        const data: FormDataAsistencia = {
            id: "123",
            transporte: "car",
            intolerancia: true,
            detallesIntolerancia: "gluten",
            mensaje: "Nos vemos",
            assistanceConfirm:true
        };

        vi.mocked(updateDocument).mockResolvedValue(undefined);

        await updateAsistencia(data, "AS21");

        expect(removeSpy).toHaveBeenCalledWith("AS21");

        expect(updateDocument).toHaveBeenCalledWith(data.id, {
            assistanceConfirm: true,
            assistance: {
            transporte: "car",
            intolerancia: true,
            detalleIntolerancia: "gluten",
            mensaje: "Nos vemos",
            },
        });
    });

    test("lanza AppError cuando Firebase falla", async () => {
        const firebaseError = new Error("firebase fail");
        const appError = new AppError("firebase/error", "UNAUTHENTICATED");

        vi.mocked(getDocument).mockRejectedValue(firebaseError);
        vi.mocked(mapFirebaseError).mockReturnValue(appError);

        await expect(getFamilyById("1")).rejects.toBe(appError);
    });
});