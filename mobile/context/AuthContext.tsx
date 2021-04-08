import React, { createContext, useState } from "react";

export const AuthContext = createContext<any>({});

export function AuthProvider({children}: {children: JSX.Element}){
  const [userToken, setUserToken] = useState<string | null>(null);
  return <AuthContext.Provider value={{userToken, setUserToken}}>{children}</AuthContext.Provider>;
}