import { useContext } from "react";
import UserContext from "./user-context-provider";

import type {UserContextType} from "./user-context-provider";

export const useUserContext = (): UserContextType => {
  const context = useContext<UserContextType | undefined>(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};