import {createContext,useEffect,useState } from 'react';
const AppContext = createContext();
// import { useRouter } from "next/router";
import { signOut } from 'next-auth/react';



const AppProvider = ({ children}) => {
    // let router = useRouter();

    const Logout = ()=>{
        localStorage.removeItem('token');
        signOut();
        // router.push('/');
        // setkey(Math.random());
        
      }



return (
    <AppContext.Provider value={{Logout}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };