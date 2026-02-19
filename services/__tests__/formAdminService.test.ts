import { describe, test, expect } from "vitest";
import { FormDataAdmin } from "@/interfaces/formTypes";
import { submitForm, validateFormAdmin } from "../formAdminService";
import { generateAccessCode } from "../accessCodeService";
import { createNewFamily } from "../dbService";

vi.mock("../dbService", () => ({
  createNewFamily: vi.fn(),
}));

vi.mock("../accessCodeService", () => ({
  generateAccessCode: vi.fn(),
}));


const baseForm: FormDataAdmin = {
  name: "Familia García",
  mesa: 3,
  origen:'novio',
  users: ["Ana"],
};

describe("validateFormAdmin", () => {
  test("falla si no hay nombre", () => {
    const { isValid, errors } = validateFormAdmin({
      ...baseForm,
      name: "",
    });

    expect(isValid).toBe(false);
    expect(errors.nombre).toBeDefined();
  });

  test("falla si no hay usuarios válidos", () => {
    const { isValid, errors } = validateFormAdmin({
      ...baseForm,
      users: ["", "   "],
    });

    expect(isValid).toBe(false);
    expect(errors.users).toBe("Minimo un usuario por familia");
  });

  test("es válido con datos correctos", () => {
    const { isValid, errors } = validateFormAdmin(baseForm);

    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });
});


describe("submitForm", () => {
  test("limpia usuarios, genera accessCode y crea familia", async () => {
    const formData: FormDataAdmin = {
      name: "Familia López",
      mesa: 4,
      origen:'novio',
      users: ["Ana", "", "Luis"],
    };

    const mockedGenerateAccessCode = vi.mocked(generateAccessCode);
    const mockedCreateNewFamily = vi.mocked(createNewFamily);
    
    mockedGenerateAccessCode.mockReturnValue("AL24");
    mockedCreateNewFamily.mockResolvedValue("family-id-123");

    const result = await submitForm(formData);

    expect(generateAccessCode).toHaveBeenCalledWith(formData);

    expect(createNewFamily).toHaveBeenCalledWith({
      name: "Familia López",
      mesa: 4,
      users: ["Ana", "Luis"],
      assistanceConfirm: false,
      accessCode: "AL24",
      origen:'novio'
    });

    expect(result).toBe("family-id-123");
  });
});