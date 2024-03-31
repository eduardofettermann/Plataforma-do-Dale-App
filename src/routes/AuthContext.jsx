// AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        if (token) {
            // Você pode realizar uma chamada para validar o token aqui, se necessário
            setUser({ email: "example@example.com" }); // Definindo um usuário fictício apenas para demonstração
        }
    }, []);

    const signin = async (email, password) => {
        try {
            const response = await axios.post(
                "https://api.plataformadodale.site/api/auth/login",
                { email, password }
            );
            const { token } = response.data;
            localStorage.setItem("user_token", token);
            setUser({ email });
            setError(null);
        } catch (error) {
            setError("E-mail ou senha incorretos");
            setUser(null);
            localStorage.removeItem("user_token");
        }
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signout, error }}
        >
            {children}
        </AuthContext.Provider>
    );
};
