import { vi, type MockedFunction } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import type { FamilyInterface } from "@/interfaces/formTypes";

/* ---------- MOCKS DE MÓDULOS ---------- */

vi.mock("@/services/dbService", () => ({ getFamilyByAccessCode: vi.fn()}));

vi.mock("@/services/localStorageService", () => ({ loadItemFromLocalStorage: vi.fn()}));

vi.mock("@/services/loadingService", () => ({
  startLoading: vi.fn(),
  stopLoading: vi.fn()
}));

/* ---------- IMPORTS REALES (YA MOCKEADOS) ---------- */

import { getFamilyByAccessCode } from "@/services/dbService";
import { loadItemFromLocalStorage } from "@/services/localStorageService";
import { startLoading, stopLoading } from "@/services/loadingService";
import { useLoadFamily } from "../useLoadFamily";
import { AppError, mapFirebaseError } from "@/helper/mapFirebaseError";

/* ---------- MOCKS TIPADOS ---------- */

const mockedGetFamilyByAccessCode: MockedFunction<typeof getFamilyByAccessCode> = getFamilyByAccessCode as any;
const mockedLoadItemFromLocalStorage: MockedFunction<typeof loadItemFromLocalStorage> = loadItemFromLocalStorage as any;
const mockedStartLoading: MockedFunction<typeof startLoading> = startLoading as any;
const mockedStopLoading: MockedFunction<typeof stopLoading> = stopLoading as any;

describe("useLoadFamily", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("si hay datos en localStorage, los usa y no llama a la BD", async () => {
    const accessCode = "LOCAL123";

    const familyFromStorage: FamilyInterface = {
      id: "1",
      users: ["Antonio"],
      assistance: undefined,
      assistanceConfirm: false,
      mesa: 1,
      accessCode,
      name: "Familia Antonio",
    };

    mockedLoadItemFromLocalStorage.mockReturnValue(familyFromStorage);

    const { result } = renderHook(() => useLoadFamily(accessCode));

    // loading debería pasar a false y family ser la del localStorage
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.family).toEqual(familyFromStorage);
    });

    expect(mockedLoadItemFromLocalStorage).toHaveBeenCalledWith(accessCode);
    expect(mockedGetFamilyByAccessCode).not.toHaveBeenCalled();
    expect(mockedStartLoading).not.toHaveBeenCalled();
    expect(mockedStopLoading).not.toHaveBeenCalled();
    expect(result.current.error).toBeUndefined();
  });

  test("si no hay localStorage, carga familia desde la BD y actualiza estados", async () => {
    const accessCode = "DB123";

    mockedLoadItemFromLocalStorage.mockReturnValue(null);

    const familyFromDb: FamilyInterface = {
      id: "2",
      users: ["Ana", "Luis"],
      assistance: undefined,
      assistanceConfirm: false,
      mesa: 3,
      accessCode,
      name: "Familia Ana y Luis",
    };

    mockedGetFamilyByAccessCode.mockResolvedValue(familyFromDb);

    const { result } = renderHook(() => useLoadFamily(accessCode));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.family).toEqual(familyFromDb);
    });

    expect(mockedLoadItemFromLocalStorage).toHaveBeenCalledWith(accessCode);
    expect(mockedStartLoading).toHaveBeenCalled();
    expect(mockedGetFamilyByAccessCode).toHaveBeenCalledWith(accessCode);
    expect(mockedStopLoading).toHaveBeenCalled();
    expect(result.current.error).toBeUndefined();
  });

  test("si la BD lanza error, deja family a null, guarda el error y para loading", async () => {
    const accessCode = "ERR123";

    mockedLoadItemFromLocalStorage.mockReturnValue(null);

    const appError = mapFirebaseError("auth/invalid-api-key");

    mockedGetFamilyByAccessCode.mockRejectedValue(appError);

    const { result } = renderHook(() => useLoadFamily(accessCode));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.family).toBeNull();
      expect(result.current.error).toEqual(appError);
    });

    expect(mockedLoadItemFromLocalStorage).toHaveBeenCalledWith(accessCode);
    expect(mockedStartLoading).toHaveBeenCalled();
    expect(mockedGetFamilyByAccessCode).toHaveBeenCalledWith(accessCode);
    expect(mockedStopLoading).toHaveBeenCalled();
  });
});
