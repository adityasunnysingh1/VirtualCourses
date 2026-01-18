import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa6";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import LiquidEther from "./LiquidEther.jsx"; 

function ExploreCourses() {
  const navigate = useNavigate();
  
  return (
    <div className="relative w-full min-h-[50vh] lg:h-[50vh] overflow-hidden bg-white">
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <LiquidEther 
            // Mapping your individual colors to the array prop
            colors={['#ffffff', '#f3f4f6', '#e0f2fe']} 
            mouseForce={31}
            cursorSize={95}
            viscous={22}
            iterationsPoisson={41}
            autoSpeed={0.3}
            autoIntensity={2.6}
            isViscous={true} // Needed to enable the viscous effect
        />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px] py-8 lg:py-0">
        
        {/* Left Section (Text) */}
        <div className="w-full lg:w-[350px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px] mb-8 lg:mb-0">
          <span className="text-[35px] font-semibold text-gray-900">Explore</span>
          <span className="text-[35px] font-semibold text-gray-900">Our Courses</span>
          <p className="text-[17px] text-gray-600"></p>
          <button 
            className="px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px] cursor-pointer hover:bg-gray-800 transition" 
            onClick={() => navigate("/allcourses")}
          >
            Explore Courses
            <SiViaplay className="w-[30px] h-[30px] lg:fill-white fill-black"/>
          </button>
        </div>

        {/* Right Section (Icons Grid) */}
        <div className="w-[720px] max-w-[90%] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap">
          
          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-800">
            <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center shadow-sm">
              <TbDeviceDesktopAnalytics className="w-[60px] h-[60px] text-[#6d6c6c]"/>
            </div>
            Web Dev
          </div> 

          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-800">
            <div className="w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center shadow-sm">
              <FaUikit className="w-[60px] h-[60px] text-[#6d6c6c]"/>
            </div>
            UI/UX Designing
          </div>

          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-800">
            <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center shadow-sm">
              <MdAppShortcut className="w-[50px] h-[50px] text-[#6d6c6c]"/>
            </div>
            App Dev
          </div>

          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-800">
            <div className="w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center shadow-sm">
              <FaHackerrank className="w-[55px] h-[55px] text-[#6d6c6c]"/>
            </div>
            Ethical Hacking
          </div>

          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-800">
            <div className="w-[100px] h-[90px] bg-[#9bea94] rounded-lg flex items-center justify-center shadow-sm">
              <AiFillOpenAI className="w-[60px] h-[60px] text-[#6d6c6c]"/>
            </div>
            AI/ML 
          </div>

          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-800">
            <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center shadow-sm">
              <SiGoogledataproc className="w-[50px] h-[50px] text-[#6d6c6c]"/>
            </div>
            Data Science
          </div>

          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-800">
            <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center shadow-sm">
              <BsClipboardDataFill className="w-[50px] h-[50px] text-[#6d6c6c]"/>
            </div>
            Data Analytics
          </div>

          <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-800">
            <div className="w-[100px] h-[90px] bg-[#254f92] rounded-lg flex items-center justify-center shadow-sm">
              <SiOpenaigym className="w-[50px] h-[50px] text-[#6d6c6c]"/>
            </div>
            AI TOOLS
          </div>

        </div>
      </div>
    </div>
  );
}

export default ExploreCourses;