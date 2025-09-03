// UserContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types/userType/userType";
import { checkToken } from "../hooks/useToken/useToken";

interface UserContextType {
  user: User | null;
  logged: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  setLogged: (logged: boolean) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [logged, setLogged] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logout = () => {
    setLogged(false);
    setUser(null);
  };

  useEffect(() => {
    setIsLoading(true);
    checkToken()
      .then((userData) => {
        if (!userData) {
          logout();
        } else {
          setUser(userData);
          setLogged(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        logout();
        setIsLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{ user, logged, isLoading, setUser, setLogged, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
