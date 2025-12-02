import React from "react";
import { vi, type MockedFunction } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RSVPPage from "./page";
import {
  FORM_DATA_DEFAULT,
  type FamilyInterface,
  type FormDataAsistencia,
  type FormErrors,
} from "@/interfaces/formTypes";
import {
  preloadForm,
  submitForm,
  validateForm,
} from "@/services/formService";
import {
  showToastError,
  showToastSuccess,
} from "@/services/notificationService";
import {
  startLoading,
  stopLoading,
  subscribeToLoading,
  unsubscribeFromLoading,
} from "@/services/loadingService";
import { getFamilyByAccessCode } from "@/services/dbService";
import { loadItemFromLocalStorage } from "@/services/localStorageService";

/* ===========================
   Mocks
   =========================== */

// Router de Next
const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// Servicios de formulario
vi.mock("@/services/formService", () => ({
  preloadForm: vi.fn(),
  submitForm: vi.fn(),
  validateForm: vi.fn(),
}));

// Notificaciones
vi.mock("@/services/notificationService", () => ({
  showToastError: vi.fn(),
  showToastSuccess: vi.fn(),
}));

// Loading global
vi.mock("@/services/loadingService", () => ({
  startLoading: vi.fn(),
  stopLoading: vi.fn(),
  subscribeToLoading: vi.fn(),
  unsubscribeFromLoading: vi.fn(),
}));

// DB
vi.mock("@/services/dbService", () => ({
  getFamilyByAccessCode: vi.fn(),
}));

// localStorage
vi.mock("@/services/localStorageService", () => ({
  loadItemFromLocalStorage: vi.fn(),
}));

// Componentes de UI (mock sencillos para no depender de implementación interna)
vi.mock("@/components/layout/floral/FloralLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="floral-layout">{children}</div>
  ),
}));

vi.mock("@/components/button/FormButton", () => ({
  __esModule: true,
  default: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      className?: string;
    }
  ) => (
    <button {...props} data-testid="form-button">
      {props.children}
    </button>
  ),
}));

vi.mock("@/components/form/radio-button/RadioButton", () => ({
  __esModule: true,
  default: (props: any) => (
    <label>
      <input
        type="radio"
        name={props.name}
        value={String(props.value)}
        checked={props.selectedValue === props.value}
        onChange={props.onChange}
      />
      {props.label}
    </label>
  ),
}));

vi.mock("@/components/form/input/FormInput", () => ({
  __esModule: true,
  default: (props: any) => (
    <div>
      <label>
        {props.label}
        <input
          data-testid={props.name}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      </label>
      {props.error && (
        <span data-testid={`${props.name}-error`}>{props.error}</span>
      )}
    </div>
  ),
}));

/* ===========================
   Mocks tipados
   =========================== */

const mockedValidateForm: MockedFunction<typeof validateForm> =
  validateForm as any;
const mockedPreloadForm: MockedFunction<typeof preloadForm> =
  preloadForm as any;
const mockedSubmitForm: MockedFunction<typeof submitForm> =
  submitForm as any;
const mockedShowToastError: MockedFunction<typeof showToastError> =
  showToastError as any;
const mockedShowToastSuccess: MockedFunction<typeof showToastSuccess> =
  showToastSuccess as any;
const mockedStartLoading: MockedFunction<typeof startLoading> =
  startLoading as any;
const mockedStopLoading: MockedFunction<typeof stopLoading> =
  stopLoading as any;
const mockedSubscribeToLoading: MockedFunction<typeof subscribeToLoading> =
  subscribeToLoading as any;
const mockedUnsubscribeFromLoading: MockedFunction<
  typeof unsubscribeFromLoading
> = unsubscribeFromLoading as any;
const mockedGetFamilyByAccessCode: MockedFunction<typeof getFamilyByAccessCode> =
  getFamilyByAccessCode as any;
const mockedLoadItemFromLocalStorage: MockedFunction<
  typeof loadItemFromLocalStorage
> = loadItemFromLocalStorage as any;

/* ===========================
   Tests
   =========================== */

describe("RSVPPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Carga de los datos del localStorage en el formulario", async () => {
    const familyFromStorage: FamilyInterface = {
      id: "1234",
      users: ["Antonio"],
      assistance: undefined,
      assistanceConfirm: false,
      mesa: 3,
      accessCode: "A13",
      name: "Familia Antonio",
    };

    mockedLoadItemFromLocalStorage.mockReturnValue(familyFromStorage);

    const preloadedForm: FormDataAsistencia = {
      ...FORM_DATA_DEFAULT,
      id: familyFromStorage.id,
      assistanceConfirm: true,
      intolerancia: false,
      detallesIntolerancia: "",
      transporte: "car",
      mensaje: "",
    };
    mockedPreloadForm.mockReturnValue(preloadedForm);

    const params = { accessCode: familyFromStorage.accessCode };

    render(<RSVPPage params={params} />);

    await waitFor(() => {
      expect(screen.getByText(/Hola,/i)).toBeInTheDocument();
      expect(screen.getByText(/soy/i)).toBeInTheDocument();
      expect(screen.getByText(/Antonio/)).toBeInTheDocument();
    });

    expect(mockedLoadItemFromLocalStorage).toHaveBeenCalledWith("A13");
    expect(mockedPreloadForm).toHaveBeenCalledWith(familyFromStorage);
  });

  test("Si no hay datos en localStorage, los carga desde la BD", async () => {
    mockedLoadItemFromLocalStorage.mockReturnValue(null);

    const familyFromDb: FamilyInterface = {
      id: "2222",
      users: ["Ana", "Luis"],
      assistance: undefined,
      assistanceConfirm: false,
      mesa: 5,
      accessCode: "B22",
      name: "Familia Ana y Luis",
    };

    mockedGetFamilyByAccessCode.mockResolvedValue(familyFromDb);

    const preloadedForm: FormDataAsistencia = {
      ...FORM_DATA_DEFAULT,
      id: familyFromDb.id,
      assistanceConfirm: true,
      intolerancia: true,
      detallesIntolerancia: "gluten",
      transporte: "bus",
      mensaje: "",
    };
    mockedPreloadForm.mockReturnValue(preloadedForm);

    const params = { accessCode: familyFromDb.accessCode };

    render(<RSVPPage params={params} />);

    await waitFor(() => {
      expect(screen.getByText(/Hola,/i)).toBeInTheDocument();
      // como hay dos nombres, dirá "somos"
      expect(screen.getByText(/somos/i)).toBeInTheDocument();
      expect(screen.getByText(/Ana, Luis|Ana y Luis/i)).toBeInTheDocument();
    });

    expect(mockedStartLoading).toHaveBeenCalled();
    expect(mockedGetFamilyByAccessCode).toHaveBeenCalledWith("B22");
    expect(mockedPreloadForm).toHaveBeenCalledWith(familyFromDb);
    expect(mockedStopLoading).toHaveBeenCalled();
  });

  test("No envía el formulario si validateForm devuelve errores", async () => {
    mockedLoadItemFromLocalStorage.mockReturnValue(null);
    mockedGetFamilyByAccessCode.mockResolvedValue(null);

    const errors: FormErrors = { transporte: "Selecciona cómo vas a venir" };
    mockedValidateForm.mockReturnValue({
      isValid: false,
      errors,
    });

    const params = { accessCode: "XYZ" };

    render(<RSVPPage params={params} />);

    const submitButton = await screen.findByRole("button", { name: /Enviar/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedValidateForm).toHaveBeenCalled();
    });

    expect(mockedSubmitForm).not.toHaveBeenCalled();
  });

  test("Envía el formulario si es válido y muestra toast de éxito", async () => {
    mockedLoadItemFromLocalStorage.mockReturnValue(null);
    mockedGetFamilyByAccessCode.mockResolvedValue(null);

    mockedValidateForm.mockReturnValue({
      isValid: true,
      errors: {},
    });

    mockedSubmitForm.mockResolvedValue({ success: true } as any);

    const params = { accessCode: "OK1" };

    render(<RSVPPage params={params} />);

    const submitButton = await screen.findByRole("button", { name: /Enviar/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedSubmitForm).toHaveBeenCalled();
      expect(mockedShowToastSuccess).toHaveBeenCalledWith(
        "¡Confirmación enviada con éxito!"
      );
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  test("Muestra error si submitForm devuelve success=false", async () => {
    mockedLoadItemFromLocalStorage.mockReturnValue(null);
    mockedGetFamilyByAccessCode.mockResolvedValue(null);

    mockedValidateForm.mockReturnValue({
      isValid: true,
      errors: {},
    });

    mockedSubmitForm.mockResolvedValue({
      success: false,
      error: "Algo salió mal",
    } as any);

    const params = { accessCode: "FAIL" };

    render(<RSVPPage params={params} />);

    const submitButton = await screen.findByRole("button", { name: /Enviar/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedShowToastError).toHaveBeenCalledWith(
        "Algo salió mal"
      );
    });
  });
});
