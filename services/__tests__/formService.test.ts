import {  validateForm, validateFormLogin, submitForm, preloadForm} from "../formService";
import { updateAsistencia } from "../dbService";
import {  FORM_DATA_DEFAULT,  FormDataAsistencia, FormDataLogin, FamilyInterface, FAMILY_DEFAULT,} from "@/interfaces/formTypes";
import { MockedFunction } from "vitest";

vi.mock("../dbService", () => ({
  updateAsistencia: vi.fn(),
}));

const mockedUpdateAsistencia = updateAsistencia as unknown as MockedFunction<typeof updateAsistencia>;

describe("Form Service test", () => {

  //ValidateForm tests
  test("validateForm should return errors", () => {
    const data = {
      ...FORM_DATA_DEFAULT,
      transporte: undefined,
      intolerancia:true,
      detallesIntolerancia:""
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const result = validateForm(data);
    expect(result.isValid).toBe(false);
    expect(result.errors.transporte).toEqual(expect.any(String));
    expect(result.errors.detallesIntolerancia).toEqual(expect.any(String));
  });

  test("validateForm should be isValid", () => {
    const data: FormDataAsistencia = {
      ...FORM_DATA_DEFAULT,
      transporte: "car",
      intolerancia:true,
      detallesIntolerancia:"Soy celíaco",
      mensaje:"Quiero una bicicleta para poder entrar"
    };

    const result = validateForm(data);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  // validateFormLogin tests
  test("validateFormLogin should return errors", () => {
    const loginData: FormDataLogin = { accessCode: "" };

    const result = validateFormLogin(loginData);
    expect(result.isValid).toBe(false);
    expect(result.errors.accessCode).toEqual(expect.any(String));
  });

  test("validateFormLogin should be valid", () => {
    const loginData: FormDataLogin = { accessCode: "ACW2" };

    const result = validateFormLogin(loginData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  //SubmitForm tests
  test("submitForm should call updateAsistencia and return its result", async () => {
    const formData: FormDataAsistencia = FORM_DATA_DEFAULT;
    const accessCode = "ACW2";

    const mockedResponseTrue: {success:boolean} = {success:true};
    mockedUpdateAsistencia.mockResolvedValue(mockedResponseTrue);

    const result = await submitForm(formData, accessCode);

    expect(mockedUpdateAsistencia).toHaveBeenCalledWith(formData, accessCode);
    expect(result).toEqual(mockedResponseTrue);
  });

  test("submitForm should call updateAsistencia and return error", async () => {
    const formData: FormDataAsistencia = FORM_DATA_DEFAULT;
    const accessCode = "ACW2";

    const mockedResponseFalse: {success:boolean} = {success:false};
    mockedUpdateAsistencia.mockResolvedValue(mockedResponseFalse);

    const result = await submitForm(formData, accessCode);

    expect(mockedUpdateAsistencia).toHaveBeenCalledWith(formData, accessCode);
    expect(result).toEqual(mockedResponseFalse);
  });

  //PreloadForm tests
  test("preloadForm by default", () => {
    const familyWithoutAsistance:FamilyInterface = {
      id:'mocked id',
      accessCode:'mocked accessCode',
      mesa:0,
      name:"mocked name",
      users:[],
      assistance:undefined,
      assistanceConfirm:false
    }; 

    const result = preloadForm(familyWithoutAsistance) as FormDataAsistencia;

    expect(result.id).toBe(familyWithoutAsistance.id);
    expect(result.assistanceConfirm).toBe(true);
    expect(result.intolerancia).toBe(false);
    expect(result.detallesIntolerancia).toBe("");
    expect(result.transporte).toBe("car");
    expect(result.mensaje).toBe("");
  });

   test("preloadForm by existing assitance", () => {
    const familyWithoutAsistance:FamilyInterface = {
      id:'mocked id',
      accessCode:'mocked accessCode',
      mesa:0,
      name:"mocked name",
      users:[],
      assistance:{
        transporte:'bus',
        intolerancia:true,
        detalleIntolerancia:"celiaco",
        mensaje:'Que vivan los novios'
      },
      assistanceConfirm:true
    }; 

    const result = preloadForm(familyWithoutAsistance) as FormDataAsistencia;

    expect(result.id).toBe(familyWithoutAsistance.id);
    expect(result.assistanceConfirm).toBe(true);
    expect(result.intolerancia).toBe(true);
    expect(result.detallesIntolerancia).toBe(familyWithoutAsistance.assistance!.detalleIntolerancia);
    expect(result.transporte).toBe("bus");
    expect(result.mensaje).toBe(familyWithoutAsistance.assistance!.mensaje);
  });
});
