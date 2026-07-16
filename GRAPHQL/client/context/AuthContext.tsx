"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import apolloClient from "@/lib/apolloClient";

type User = { id: string; name: string; email: string; role: string };

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type LoginData = { login: { token: string; user: User } };
type LoginVars = { email: string; password: string };

type RegisterData = { register: { token: string; user: User } };
type RegisterVars = { name: string; email: string; password: string };

type MeData = { me: User | null };

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`;

const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      role
    }
  }
`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    apolloClient
      .query<MeData>({ query: ME_QUERY, fetchPolicy: "network-only" })
      .then(({ data }) => setUser(data?.me ?? null))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    try {
      const { data } = await apolloClient.mutate<LoginData, LoginVars>({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
      });

      if (!data) {
        return { error: "Login failed." };
      }

      localStorage.setItem("token", data.login.token);
      setUser(data.login.user);
      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Login failed." };
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      const { data } = await apolloClient.mutate<RegisterData, RegisterVars>({
        mutation: REGISTER_MUTATION,
        variables: { name, email, password },
      });

      if (!data) {
        return { error: "Registration failed." };
      }

      localStorage.setItem("token", data.register.token);
      setUser(data.register.user);
      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Registration failed." };
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    apolloClient.clearStore();
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}