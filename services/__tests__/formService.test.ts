import { describe, it, expect, vi } from "vitest";
import {
  validateForm,
  validateFormLogin,
  submitForm,
  preloadForm
} from "../formService";
import { updateAsistencia } from "../dbService";
import {
  FamilyInterface,
  FORM_DATA_DEFAULT,
  FormDataAsistencia,
  FormDataLogin
} from "@/interfaces/formTypes";


vi.mock("../dbService", () => ({
  updateAsistencia: vi.fn(),
}));

const mockedUpdateAsistencia = vi.mocked(updateAsistencia);

describe("validateForm", () => {
  it("devuelve error si no hay transporte", () => {
    const data = {id:'', intolerancia: false} as FormDataAsistencia;

    const result = validateForm(data);

    expect(result.isValid).toBe(false);
    expect(result.errors.transporte).toBe("Selecciona cómo vas a venir.");
  });

  it("devuelve error si hay intolerancia pero no detalles", () => {
    const data: FormDataAsistencia = {
      ...FORM_DATA_DEFAULT,
      transporte: "car",
      intolerancia: true,
      detallesIntolerancia: "",
    };

    const result = validateForm(data);

    expect(result.isValid).toBe(false);
    expect(result.errors.detallesIntolerancia).toBe(
      "Indica que intolerancia tienes."
    );
  });

  it("es válido con datos correctos", () => {
    const data: FormDataAsistencia = {
      ...FORM_DATA_DEFAULT,
      transporte: "bus",
      intolerancia: false,
    };

    const result = validateForm(data);

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });
});


describe("validateFormLogin", () => {
  it("devuelve error si accessCode está vacío", () => {
    const data: FormDataLogin = { accessCode: "" };

    const result = validateFormLogin(data);

    expect(result.isValid).toBe(false);
    expect(result.errors.accessCode).toBe(
      "Introduce el codigo de familia"
    );
  });

  it("es válido si accessCode existe", () => {
    const data: FormDataLogin = { accessCode: "ABC123" };

    const result = validateFormLogin(data);

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });
});

describe("submitForm", () => {
  it("llama a updateAsistencia con los datos correctos", async () => {
    mockedUpdateAsistencia.mockResolvedValue();

    const formData: FormDataAsistencia = {
      ...FORM_DATA_DEFAULT,
      transporte: "car",
    };

    await submitForm(formData, "ABC123");

    expect(mockedUpdateAsistencia).toHaveBeenCalledOnce();
    expect(mockedUpdateAsistencia).toHaveBeenCalledWith(
      formData,
      "ABC123"
    );
  });
});


describe("preloadForm", () => {
  it("carga datos de asistencia si existen", () => {
    const family: FamilyInterface = {
      id: "1",
      users: ["Antonio"],
      accessCode: "A1",
      name: "Familia A",
      mesa: 2,
      assistanceConfirm: true,
      origen:'novio',
      assistance: {
        intolerancia: true,
        detalleIntolerancia: "gluten",
        transporte: "bus",
        mensaje: "todo ok"
      },
    };

    const result = preloadForm(family);

    expect(result).toEqual({
      id: "1",
      assistanceConfirm: true,
      intolerancia: true,
      detallesIntolerancia: "gluten",
      transporte: "bus",
      mensaje: "todo ok",
      origen:'novio'
    });
  });

  it("devuelve valores por defecto si no hay asistencia", () => {
    const family: FamilyInterface = {
      id: "2",
      users: ["Ana"],
      accessCode: "A2",
      name: "Familia B",
      mesa: 4,
      assistanceConfirm: false,
      assistance: undefined,
      origen: 'novio'
    };

    const result = preloadForm(family);

    expect(result).toEqual({
      ...FORM_DATA_DEFAULT,
      id: "2",
    });
  });
});
