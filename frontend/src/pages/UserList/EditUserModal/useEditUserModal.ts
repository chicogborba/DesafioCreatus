import { useEffect, useState } from "react";
import { User } from "../UserList";
import useGeneralFunctions from "../../../hooks/useGeneralFunctions";

export type Field = {
  label: string;
  placeholder: string;
  type: string;
  initialValueKey: keyof State;
};

type State = {
  name: string;
  email: string;
  level: string;
  password: string;
  confirmPassword: string;
};

type UseEditUserModal = {
  userData: User | null;
  onClose: () => void;
  onUserSave: (user: User) => void;
};

const useEditUserModal = ({
  userData,
  onClose,
  onUserSave,
}: UseEditUserModal) => {
  const { isValidEmail } = useGeneralFunctions();

  const fields: Field[] = [
    {
      label: "Nome",
      placeholder: "Nome",
      type: "text",
      initialValueKey: "name",
    },
    {
      label: "Email",
      placeholder: "Email",
      type: "text",
      initialValueKey: "email",
    },
    {
      label: "Nível de Acesso",
      placeholder: "Nível de Acesso",
      type: "number",
      initialValueKey: "level",
    },
    {
      label: "Senha",
      placeholder: "Senha",
      type: "password",
      initialValueKey: "password",
    },
    {
      label: "Confirmar Senha",
      placeholder: "Senha",
      type: "password",
      initialValueKey: "confirmPassword",
    },
  ];

  const initialState: State = {
    name: "",
    email: "",
    level: "",
    password: "",
    confirmPassword: "",
  };

  const [state, setState] = useState<State>(initialState);
  const [isValidEditUser, setIsValidEditUser] = useState(false);

  useEffect(() => {
    setState({
      name: userData?.name || "",
      email: userData?.email || "",
      level: userData?.level?.toString() || "",
      password: "",
      confirmPassword: "",
    });
  }, [userData]);

  useEffect(() => {
    const isNotEmpty = state.name !== "" && state.email !== "";
    const arePasswordsEqual = state.password === state.confirmPassword;
    const isUserDataDiferent =
      state.name !== userData?.name ||
      state.email !== userData?.email ||
      state.level !== userData?.level.toString() ||
      state.password !== "" ||
      state.confirmPassword !== "";
    setIsValidEditUser(
      !isNotEmpty ||
        !isValidEmail(state.email) ||
        !arePasswordsEqual ||
        !isUserDataDiferent,
    );
  }, [state]);

  const handleChange = (key: keyof State, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!userData) return;
    const user: User = {
      id: userData.id,
      name: state.name,
      email: state.email,
      level: parseInt(state.level),
    };
    onUserSave(user);
    onClose();
  };

  return { fields, state, handleChange, handleSave, isValidEditUser };
};

export default useEditUserModal;
