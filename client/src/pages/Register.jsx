import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Register = () => {
    const {
        registerInfo,
        updateRegisterInfo, 
        registerUser, 
        registerError, 
        isRegisterLoading
    } = useContext(AuthContext)
    return ( 
        <form
        >
        <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="mb-4 font-bold">Register</h2>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2 border rounded mb-2"
              onChange={(e)=> updateRegisterInfo({...registerInfo,name: e.target.value})}
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 border rounded mb-2"
              onChange={(e)=> updateRegisterInfo({...registerInfo,email: e.target.value})}
            />
            <input
              type="password"
              placeholder="Your password"
              className="w-full px-3 py-2 border rounded mb-2"
              onChange={(e)=> updateRegisterInfo({...registerInfo,password: e.target.value})}
            />
            <button 
    type="button" 
    onClick={registerUser} // Handle button click
    className="m-auto w-full px-3 py-2 border rounded mb-2 bg-slate-400"
>
    {isRegisterLoading ? "Creating your account" : "Register"}
</button>

           {/* Error Message */}
        {registerError?.error && (
          <div className='mt-4 w-full px-3 py-2 border rounded mb-2 text-red-500 text-sm text-center'>{registerError?.message}</div>
        )}
          </div>
        </div>
      </div>
      </form>
    );
}
 
export default Register;