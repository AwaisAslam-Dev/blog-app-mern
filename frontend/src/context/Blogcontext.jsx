import {  useState } from "react";
import { createContext } from "react";

export const Blogcontext = createContext();
export const Blogprovider = ({children})=>{
    const [blogs, setblogs] = useState([])
return(
    <Blogcontext.Provider value={{blogs,setblogs}}>
        {children}
    </Blogcontext.Provider>
)
}
