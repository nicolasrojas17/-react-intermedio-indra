import { createContext, useEffect, useMemo, useState } from "react";
import { ROLE } from "../interfaces/User";

interface User {
  username: string;
  role: ROLE;
}

export interface UserContextValue {
  user: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextValue>(null as any);

const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>(() => {
    const userLocalData = localStorage.getItem("userLocalData");
    if (userLocalData) return JSON.parse(userLocalData);
    localStorage.setItem("userLocalData", JSON.stringify({ username: "", role: ROLE.NOT_LOGGED }));
    return { username: "", role: ROLE.NOT_LOGGED };
  });

  useEffect(() => {
    localStorage.setItem("userLocalData", JSON.stringify(user));
  }, [user]);

  const objUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  return <UserContext.Provider value={objUser}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
