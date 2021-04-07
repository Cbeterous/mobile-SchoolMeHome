import React, { createContext, useState } from "react";

export const UserContext = createContext<any>({});

export function UserProvider({children}: {children: JSX.Element}){
    const [userEmail, setUserEmail] = useState<string>('');
    return <UserContext.Provider value={{userEmail, setUserEmail}}>{children}</UserContext.Provider>;
}