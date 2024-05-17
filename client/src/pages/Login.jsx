import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
    const {loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading}  =useContext(AuthContext);

    return ( 
        <form>
        <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="mb-4 font-bold">Login</h2>
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 border rounded mb-2"
              onChange={(e)=> updateLoginInfo({...loginInfo, email:e.target.value})}
            />
            <input
              type="password"
              placeholder="Your password"
              className="w-full px-3 py-2 border rounded mb-2"
              onChange={(e)=> updateLoginInfo({...loginInfo, password:e.target.value})}
            />
            <button type="submit" 
             onClick={loginUser} // Handle button click
            className="m-auto w-full px-3 py-2 border rounded mb-2 bg-slate-400">
                  {isLoginLoading ? "Login account" : "Login"}
            </button>
            {loginError?.error && (
          <div className='mt-4 w-full px-3 py-2 border rounded mb-2 text-red-500 text-sm text-center'>
            {loginError?.message}</div>
        )}
          </div>
        </div>
      </div>
      </form>
    );
}
 
export default Login;