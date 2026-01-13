import { describe, expect, test, beforeEach } from "vitest";
import { loadItemFromLocalStorage, saveItemInLocalStorage } from "../localStorageService";

describe("localStorageService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("saveItemInLocalStorage guarda el item serializado", () => {
    const key = "test-key";
    const value = {
      name: "Antonio",
      age: 30,
      admin: true,
    };

    saveItemInLocalStorage(value, key);

    const rawValue = localStorage.getItem(key);

    expect(rawValue).toBe(JSON.stringify(value));
  });

  test("loadItemFromLocalStorage devuelve el objeto cuando existe", () => {
    const key = "family-123";
    const storedValue = {
      id: "123",
      users: ["Antonio", "Lucía"],
    };

    localStorage.setItem(key, JSON.stringify(storedValue));

    const result = loadItemFromLocalStorage<typeof storedValue>(key);

    expect(result).toEqual(storedValue);
  });

  test("loadItemFromLocalStorage devuelve null cuando no existe la key", () => {
    const result = loadItemFromLocalStorage("non-existing-key");

    expect(result).toBeNull();
  });

  test("loadItemFromLocalStorage devuelve correctamente tipos genéricos", () => {
    type CustomType = {
      id: string;
      count: number;
    };

    const key = "custom-type";
    const value: CustomType = {
      id: "abc",
      count: 5,
    };

    localStorage.setItem(key, JSON.stringify(value));

    const result = loadItemFromLocalStorage<CustomType>(key);

    expect(result?.count).toBe(5);
    expect(result?.id).toBe("abc");
  });
});
