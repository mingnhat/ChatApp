const Login = () => {
    return ( 
        <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="mb-4 font-bold">Login</h2>
          <div className="flex flex-col">
            <input
              type="email"
              id="email"
              placeholder="Your email"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <input
              type="password"
              id="password"
              placeholder="Your password"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <button type="submit" className="m-auto w-full px-3 py-2 border rounded mb-2 bg-slate-400"> Login</button>
          </div>
        </div>
      </div>
      
    );
}
 
export default Login;