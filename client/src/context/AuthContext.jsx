import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../utils/services";
import { baseUrl } from "../utils/services";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user,setUser] =useState(null);
    //register
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo,setRegisterInfo] = useState({
        name:"",
        email:"",
        password:"",
    });

    //login
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:"",
    });
    console.log("User",user);

    useEffect(()=>{
        const user = localStorage.getItem("User");
         
        setUser(JSON.parse(user));
    },[])

    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info);
    },[]);
    const updateLoginInfo = useCallback((info)=>{
        setLoginInfo(info);
    },[]);

//register
    const registerUser = useCallback(async(e)=>{
        e.preventDefault(); 
        setIsRegisterLoading(true)
        setRegisterError(null)

        const response = await postRequest(`${baseUrl}/users/register`,JSON.stringify(registerInfo))
        if(response.error){
            return setRegisterError(response);
        }

        setIsRegisterLoading(false)

        localStorage.setItem("User",JSON.stringify(response))
        setUser(response)
    },
    [registerInfo])
//login
const loginUser = useCallback(async(e)=>{
    e.preventDefault();

    setIsLoginLoading(true);
    setLoginError(null)
    const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
    );
    setIsLoginLoading(false);
    //handle error
    if(response.error){
        return setLoginError(response)
    }
    localStorage.setItem("User",JSON.stringify(response))
    setUser(response);
},[loginInfo])

    //logout n clear stage
    const logoutUser = useCallback(()=>
    {
        localStorage.removeItem("User");
        setUser(null);
    },[])
    return (
        <AuthContext.Provider 
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                logoutUser,
                loginUser,
                loginError,
                loginInfo,
                updateLoginInfo,
                isLoginLoading,
            }}
        >
        {children}
    </AuthContext.Provider>
    );
}