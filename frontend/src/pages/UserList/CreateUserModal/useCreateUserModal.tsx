import { useEffect, useState } from "react";
import { NewUser } from "../UserList";
import useGeneralFunctions from "../../../hooks/useGeneralFunctions";

const useCreateUserModal = (
  onClose: () => void,
  onCreateUser: (user: NewUser) => void,
  isOpen: boolean,
) => {
  const { isValidEmail } = useGeneralFunctions();
  const initialState = [
    {
      label: "Nome",
      placeholder: "Nome",
      type: "text",
      initialValueKey: "name",
      value: "",
    },
    {
      label: "Email",
      placeholder: "Email",
      type: "text",
      initialValueKey: "email",
      value: "",
    },
    {
      label: "Nível de Acesso",
      placeholder: "Nível de Acesso",
      type: "number",
      initialValueKey: "level",
      value: "1",
      max: 5,
      min: 1,
    },
    {
      label: "Senha",
      placeholder: "Senha",
      type: "password",
      initialValueKey: "password",
      value: "",
    },
    {
      label: "Confirmar Senha",
      placeholder: "Senha",
      type: "password",
      initialValueKey: "confirmPassword",
      value: "",
    },
  ];

  const [fields, setFields] = useState(initialState);
  const [isValidCreateUser, setIsValidCreateUser] = useState(false);

  useEffect(() => {
    setFields(initialState);
  }, [isOpen]);

  useEffect(() => {
    const isValid = fields.every((field) => field.value !== "");
    const arePasswordsEqual = fields[3].value === fields[4].value;
    setIsValidCreateUser(
      !isValid || !isValidEmail(fields[1].value) || !arePasswordsEqual,
    );
  }, [fields]);

  const handleChange = (key: string, value: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.initialValueKey === key ? { ...field, value } : field,
      ),
    );
  };

  const handleSave = () => {
    const newUser = {
      name: fields[0].value,
      email: fields[1].value,
      level: parseInt(fields[2].value),
      password: fields[3].value,
    };
    onCreateUser(newUser);
    setFields(initialState);
    onClose();
  };

  return { fields, handleChange, handleSave, isValidCreateUser };
};

export default useCreateUserModal;
