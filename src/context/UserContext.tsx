// UserContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types/userType/userType";
import { checkToken } from "../hooks/useToken/useToken";

interface UserContextType {
  user: User | null;
  logged: boolean;
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

  const logout = () => {
    setLogged(false);
    setUser(null);
  };
  useEffect(() => {
    checkToken().then((user) => {
      setUser(user);
      setLogged(true);
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, logged, setUser, setLogged, logout }}>
      {children}
    </UserContext.Provider>
  );
};
