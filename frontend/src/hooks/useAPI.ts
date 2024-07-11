import { useState } from "react";
import { LoginRequestBody } from "./types";

const BASE_URL = "http://localhost:3000"; // Altere conforme o seu ambiente de desenvolvimento

const useAPI = () => {
  const [error, setError] = useState<string | null>(null);

  const postLogin = async (body: LoginRequestBody) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  return { postLogin, error };
};

export default useAPI;
