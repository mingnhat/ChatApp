import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const NavBar = () => {
  const {user, logoutUser} =useContext(AuthContext);

    return (
        <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold">Chat App React</div>
          <ul className="flex space-x-4">
            {
              user && (
              <li><a href="/login" onClick={() => logoutUser()} className="text-white">Logout</a></li>
              )
            }

            {!user && (<>
              <li><a href="/login" className="text-white">Login</a></li>
              <li><a href="/register" className="text-white">Register</a></li>
            </>)}
            {user &&(<li> <a href="#" className="text-white">{user?.name}</a></li>)}
          </ul>
        </div>
      </nav>
      );
}
 
export default NavBar;