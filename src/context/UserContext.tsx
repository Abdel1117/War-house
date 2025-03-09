// UserContext.tsx
import { createContext, useContext, ReactNode } from "react";
import { useAppSelector } from "../app/hooks";

interface UserContextType {
  user: any;
  isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const user = useAppSelector((state) => state.user.value);
  const isAuthenticated = !!user;

  return (
    <UserContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
