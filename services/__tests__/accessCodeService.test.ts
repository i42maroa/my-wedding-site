import { describe, expect } from "vitest";
import { generateAccessCode } from "../accessCodeService";
import type { FormDataAdmin } from "@/interfaces/formTypes";

describe("generateAccessCode", () => {
  it("genera el código con un solo usuario", () => {
    const formData: FormDataAdmin = {
      users: ["Antonio"],
      name:"Abuelo",
      mesa: 3,
      origen:'novio'
    };

    const result = generateAccessCode(formData);

    expect(result).toBe("AA10");
  });

  it("genera el código con varios usuarios", () => {
    const formData: FormDataAdmin = {
      users: ["Antonio", "Lucía"],
      name:"",
      mesa: 5,
      origen:'novia'
    };

    const result = generateAccessCode(formData);

    expect(result).toBe("AL21");
  });

  it("recorta espacios y usa mayúsculas", () => {
    const formData: FormDataAdmin = {
      users: [" antonio ", "   lucía"],
      name:"",
      mesa: 1,
      origen:'novio'
    };

    const result = generateAccessCode(formData);

    expect(result).toBe("AL20");
  });

  it("funciona con nombres compuestos", () => {
    const formData: FormDataAdmin = {
      users: ["Juan Carlos", "María José"],
      name:"Amigos Antonio",
      mesa: 10,
      origen:'novio'
    };

    const result = generateAccessCode(formData);
    expect(result).toBe("AJM20");
  });

   it("genera código vacío si no hay usuarios", () => {
        const formData: FormDataAdmin = {
        users: [],
        name:"",
        mesa: 3,
        origen:'novio'
        };

        const result = generateAccessCode(formData);

        expect(result).toBe("");
    });

    it("genera código vacío si no hay numero de mesa", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formData: any = {
        users: [],
        name:"",
        };

        const result = generateAccessCode(formData);

        expect(result).toBe("");
    });

    it("genera código vacío si solo hay usuarios con nombre vacío", () => {
        const formData: FormDataAdmin = {
        users: [""],
        name:"",
        mesa: 3,
        origen:'novio'
        };

        const result = generateAccessCode(formData);

        expect(result).toBe("");
    });
});
