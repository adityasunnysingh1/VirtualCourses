import logo from "../assets/VC.png";
import { IoPersonCircle } from "react-icons/io5";
function Nav() {
  return (
    <div>
      <div
        className="w-full h-[70px] fixed top-0 px-[20px] py-[10px]
      flex items-center justify-between bg-[#00000047]
      z-10"
      >
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px]">
          <img
            src={logo}
            alt="logo"
            className="w-[60px] rounded-[5px] border-2
         border-white"
          />
        </div>
        <div className="w-auto lg:flex items-center justify-end gap-4">
          <IoPersonCircle className="w-[50px] h-[50px] fill-[black] cursor-pointer" />
          <div
            className="px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white 
        bg-[black] text-black rounded-[10px] text-[18px] font-light cursor-pointer"
          >
            Dashboard
          </div>

          <span
              className="px-[20px] py-[10px] border-2 border-white text-white 
        rounded-[10px] text-[18px] font-light cursor-pointer bg-[black]"
            >
              Login
            </span>
          
            <span className="px-[20px] py-[10px] bg-white text-black rounded-[10px]
            shadow-sm shadow-black text-[18px] cursor-pointer">
            Logout
            </span>
        </div>
      </div>
    </div>
  );
}

export default Nav;
